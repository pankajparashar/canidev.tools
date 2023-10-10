export default function manifest() {
    return {
        name: "Can I DevTools?",
        short_name: "F12",
        description: "It is like @CanIUse, but for the browser devtools, created by Pankaj Parashar and curated by community.",
        start_url: "/",
        display: "standalone",
        background_color: "#fff",
        theme_color: "#fff",
        icons: [
            {
                src: "/apple-icon.png",
                sizes: "any",
                type: "image/png",
            },
        ],
    };
}
