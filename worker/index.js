import { WASI } from "@cloudflare/workers-wasi";
import renderWasm from "../wasm/target/wasm32-wasi/release/renderer.wasm";

export default {
  async fetch(request, env, ctx) {
    switch (request.method) {
      case "GET":
        const url = new URL(request.url);

        if (url.pathname === "/") {
          const stdout = new TransformStream();
          const wasi = new WASI({
            args: [],
            stdin: request.body,
            stdout: stdout.writable,
          });

          const instance = new WebAssembly.Instance(renderWasm, {
            wasi_snapshot_preview1: wasi.wasiImport,
          });

          // Keep our worker alive until the WASM has finished executing.
          ctx.waitUntil(wasi.start(instance));
          return new Response(stdout.readable);
        }

        if (url.pathname.startsWith("/assets/")) {
          const key = url.pathname.split("/").pop();
          const object = await env.PROFILE_ASSETS.get(key);

          if (!object || !object.body) {
            return new Response("Object Not Found", { status: 404 });
          }

          const headers = new Headers();
          object.writeHttpMetadata(headers);
          headers.set("etag", object.httpEtag);

          return new Response(object.body, {
            headers,
          });
        }

        return new Response("The Request URL Not Found", { status: 404 });

      default:
        return new Response("Method Not Allowed", {
          status: 405,
          headers: {
            Allow: "GET",
          },
        });
    }
  },
};
