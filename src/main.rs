use dioxus::prelude::*;

fn main() {
    let mut vdom = VirtualDom::new(App);
    let _ = vdom.rebuild();
    let text = dioxus::ssr::render_vdom(&vdom);
}

fn App(cx: Scope) -> Element {
    cx.render(rsx!(
        h1 { "hello world" }
    ))
}
