## my portfolio

### [live site](https://www.marcoramirez.dev)

good morning! this is my newest iteration of my portfolio. i hope you enjoy it!

built as a statically generated [Astro](https://astro.build) site, with a small
Netlify function powering the Spotify listening widget.

```sh
npm install
npm run dev
```

### spotify token renewal

Spotify refresh tokens expire six months after authorization. When the widget
asks for reauthorization, run:

```sh
npm run spotify:authorize
```

Paste the redirected Spotify URL when prompted, then replace the
`SPOTIFY_REFRESH_TOKEN` environment variable in Netlify with the newly printed
value and redeploy. Keep the token and client secret server-only.
