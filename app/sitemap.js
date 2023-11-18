import * as fs from "fs";
import path from "path";

export default function sitemap() {
	const urlset = [];
	fs.readdirSync("features").forEach(filename => {
		const filepath = path.join("features", filename);
		const fileobj = fs.readFileSync(filepath);
		const mtime = fs.statSync(filepath).mtime;

		const feature = JSON.parse(fileobj);
		feature.LastModifiedTime = mtime.toLocaleDateString();
		feature.Slug = path.basename(filename, ".json");

		urlset.push({
			url: `https://canidev.tools/${feature.Slug}`,
			lastModified: feature.LastModifiedTime,
			changeFrequency: "monthly",
			priority: 1,
		});

		["Chrome", "Firefox", "Edge", "Safari", "Opera"].forEach(browser => {
			if (browser in feature) {
				urlset.push({
					url: `https://canidev.tools/${feature.Slug}/${browser.toLowerCase()}`,
					lastModified: feature.LastModifiedTime,
					changeFrequency: "monthly",
					priority: 1,
				});
			}
		});
	});

	return urlset;
}
