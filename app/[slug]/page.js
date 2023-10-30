import { ScrollArea } from "@mantine/core";

import * as fs from "fs";
import path from "path";

export async function generateStaticParams() {
    return fs.readdirSync("features").map(name => ({ slug: path.basename(name, ".json") }));
}

export async function generateMetadata({ params }) {
    const filename = path.join("features", params.slug + ".json");
    const file = fs.readFileSync(filename);
    const feature = JSON.parse(file);

    return {
        title: `${feature.Name} | Can I DevTools`,
        description: feature.description
    };
}

export default function Page() {
    return <ScrollArea></ScrollArea>;
}
