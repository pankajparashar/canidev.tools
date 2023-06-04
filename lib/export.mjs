import "dotenv/config"
import * as fs from "fs"
import path from 'path';
import Airtable from 'airtable'

import captureWebsite from 'capture-website';

const API_KEY = process.env.API_KEY;
const BASE = process.env.BASE;
const MAIN = "Main"
const BROWSERS = ["Chrome", "Firefox", "Edge", "Safari", "Opera"];

const ogimage = () => {
	const capture = slug => captureWebsite.file(`http://localhost:3000/${slug}`, `./public/images/${slug}.png`, {
		width: 500,
		height: 255,
		delay: 0,
		fullPage: false,
		darkMode: false,
		blockAds: true,
		removeElements: [".collapse"],
		styles: [
		  	`
			body {
				padding: 2em 2em 0; 
				background: rgb(220, 220, 220);
			}
		  	body > div.grid {
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
	console.log(items)
	items.reduce(f, Promise.resolve());	
}

const readme = () => {
	let markdown = `![image](https://canidev.tools/social-image.png) \n\n`
	fs.readdirSync("features").forEach((file, i) => {
		const slug = file.split(".")[0]
		const feature = JSON.parse(fs.readFileSync(path.join("features", file)))
		markdown += `## ${i+1}. ${feature.Name} \n ${feature.Description} \n`;
			
		["Chrome", "Firefox", "Edge", "Safari", "Opera", "Polypane"].forEach(browser => {
			const link = `https://canidev.tools/${slug}/${browser.toLowerCase()}`
			if(feature[browser]) {
				markdown += `### [${browser}](${link}) \n`
				markdown += `${Array.isArray(feature[browser].Notes) ? feature[browser].Notes.join("\n") : feature[browser].Notes} \n`
			}
		})	
	})
	
	fs.writeFileSync("README.md", markdown);	
}

ogimage()
readme()