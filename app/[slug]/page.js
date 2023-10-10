import { ScrollArea } from "@mantine/core";

import * as fs from "fs";
import path from "path";

export function generateMetadata1({ params }) {
    const filename = path.join("features", params.slug + ".json");
    const file = fs.readFileSync(filename);
    const feature = JSON.parse(file);

    return {
        title: feature.Name,
        description: feature.Description,
    };
}

export default function Page() {
    return <ScrollArea></ScrollArea>;
}
