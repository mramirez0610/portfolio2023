const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const CURRENTLY_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const REQUEST_TIMEOUT_MS = 8_000;
const DEFAULT_ACCESS_TOKEN_TTL_MS = 60 * 60 * 1_000;

const SUCCESS_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=5, stale-while-revalidate=10",
  "Netlify-CDN-Cache-Control":
    "public, durable, s-maxage=15, stale-while-revalidate=45",
  "X-Content-Type-Options": "nosniff",
};

const NO_STORE_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "Netlify-CDN-Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

let cachedAccessToken = null;
let accessTokenExpiresAt = 0;
let accessTokenRequest = null;

class SpotifyFunctionError extends Error {
  constructor(reason, options = {}) {
    super(options.message || reason);
    this.name = "SpotifyFunctionError";
    this.reason = reason;
    this.statusCode = options.statusCode || 502;
    this.retryAfter = options.retryAfter || null;
  }
}

const jsonResponse = (statusCode, body, headers = NO_STORE_HEADERS) => ({
  statusCode,
  headers,
  body: JSON.stringify(body),
});

const unavailableResponse = (error) => {
  const headers = { ...NO_STORE_HEADERS };

  if (error.retryAfter) {
    headers["Retry-After"] = error.retryAfter;
  }

  return jsonResponse(
    error.statusCode,
    {
      status: "unavailable",
      reason: error.reason,
      track: null,
      updatedAt: new Date().toISOString(),
    },
    headers
  );
};

const getSpotifyConfig = () => {
  const clientId =
    process.env.SPOTIFY_CLIENT_ID ||
    process.env.GATSBY_SPOTIFY_CLIENT_ID ||
    "";
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || "";
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN || "";

  if (!clientId || !clientSecret || !refreshToken) {
    const missing = [];
    if (!clientId) missing.push("SPOTIFY_CLIENT_ID");
    if (!clientSecret) missing.push("SPOTIFY_CLIENT_SECRET");
    if (!refreshToken) missing.push("SPOTIFY_REFRESH_TOKEN");

    console.error(
      `Spotify function is missing required environment variables: ${missing.join(
        ", "
      )}`
    );

    throw new SpotifyFunctionError("configuration_error", {
      statusCode: 500,
    });
  }

  return { clientId, clientSecret, refreshToken };
};

const fetchWithTimeout = async (url, options) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
};

const readJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

const requestAccessToken = async ({ clientId, clientSecret, refreshToken }) => {
  const authorization = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64"
  );

  const response = await fetchWithTimeout(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authorization}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data = await readJson(response);
  const spotifyError =
    data && typeof data.error === "string" ? data.error : "unknown_error";

  if (!response.ok) {
    cachedAccessToken = null;
    accessTokenExpiresAt = 0;

    if (spotifyError === "invalid_grant") {
      console.error(
        "Spotify refresh token is expired or revoked; reauthorization is required."
      );
      throw new SpotifyFunctionError("reauthorization_required", {
        statusCode: 503,
      });
    }

    console.error(
      `Spotify token request failed with HTTP ${response.status} (${spotifyError}).`
    );
    throw new SpotifyFunctionError("spotify_auth_error", {
      statusCode: 502,
    });
  }

  if (!data || typeof data.access_token !== "string") {
    console.error("Spotify token response did not include an access token.");
    throw new SpotifyFunctionError("spotify_auth_error", {
      statusCode: 502,
    });
  }

  const expiresInSeconds = Number(data.expires_in);
  const tokenTtl =
    Number.isFinite(expiresInSeconds) && expiresInSeconds > 0
      ? expiresInSeconds * 1_000
      : DEFAULT_ACCESS_TOKEN_TTL_MS;
  const expirationSkew = Math.min(60_000, tokenTtl * 0.1);

  cachedAccessToken = data.access_token;
  accessTokenExpiresAt = Date.now() + tokenTtl - expirationSkew;

  return cachedAccessToken;
};

const getAccessToken = async (config) => {
  if (cachedAccessToken && Date.now() < accessTokenExpiresAt) {
    return cachedAccessToken;
  }

  if (!accessTokenRequest) {
    accessTokenRequest = requestAccessToken(config).finally(() => {
      accessTokenRequest = null;
    });
  }

  return accessTokenRequest;
};

const spotifyGet = async (url, config, allowTokenRetry = true) => {
  const accessToken = await getAccessToken(config);
  const response = await fetchWithTimeout(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (response.status === 401 && allowTokenRetry) {
    cachedAccessToken = null;
    accessTokenExpiresAt = 0;
    return spotifyGet(url, config, false);
  }

  if (response.status === 429) {
    throw new SpotifyFunctionError("rate_limited", {
      statusCode: 503,
      retryAfter: response.headers.get("retry-after"),
    });
  }

  if (response.status === 401 || response.status === 403) {
    console.error(`Spotify API rejected the request with HTTP ${response.status}.`);
    throw new SpotifyFunctionError("spotify_authorization_error", {
      statusCode: 503,
    });
  }

  return response;
};

const firstImageUrl = (item) => {
  const images =
    item && item.type === "episode"
      ? item.images || (item.show && item.show.images)
      : item && item.album && item.album.images;

  if (!Array.isArray(images)) return "";

  const image = images.find(
    (candidate) => candidate && typeof candidate.url === "string"
  );
  return image ? image.url : "";
};

const normalizeTrack = (item, progressMs = null) => {
  if (
    !item ||
    (item.type !== "track" && item.type !== "episode") ||
    typeof item.name !== "string"
  ) {
    return null;
  }

  const isEpisode = item.type === "episode";
  const album = isEpisode
    ? item.show && typeof item.show.name === "string"
      ? item.show.name
      : "Podcast"
    : item.album && typeof item.album.name === "string"
    ? item.album.name
    : "";

  const artists = Array.isArray(item.artists)
    ? item.artists
        .map((artist) => (artist && typeof artist.name === "string" ? artist.name : ""))
        .filter(Boolean)
    : [];

  const durationMs = Number(item.duration_ms);
  const normalizedDuration =
    Number.isFinite(durationMs) && durationMs > 0 ? durationMs : null;
  const numericProgress = Number(progressMs);
  const normalizedProgress =
    progressMs !== null &&
    progressMs !== undefined &&
    normalizedDuration &&
    Number.isFinite(numericProgress)
      ? Math.min(Math.max(numericProgress, 0), normalizedDuration)
      : null;

  return {
    title: item.name,
    album,
    artists,
    artworkUrl: firstImageUrl(item),
    durationMs: normalizedDuration,
    progressMs: normalizedProgress,
  };
};

const successResponse = (status, track = null) =>
  jsonResponse(
    200,
    {
      status,
      track,
      updatedAt: new Date().toISOString(),
    },
    SUCCESS_HEADERS
  );

const getListeningStatus = async (config) => {
  const currentResponse = await spotifyGet(CURRENTLY_PLAYING_ENDPOINT, config);

  if (currentResponse.status === 200) {
    const current = await readJson(currentResponse);
    const currentTrack = normalizeTrack(
      current && current.item,
      current && current.progress_ms
    );

    if (current && current.is_playing === true && currentTrack) {
      return successResponse("playing", currentTrack);
    }
  } else if (currentResponse.status !== 204) {
    console.warn(
      `Spotify currently-playing request returned HTTP ${currentResponse.status}; falling back to recent history.`
    );
  }

  const recentResponse = await spotifyGet(RECENTLY_PLAYED_ENDPOINT, config);

  if (recentResponse.status === 204) {
    return successResponse("idle");
  }

  if (!recentResponse.ok) {
    console.error(
      `Spotify recently-played request failed with HTTP ${recentResponse.status}.`
    );
    throw new SpotifyFunctionError("spotify_api_error", {
      statusCode: 502,
    });
  }

  const recent = await readJson(recentResponse);
  const firstRecent =
    recent && Array.isArray(recent.items) ? recent.items[0] : null;
  const recentTrack = normalizeTrack(firstRecent && firstRecent.track);

  return recentTrack
    ? successResponse("recent", recentTrack)
    : successResponse("idle");
};

exports.handler = async (event = {}) => {
  if (event.httpMethod !== "GET") {
    return jsonResponse(
      405,
      {
        status: "unavailable",
        reason: "method_not_allowed",
        track: null,
        updatedAt: new Date().toISOString(),
      },
      { ...NO_STORE_HEADERS, Allow: "GET" }
    );
  }

  try {
    const config = getSpotifyConfig();
    return await getListeningStatus(config);
  } catch (error) {
    if (error instanceof SpotifyFunctionError) {
      return unavailableResponse(error);
    }

    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`Unexpected Spotify function error: ${message}`);

    return unavailableResponse(
      new SpotifyFunctionError("spotify_unavailable", { statusCode: 502 })
    );
  }
};
