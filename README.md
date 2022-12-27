# nissy.dev

## Setup

Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN.

```
export CLOUDFLARE_ACCOUNT_ID=XXXXXXXXXXXXXXXXXXX
export CLOUDFLARE_API_TOKEN=XXXXXXXXXXXXXXXXXXX
```

## Development

```sh
// build wasm file
wasm-pack build wasm --target web

// run dev server
npx vercel dev

// deploy
npx vercel deploy
```
