import "dotenv/config"
import * as fs from "fs"
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

	Object.entries(DATA[MAIN]).forEach(([_, main]) => {
		const fields = ["Name", "Slug", "Description", "Category", "Newsletter", "LastModifiedTime", "Author"]
		const feature = {}
		
		fields.forEach(f => (feature[f]=main[f]))
		BROWSERS.forEach(BROWSER => {
			if(main[BROWSER]) {
				const id = main[BROWSER][0]
				const {Main, ...record} = DATA[BROWSER][id]
				feature[BROWSER] = record
			}
		})
		fs.writeFileSync(`features/${feature.Slug}.json`, JSON.stringify(feature, null, 2));
	})
	
	const capture = slug => captureWebsite.file(`http://localhost:3000/${slug}`, `./public/images/${slug}.png`, {
	  width: 570,
	  height: 295,
	  styles: [
		  `
		  body {
			  --shadow-color: 0deg 0% 63%;
			  margin: 2em 2em 0 !important;
			  box-shadow: 0px -1px 1.1px hsl(var(--shadow-color) / 0.29),
			  0px -2.6px 2.9px -0.6px hsl(var(--shadow-color) / 0.29),
			  0px -5.2px 5.9px -1.2px hsl(var(--shadow-color) / 0.29),
			  0.1px -10.4px 11.7px -1.9px hsl(var(--shadow-color) / 0.29),
			  0.2px -20px 22.5px -2.5px hsl(var(--shadow-color) / 0.29);
		  }
		  `
	  ],
	  overwrite: true
	});
	
	const f = async (previous, slug) => {
	  await previous;
	  return capture(slug);
	};
	const items = fs.readdirSync("features").map(f => f.split(".")[0])
	//items.reduce(f, Promise.resolve());
})();