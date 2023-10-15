import { ScrollArea } from "@mantine/core";

import * as fs from "fs";
import path from "path";

export async function generateStaticParams() {
    return fs.readdirSync("features").map(name => ({ slug: path.basename(name, ".json") }));
}

export default function Page() {
    return <ScrollArea></ScrollArea>;
}
