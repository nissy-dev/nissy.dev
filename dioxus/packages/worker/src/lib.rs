use app;
use build_html::build_html;
use dioxus::prelude::*;
use worker::*;

mod build_html;
mod utils;

fn log_request(req: &Request) {
    console_log!(
        "{} - [{}], located at: {:?}, within: {}",
        Date::now().to_string(),
        req.path(),
        req.cf().coordinates().unwrap_or_default(),
        req.cf().region().unwrap_or("unknown region".into())
    );
}

#[event(fetch)]
pub async fn main(req: Request, env: Env) -> Result<Response> {
    log_request(&req);

    // Get more helpful error messages written to the console in the case of a panic.
    utils::set_panic_hook();

    let router = Router::new();
    router.get("/", handle_request).run(req, env).await
}

fn handle_request<D>(_req: Request, _ctx: RouteContext<D>) -> Result<Response> {
    let mut vdom = VirtualDom::new(app::app);
    let _ = vdom.rebuild();
    Response::from_html(build_html(&dioxus::ssr::render_vdom(&vdom)))
}