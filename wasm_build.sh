#!/usr/bin/env bash
# -u: Fail on when existing unset variables
# -e -o pipefail: Fail on when happening command errors
set -ueo pipefail

SCRIPT_DIR=$(cd $(dirname $0) && pwd)

wasm-pack build --target web --out-dir ${SCRIPT_DIR}/src/lib rs_lib
find src/lib -type f | grep -v -E '^(src/lib/renderer.js|src/lib/renderer_bg.wasm)$' | xargs rm -rf
