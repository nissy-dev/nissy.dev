use build_html::build_html;
use dioxus::prelude::*;

mod app;
mod build_html;

fn main() {
    let mut vdom = VirtualDom::new(app::app);
    vdom.rebuild();
    let html = build_html(&dioxus::ssr::render_vdom(&vdom));
    print!("{html}");
}
