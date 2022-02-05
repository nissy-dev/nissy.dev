use tokio::task::spawn_blocking;
use tokio::task::LocalSet;
use warp::Filter;
use yew::prelude::*;

#[function_component]
fn App() -> Html {
    let fallback = html! {<div>{"Loading..."}</div>};

    html! {
        <Suspense {fallback}>
            <Content />
        </Suspense>
    }
}

async fn render() -> String {
    let content = spawn_blocking(move || {
        use tokio::runtime::Builder;
        let set = LocalSet::new();

        let rt = Builder::new_current_thread().enable_all().build().unwrap();

        set.block_on(&rt, async {
            let renderer = yew::ServerRenderer::<App>::new();

            renderer.render().await
        })
    })
    .await
    .expect("the thread has failed.");

    format!(
        r#"<!DOCTYPE HTML>
<html>
    <head>
        <title>Yew SSR Example</title>
    </head>
    <body>
        {}
    </body>
</html>
"#,
        content
    )
}

#[tokio::main]
async fn main() {
    let routes = warp::any().then(|| async move { warp::reply::html(render().await) });

    println!("You can view the website at: http://localhost:8080/");

    warp::serve(routes).run(([127, 0, 0, 1], 8080)).await;
}
