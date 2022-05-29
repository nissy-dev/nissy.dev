use dioxus::prelude::*;

pub fn app(cx: Scope) -> Element {
    cx.render(rsx!(
        h1 {
            class: "bg-blue-500 text-white text-center p-4",
            "nissy.dev, coming soon..."
        }
    ))
}
