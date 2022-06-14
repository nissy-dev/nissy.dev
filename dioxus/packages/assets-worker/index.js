export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.split("/").pop();

    switch (request.method) {
      case "GET":
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
