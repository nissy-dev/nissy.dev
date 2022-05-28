pub fn build_html(body_str: &str) -> String {
    format!(
        "<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"utf-8\">
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
  <script src=\"https://cdn.tailwindcss.com\"></script>
</head>
<body>
{}
</body>
</html>",
        body_str
    )
}
