import "dotenv/config"
import * as fs from "fs"
import path from 'path';
import clipboard from 'clipboardy';

import fetch from "node-fetch"
import captureWebsite from 'capture-website';

const API_KEY = process.env.API_KEY;
const BASE = process.env.BASE;
const MAIN = "Main"
const BROWSERS = ["Chrome", "Firefox", "Edge", "Safari", "Opera"];

(async () => {
	const DATA = {}
	await Promise.all(
		[MAIN, ...BROWSERS].map(async (TABLE) => {
			const response = await fetch(
				`https://api.airtable.com/v0/${BASE}/${TABLE}`, {
					headers: { Authorization: `Bearer ${API_KEY}` }
				}
			);
			const { records } = await response.json();
			const result = {}
			records.forEach((record) => (result[record.id] = record.fields));
			
			DATA[TABLE] = result;
		})
	);

	fs.readdirSync('features').forEach(f => fs.rmSync(`features/${f}`));
	Object.entries(DATA[MAIN]).forEach(([_, main]) => {
		const fields = ["Name", "Slug", "Description", "Category", "Newsletter", "LastModifiedTime", "Author"]
		const feature = {}
		fields.forEach(f => (feature[f]=main[f]))

		const output = `features/${feature.Slug}.json`
		BROWSERS.forEach(BROWSER => {
			if(main[BROWSER]) {
				const id = main[BROWSER][0]
				const {Main, ...record} = DATA[BROWSER][id]
				feature[BROWSER] = record
			}
		})
		fs.writeFileSync(output, JSON.stringify(feature, null, 2));
	})
	
	ogimage()
	readme()
})();

const ogimage = () => {
	const capture = slug => captureWebsite.file(`http://localhost:3000/${slug}`, `./public/images/${slug}.png`, {
		width: 570,
		height: 295,
		styles: [
		  	`
			html { background-color: #f5f5f5 }
		  	body {
				margin: 2em 2em 0 !important;			
				background-color: white;
				--shadow-color: 0deg 0% 60%;
				box-shadow:	0px -1px 1.1px hsl(var(--shadow-color) / 0.29),
				0px -2.6px 2.9px -0.6px hsl(var(--shadow-color) / 0.29),
				0px -5.2px 5.9px -1.2px hsl(var(--shadow-color) / 0.29),
				0px -10.4px 11.7px -1.9px hsl(var(--shadow-color) / 0.29),
				0px -20px 22.5px -2.5px hsl(var(--shadow-color) / 0.29);
		  	}
		  	`
		],
		overwrite: true
	});

	const f = async (previous, slug) => {
  	await previous;
  	return capture(slug);
	};

	const items = fs.readdirSync("features")
					.map(file => file.split(".")[0])
					.filter(slug => 
						!fs.existsSync(`public/images/${slug}.png`) || new Date(JSON.parse(fs.readFileSync(`features/${slug}.json`)).LastModifiedTime).getTime() > fs.statSync(`public/images/${slug}.png`).mtime.getTime()
					)
	items.reduce(f, Promise.resolve());	
}

const readme = () => {
	let markdown = "# Can I DevTools? \n It's like @CanIUse but for the browser devtools, created & curated by Pankaj Parashar. \n\n  ![image](https://user-images.githubusercontent.com/38640616/192102419-a0b8515f-50ae-4fb2-9646-a366660585cb.png) \n"
	fs.readdirSync("features").forEach((file, i) => {
		const slug = file.split(".")[0]
		const feature = JSON.parse(fs.readFileSync(path.join("features", file)))
		markdown += `## ${i+1}. ${feature.Name} \n ${feature.Description} \n`;
			
		["Chrome", "Firefox", "Edge", "Safari", "Opera"].forEach(browser => {
			const link = `https://canidev.tools/${slug}/${browser.toLowerCase()}`
			if(feature[browser]) {
				markdown += `- [${browser}](${link}) \n ${feature[browser].Notes}`
			}
		})	
	})
	
	clipboard.writeSync(markdown);
	fs.writeFileSync("README.md", markdown);	
}