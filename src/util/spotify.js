// const CLIENT_ID = process.env.GATSBY_SPOTIFY_CLIENT_ID;
// const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
// const REDIRECT_URI = process.env.GATSBY_SPOTIFY_REDIRECT_URI;

//netlify function that intakes all spotify info from my env, and then executes spotify api
export const getCurrentlyPlaying = async () => {
  const response = await fetch("/.netlify/functions/spotify-currently-playing");

  if (!response.ok) {
    console.error("failed to fetch currently playing track.");
    return null;
  }

  const data = await response.json();

  if (data.message) {
    console.log(data.message); //"no track is playing"
    return null;
  }
  return data;
};

/* 
this was a pain to get working, but it was so fun to get going.
had to to a lot of deconstructing to really understand this all, which was cool.
it ended up with me extracting my refresh token from my access token, and then creating
env variables with all the necessary information, and creating a netlify function that executes
all the hard work on the server. so fun!!!!!
*/

//logging in locally to extract access token
// export const loginWithSpotify = () => {
//   const SCOPES = "user-read-currently-playing user-read-playback-state";
//   const authURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
//     REDIRECT_URI
//   )}&scope=${encodeURIComponent(SCOPES)}`;

//   window.location.href = authURL;
// };

//get access token with authorization code from url above
// const getAccessToken = async (authorizationCode) => {
//   const response = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: new URLSearchParams({
//       grant_type: "authorization_code",
//       code: authorizationCode,
//       redirect_uri: REDIRECT_URI,
//     }),
//   });

//   const data = await response.json();
//   console.log(data);

//   if (!response.ok) {
//     console.error("failed to get access token:", data);
//     return null;
//   }

//   return {
//     accessToken: data.access_token, //initial access token
//     refreshToken: data.refresh_token, //refresh token for later
//     expiresIn: data.expires_in, //how long until this token expires
//   };
// };

//fetch currently playing track (local)
// export const getCurrentlyPlaying = async () => {
//   const token = await getValidAccessToken();

//   if (!token) {
//     console.error("No valid access token available.");
//     return null;
//   }

//   const response = await fetch(
//     "https://api.spotify.com/v1/me/player/currently-playing",
//     {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   if (response.status === 204 || !response.ok) {
//     return null;
//   }

//   const data = await response.json();
//   return data;
// };

//refreshing local access token
// const refreshAccessToken = async () => {
//   const refreshToken = localStorage.getItem("spotifyRefreshToken");

//   if (!refreshToken) {
//     console.error("No refresh token found. Please log in again.");
//     return null;
//   }

//   const response = await fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: new URLSearchParams({
//       grant_type: "refresh_token",
//       refresh_token: refreshToken,
//     }),
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     console.error("Failed to refresh access token:", data);
//     return null;
//   }

//   // Save the new access token and expiration time
//   localStorage.setItem("spotifyAccessToken", data.access_token);
//   localStorage.setItem(
//     "spotifyTokenExpiry",
//     Date.now() + data.expires_in * 1000
//   );

//   console.log("Refreshed Access Token:", data.access_token);

//   return data.access_token;
// };

//renews spotify token if more than an hour old (i hate you spotify)
// const getValidAccessToken = async () => {
//   const accessToken = localStorage.getItem("spotifyAccessToken");
//   const tokenExpiry = localStorage.getItem("spotifyTokenExpiry");

//   //check if token is expired
//   if (Date.now() > tokenExpiry) {
//     console.log("Access token expired. Refreshing...");
//     return await refreshAccessToken();
//   }

//   return accessToken;
// };

//testing all of this fun jazz out
// export const testAccessTokenFlow = async () => {
//   const authorizationCode = "manually enter for testing";

//   const tokens = await getAccessToken(authorizationCode);

//   if (tokens) {
//     const { accessToken, refreshToken, expiresIn } = tokens;

//     // localStorage.setItem("spotifyAccessToken", accessToken);
//     // localStorage.setItem("spotifyRefreshToken", refreshToken);
//     // localStorage.setItem(
//     //   "spotifyTokenExpiry",
//     //   Date.now() + expiresIn * 1000 // Save the expiration time
//     // );

//     console.log("Access Token:", accessToken);
//     console.log("Refresh Token:", refreshToken);
//     const response = await fetch(
//       "https://api.spotify.com/v1/me/player/currently-playing",
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     if (response.status === 204 || !response.ok) {
//       console.error("no track is currently playing.");
//       return null;
//     }

//     console.log("access token:", accessToken);

//     const data = await response.json();
//     console.log("currently playing:", data);

//     return data;
//   } else {
//     console.error("failed to retrieve access token.");
//   }
// };
