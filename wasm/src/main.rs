use dioxus::prelude::*;

mod app;

fn build_html(body_str: &str) -> String {
    format!(
        "<!DOCTYPE html>
<html lang=\"en\">
<head>
  <title>nissy.dev</title>
  <meta charset=\"utf-8\">
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
  <script src=\"https://cdn.tailwindcss.com\"></script>
  <link rel=\"icon\" href=\"/assets/favicon-32x32.png\" />
</head>
<body>
{}
</body>
</html>",
        body_str
    )
}

fn main() {
    let mut vdom = VirtualDom::new(app::app);
    vdom.rebuild();
    let html = build_html(&dioxus::ssr::render_vdom(&vdom));
    print!("{html}");
}
