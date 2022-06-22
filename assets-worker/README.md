# assets-server

This is a temporal worker for serving static files. 
[See: Worker-rs doesn't support R2](https://github.com/cloudflare/workers-rs/issues/181)

## Commands

Can't use `npm run dev` because [Miniflare doesn't support R2](https://github.com/cloudflare/miniflare/issues/276)

```sh
// deploy
npm run deploy
```