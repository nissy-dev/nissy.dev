use dioxus::prelude::*;

use dioxus_free_icons::icons::fa_brands_icons::{FaGithub, FaTwitter};
use dioxus_free_icons::icons::fa_solid_icons::{FaBook, FaFileLines};

use dioxus_free_icons::{Icon, IconShape};

#[derive(PartialEq, Props, Clone)]
struct IconLinkProps<T: IconShape + Clone + PartialEq + 'static> {
    href: String,
    name: String,
    icon: T,
}

#[allow(non_snake_case)]
fn IconLink<T: IconShape + Clone + PartialEq + 'static>(props: IconLinkProps<T>) -> Element {
    rsx! {
        a {
            class: "py-4 px-8 text-orange-500",
            href: "{props.href}",
            title: "{props.name}",
            Icon {
                class: "w-16 h-16",
                icon: {props.icon},
            },
            span {
                class: "inline-block w-full py-2 text-center",
                "{props.name}",
            }
        }
    }
}

pub fn app() -> Element {
    rsx!(
        div {
            class: "w-full h-full",
            main {
                class: "w-full pt-24 flex flex-col justify-center items-center",
                img {
                    class: "w-32 h-32 shadow-2xl rounded",
                    width: "640",
                    height: "640",
                    src: "/public/snork.webp",
                    decoding: "async",
                    alt: "nissy",
                },
                h1 {
                    class: "text-4xl mt-8 font-bold text-orange-500",
                    "nissy.dev",
                },
                p {
                    class: "text-xl my-6 text-orange-400 text-center w-3/5 md:w-full",
                    "I'm a software engineer mainly working on web development 🇯🇵 👋",
                }
                div {
                    class: "grid grid-cols-2 grid-flow-row md:flex md:flex-row",
                    IconLink {
                        href: "https://github.com/nissy-dev".to_string(),
                        name: "GitHub".to_string(),
                        icon: FaGithub,
                    },
                    IconLink {
                        href: "https://blog.nissy.dev".to_string(),
                        name: "Blog".to_string(),
                        icon: FaBook,
                    },
                    IconLink {
                        href: "https://github.com/nissy-dev/resume".to_string(),
                        name: "Resume".to_string(),
                        icon: FaFileLines
                    }
                    IconLink {
                        href: "https://twitter.com/nissy_dev".to_string(),
                        name: "Twitter".to_string(),
                        icon: FaTwitter,
                    }
                }
            }
        }
    )
}
