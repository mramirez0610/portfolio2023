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
    let trackData = null;
    try {
      const trackResponse = await fetch(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (trackResponse.status === 200) {
        trackData = await trackResponse.json();
      } else if (trackResponse.status === 204) {
        console.log("no currently-playing track.");
      } else {
        console.error(
          "error fetching currently-playing track:",
          trackResponse.status
        );
      }
    } catch (error) {
      console.error("error in currently-playing fetch:", error);
    }

    //new integration ------ recently played

    let recentData = null;
    let mostRecentCursor = null;
    try {
      // const recentlyPlayedResponse = await fetch(
      //   "https://api.spotify.com/v1/me/player/recently-played?limit=5",
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   }
      // );

      const recentlyPlayedResponse = await fetch(
        `https://api.spotify.com/v1/me/player/recently-played?limit=5${
          mostRecentCursor ? `&before=${mostRecentCursor}` : ""
        }`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (recentlyPlayedResponse.ok) {
        recentData = await recentlyPlayedResponse.json();
        mostRecentCursor = recentData.cursors.before; //adding cursor
      } else if (recentlyPlayedResponse.status === 204) {
        console.log("no recently-played found.");
      } else {
        console.error(
          "error fetching recently-played tracks:",
          recentlyPlayedResponse.status
        );
      }
    } catch (error) {
      console.error("error in recently-played fetch:", error);
    }

    //-----------

    return {
      statusCode: 200,
      body: JSON.stringify({
        currentlyPlaying: trackData || "no track currently playing.",
        recentlyPlayed: recentData || "no recently played tracks found.",
      }),
    };
  } catch (error) {
    console.error("Error in spotify-currently-playing function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
