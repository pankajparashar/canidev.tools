import { ScrollArea } from "@mantine/core";

import * as fs from "fs";
import path from "path";
import { kv } from "@vercel/kv";

export async function generateStaticParams() {
	return fs.readdirSync("features").map(name => ({ slug: path.basename(name, ".json") }));
}

export async function generateMetadata({ params }) {
	const filename = path.join("features", params.slug + ".json");
	const file = fs.readFileSync(filename);
	const feature = JSON.parse(file);

	try {
		const views = await kv.get(params.slug);
		console.log(params.slug, views);
		await kv.set(params.slug, views ? Number(views) + 1 : 1);
	} catch (err) {
		console.log(err);
	}

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

export default function Page() {
	return <ScrollArea></ScrollArea>;
}
