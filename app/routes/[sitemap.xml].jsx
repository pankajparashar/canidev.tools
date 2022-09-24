import * as fs from 'fs';
import path from 'path';

export const loader = () => {
	const urlset = []
	fs.readdirSync(`${__dirname}/../features`).forEach((name) => {
		const filename = path.join(`${__dirname}/../features`, name);
		const file = fs.readFileSync(filename);
		const record = JSON.parse(file);
		
		urlset.push(`
			<url>
				<loc>https://canidev.tools/${record.Slug}</loc>
				<lastmod>${record.LastModifiedTime}</lastmod>
				<priority>1.0</priority>
			</url>
		`);
		["Chrome", "Firefox", "Edge", "Safari", "Opera"].forEach(browser => {
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
	
	const content = `
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${urlset.join("\n")}
		</urlset>
	`
	return new Response(content,{
		status: 200,
		headers: {
			"Content-Type": "application/xml",
			"xml-version": "1.0",
			"encoding": "UTF-8"
		}
	});
};