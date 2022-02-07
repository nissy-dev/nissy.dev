use dioxus::prelude::*;

pub fn App(cx: Scope) -> Element {
    cx.render(rsx!(
        h1 { "hello world" }
    ))
}
