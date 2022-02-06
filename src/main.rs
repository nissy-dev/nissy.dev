use dioxus::prelude::*;

fn main() {
    dioxus::web::launch(App);
}

fn App(cx: Scope) -> Element {
    cx.render(rsx!(
        h1 { "hello world" }
    ))
}
