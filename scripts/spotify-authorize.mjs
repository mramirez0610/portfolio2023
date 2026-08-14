import { randomBytes } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const clientId =
  process.env.SPOTIFY_CLIENT_ID ??
  process.env.GATSBY_SPOTIFY_CLIENT_ID ??
  "";
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? "";
const redirectUri =
  process.env.SPOTIFY_REDIRECT_URI ??
  process.env.GATSBY_SPOTIFY_REDIRECT_URI ??
  "";

const missing = [
  !clientId && "SPOTIFY_CLIENT_ID",
  !clientSecret && "SPOTIFY_CLIENT_SECRET",
  !redirectUri && "SPOTIFY_REDIRECT_URI",
].filter(Boolean);

if (missing.length > 0) {
  console.error(
    `Missing ${missing.join(", ")} in .env.development. Legacy GATSBY_ names are also supported.`,
  );
  process.exitCode = 1;
} else {
  const state = randomBytes(24).toString("hex");
  const authorizeUrl = new URL("https://accounts.spotify.com/authorize");
  authorizeUrl.search = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: "user-read-currently-playing user-read-recently-played",
    state,
    show_dialog: "true",
  }).toString();

  console.log("\nOpen this URL and approve access:\n");
  console.log(authorizeUrl.href);
  console.log(
    "\nAfter Spotify redirects, copy the entire URL from your address bar.",
  );

  const terminal = createInterface({ input: stdin, output: stdout });
  const callbackValue = await terminal.question("\nRedirected URL: ");
  terminal.close();

  try {
    const callbackUrl = new URL(callbackValue.trim());
    const returnedState = callbackUrl.searchParams.get("state");
    const authorizationCode = callbackUrl.searchParams.get("code");
    const spotifyError = callbackUrl.searchParams.get("error");

    if (spotifyError) {
      throw new Error(`Spotify authorization failed: ${spotifyError}`);
    }

    if (!returnedState || returnedState !== state) {
      throw new Error("The returned OAuth state did not match. Start again.");
    }

    if (!authorizationCode) {
      throw new Error("The redirected URL does not contain an authorization code.");
    }

    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: authorizationCode,
        redirect_uri: redirectUri,
      }),
    });
    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || typeof tokenData.refresh_token !== "string") {
      const reason =
        typeof tokenData.error === "string" ? tokenData.error : tokenResponse.status;
      throw new Error(`Spotify token exchange failed: ${reason}`);
    }

    console.log("\nNew SPOTIFY_REFRESH_TOKEN (keep this secret):\n");
    console.log(tokenData.refresh_token);
    console.log(
      "\nReplace SPOTIFY_REFRESH_TOKEN in Netlify, then trigger a new deploy.",
    );
  } catch (error) {
    console.error(`\n${error instanceof Error ? error.message : "Authorization failed."}`);
    process.exitCode = 1;
  }
}
