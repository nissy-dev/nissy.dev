use dioxus::prelude::*;

pub fn app(cx: Scope) -> Element {
    cx.render(rsx!(
        h1 { "nissy.dev, coming soon..." }
    ))
}
