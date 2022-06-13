// TODO: dioxus-helmet を使うようにする
pub fn build_html(body_str: &str) -> String {
    format!(
        "<!DOCTYPE html>
<html lang=\"en\">
<head>
  <title>nissy.dev</title>
  <meta charset=\"utf-8\">
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
  <script src=\"https://cdn.tailwindcss.com\"></script>
  <link rel=\"icon\" href=\"https://static-server.nissy-dev.workers.dev/favicon-32x32.png\" />
</head>
<body>
{}
</body>
</html>",
        body_str
    )
}
