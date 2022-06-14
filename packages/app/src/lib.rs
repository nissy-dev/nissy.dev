use dioxus::prelude::*;

mod icon;

pub fn app(cx: Scope) -> Element {
    cx.render(rsx!(
        div {
            class: "w-full h-full",
            main {
                class: "w-full pt-24 flex flex-col justify-center items-center",
                img {
                    class: "w-32 h-32 shadow-2xl rounded",
                    width: "640",
                    height: "640",
                    src: "/assets/snork.webp",
                },
                h1 {
                    class: "text-4xl mt-8 font-bold text-orange-500",
                    "nissy.dev",
                },
                p {
                    class: "text-xl my-6 text-orange-400 text-center w-3/5 md:w-full",
                    "I'm a software engineer with particular expertise in front-end 🇯🇵 👋",
                }
                div {
                    class: "grid grid-cols-2 grid-flow-row md:flex md:flex-row",
                    a {
                        class: "py-4 px-8 text-orange-500",
                        href: "https://github.com/nissy-dev",
                        title: "GitHub",
                        icon::fa_github(),
                        span {
                            class: "inline-block w-full py-2 text-center",
                            "GitHub",
                        }
                    },
                    a {
                        class: "py-4 px-8 text-orange-500",
                        href: "https://blog.nissy.dev",
                        title: "Blog",
                        icon::fa_book(),
                        span {
                            class: "inline-block w-full py-2 text-center",
                            "Blog",
                        }
                    },
                    a {
                        class: "py-4 px-8 text-orange-500",
                        href: "https://github.com/nissy-dev/resume",
                        title: "Resume",
                        icon::fa_file_alt(),
                        span {
                            class: "inline-block w-full py-2 text-center",
                            "Resume",
                        }
                    },
                    a {
                        class: "py-4 px-8 text-orange-500",
                        href: "https://twitter.com/nissy_dev",
                        title: "Twitter",
                        icon::fa_twitter(),
                        span {
                            class: "inline-block w-full py-2 text-center",
                            "Twitter",
                        }
                    },
                }
            }
        }
    ))
}
