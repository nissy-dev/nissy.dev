# nissy.dev

## Setup

Install Rust, Deno and direnv.

```sh
asdf install rust 1.61.0 && asdf local rust 1.61.0
asdf install deno 1.23.4 && asdf local nodejs 1.23.4
asdf install direnv 2.32.1 && asdf local direnv 2.32.1
```

Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN.

```
export CLOUDFLARE_ACCOUNT_ID=XXXXXXXXXXXXXXXXXXX
export CLOUDFLARE_API_TOKEN=XXXXXXXXXXXXXXXXXXX
```

## Development

```sh
// build wasm file
deno task wasmbuild

// run dev server
deno task dev
```
