import "dotenv/config"
import * as fs from "fs"

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
		const fields = ["Name", "Slug", "Description", "Category", "Newsletter", "LastModifiedTime", "CreatedTime"]
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
})();