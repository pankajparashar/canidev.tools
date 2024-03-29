import * as fs from "fs";
import path from "path";

import HJSON from "hjson";

export async function generateStaticParams() {
    const paths = [];
    fs.readdirSync("features").map(name => {
        ["chrome", "firefox", "edge", "safari", "polypane"].forEach(browser => {
            paths.push({ browser, slug: path.basename(name, ".hjson") });
        });
    });
    return paths;
}

export async function generateMetadata({ params }) {
    const filename = path.join("features", params.slug + ".hjson");
    const file = fs.readFileSync(filename, "utf-8");
    const feature = HJSON.parse(file);
    const browser = params.browser.charAt(0).toUpperCase() + params.browser.slice(1);

    return {
        title: `${browser} | ${feature.Name} | Can I DevTools`,
        description: feature.Description,
        twitter: {
            card: "summary_large_image",
            title: `${browser} | ${feature.Name} | Can I DevTools`,
            description: feature.Description,
            creator: "@CanIDevTools",
            site: "canidev.tools",
            images: [
                {
                    type: "image/png",
                    width: 500,
                    height: 255,
                    url: `https://canidev.tools/images/${params.slug}.png`,
                },
            ],
        },
        openGraph: {
            title: `${browser} | ${feature.Name} | Can I DevTools`,
            description: feature.Description,
            url: "https://canidev.tools",
            type: "website",
            images: [
                {
                    type: "image/png",
                    width: 500,
                    height: 255,
                    url: `https://canidev.tools/images/${params.slug}.png`,
                },
            ],
        },
    };
}

export default function Layout({ children }) {
    return <>{children}</>;
}
