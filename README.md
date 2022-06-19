# nissy.dev

## Setup

Install Rust and Node.js.

```sh
asdf install rust 1.61.0 && asdf local rust 1.61.0
asdf install nodejs 16.9.1 && asdf local nodejs 16.9.1
```

## Monorepo

- assets-worker
  - This is a temporal worker for serving static files
- worker
  - This worker serves my profile page by [dixous](https://dioxuslabs.com/) and SSR
