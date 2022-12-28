# nissy.dev

## Set up

Install Rust and Node.js. In addtion to this, add `wasm32-unknown-unknown` and install `wasm-pack` and for building WASM.

```sh
rustup target add wasm32-unknown-unknown
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
```

## Development

```sh
// run dev server
npm run dev:all

// test deploy
npm run deploy:preview
```
