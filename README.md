## my portfolio

### [live site](https://www.marcoramirez.dev)

good morning! this is my newest iteration of my portfolio. i hope you enjoy it!

built as a statically generated [astro](https://astro.build) site, with a small
netlify function powering the spotify listening widget.

### spotify token renewal (for my future use)

spotify refresh tokens expire six months after authorization. when the widget
asks for reauthorization, run:

```sh
npm run spotify:authorize
```

paste the redirected Spotify URL when prompted, then replace the
`SPOTIFY_REFRESH_TOKEN` environment variable in netlify with the newly printed
value and redeploy.
