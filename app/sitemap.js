import * as fs from "fs";
import path from "path";

export default function sitemap() {
	
	const urlset = []
	fs.readdirSync("../features").forEach(filename => {
		const filepath = path.join("features", filename);
		const fileobj = fs.readFileSync(filepath);
		const mtime = fs.statSync(filepath).mtime
		
		const feature = JSON.parse(fileobj);
		feature.LastModifiedTime = mtime.toLocaleDateString();
		features.push(feature);

		urlset.push(`
			<url>
				<loc>https://canidev.tools/${record.Slug}</loc>
				<lastmod>${record.LastModifiedTime}</lastmod>
				<priority>1.0</priority>
			</url>
		`);
	
		["Chrome", "Firefox", "Edge", "Safari", "Polypane"].forEach(browser => {
			if (browser in record) {
				urlset.push(`
					<url>
						<loc>https://canidev.tools/${record.Slug}/${browser.toLowerCase()}</loc>
						<lastmod>${record.LastModifiedTime}</lastmod>
						<priority>1.0</priority>
					</url>
				`)
			}
		})
	});
	
	return urlset
}