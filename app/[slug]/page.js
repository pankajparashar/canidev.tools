import * as fs from "fs";
import path from "path";

import HJSON from "hjson";
import { ScrollArea } from "@mantine/core";

export async function generateStaticParams() {
	return fs.readdirSync("features").map(name => ({ slug: path.basename(name, ".json") }));
}

export async function generateMetadata({ params }) {
	const filename = path.join("features", params.slug + ".json");
	const file = fs.readFileSync(filename, 'utf-8');
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
		},
		openGraph: {
			title: `${feature.Name} | Can I DevTools`,
			description: feature.Description,
			url: "https://canidev.tools",
			type: "website",
		},
	};
}

export default async function Page() {
	return <ScrollArea></ScrollArea>;
}
