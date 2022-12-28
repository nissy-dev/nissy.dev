use dioxus::prelude::*;
use wasm_bindgen::prelude::*;

mod app;

fn build_html(body_str: &str) -> String {
    format!(
        "<!DOCTYPE html>
<html lang=\"en\">
<head>
  <title>nissy.dev</title>
  <meta charset=\"utf-8\">
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
  <meta name=\"description\" content=\"This is a profile site for nissy.\" />
  <link href=\"/public/style.css\" rel=\"stylesheet\" />
  <link rel=\"icon\" href=\"/public/favicon.ico\" />
</head>
<body>
{}
</body>
</html>",
        body_str
    )
}

#[wasm_bindgen]
pub fn render() -> String {
    let mut vdom = VirtualDom::new(app::app);
    let _ = vdom.rebuild();
    build_html(&dioxus::ssr::render_vdom(&vdom))
}
