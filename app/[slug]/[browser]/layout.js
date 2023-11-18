import * as fs from "fs";
import path from "path";

export async function generateStaticParams() {
	const paths = [];
	fs.readdirSync("features").map(name => {
		["chrome", "firefox", "edge", "safari", "polypane"].forEach(browser => {
			paths.push({ browser, slug: path.basename(name, ".json") });
		});
	});
	return paths;
}

export async function generateMetadata({ params }) {
	const filename = path.join("features", params.slug + ".json");
	const file = fs.readFileSync(filename);
	const feature = JSON.parse(file);
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
		},
		openGraph: {
			title: `${browser} | ${feature.Name} | Can I DevTools`,
			description: feature.Description,
			url: "https://canidev.tools",
			type: "website",
		},
	};
}

export default function Layout({ children }) {
	return <>{children}</>;
}
