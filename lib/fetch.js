

const API_KEY = process.env.API_KEY;
const BASE = process.env.BASE;
export const BROWSERS = ["Chrome", "Firefox", "Edge", "Safari", "Opera"];

export async function getData() {
	const headers = { Authorization: `Bearer ${API_KEY}` };

	// BROWSERS
	const data = {};
	await Promise.all(
		BROWSERS.map(async (TABLE) => {
			const response = await fetch(
				`https://api.airtable.com/v0/${BASE}/${TABLE}`,
				{
					headers
				}
			);
			const { records } = await response.json();
			const result = {};
			records.forEach((record) => (result[record.id] = record.fields));

			data[TABLE] = result;
		})
	);

	// MAIN
	const response = await fetch(`https://api.airtable.com/v0/${BASE}/Main`, {
		headers
	});
	let { records } = await response.json();
	records = records.map((record) => ({ ...record, display: true }));

	// JOIN
	records.forEach((record) => {
		const { fields } = record;
		BROWSERS.forEach((browser) => {
			const id = fields[browser]?.pop();
			fields[browser] = id ? data[browser][id] : null;
		});
	});

	return records;
}
