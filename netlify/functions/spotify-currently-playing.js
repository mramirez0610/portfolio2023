const fetch = require("node-fetch");

exports.handler = async () => {
  try {
    const CLIENT_ID = process.env.GATSBY_SPOTIFY_CLIENT_ID;
    const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
    const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

    //refresh access token
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${CLIENT_ID}:${CLIENT_SECRET}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: REFRESH_TOKEN,
        }),
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error("Failed to refresh access token:", tokenData);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to refresh access token" }),
      };
    }

    const accessToken = tokenData.access_token;

    //fetch current track
    const trackResponse = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (trackResponse.status === 204 || !trackResponse.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "No track is currently playing." }),
      };
    }

    const trackData = await trackResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify(trackData),
    };
  } catch (error) {
    console.error("Error in spotify-currently-playing function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
