import type { R2Bucket } from "https://raw.githubusercontent.com/skymethod/denoflare/v0.5.3/common/cloudflare_workers_types.d.ts";
import { importWasm } from "https://raw.githubusercontent.com/skymethod/denoflare/v0.5.3/common/import_wasm.ts";

import init, { render } from "./lib/renderer.js";

const rendererModule = await importWasm(
  import.meta.url,
  "./lib/renderer_bg.wasm"
);
await init(rendererModule);

export interface WorkerEnv {
  readonly bucket: R2Bucket;
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    // GET 以外のリクエストを弾く
    if (request.method !== "GET") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: {
          Allow: "GET",
        },
      });
    }

    const url = new URL(request.url);

    // `/` へのリクエスト
    if (url.pathname === "/") {
      return new Response(render(), {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    // `/assets/xxx` へのリクエスト
    if (url.pathname.startsWith("/assets/")) {
      const key = url.pathname.split("/").at(-1);
      const object = await env.bucket.get(key ?? "");

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

    // それ以外
    return new Response("The request URL was not found", {
      status: 404,
    });
  },
};
