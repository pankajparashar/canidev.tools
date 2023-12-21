import * as fs from "fs";
import path from "path";

import HJSON from "hjson";
import { ScrollArea } from "@mantine/core";

export async function generateStaticParams() {
    return fs.readdirSync("features").map(name => ({ slug: path.basename(name, ".hjson") }));
}

export async function generateMetadata({ params }) {
    const filename = path.join("features", params.slug + ".hjson");
    const file = fs.readFileSync(filename, "utf-8");
    const feature = HJSON.parse(file);

    return {
        title: `${feature.Name} | Can I DevTools`,
        description: feature.Description,
        twitter: {
            card: "summary_large_image",
            title: `${feature.Name} | Can I DevTools`,
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
            title: `${feature.Name} | Can I DevTools`,
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

export default async function Page() {
    return <ScrollArea></ScrollArea>;
}
