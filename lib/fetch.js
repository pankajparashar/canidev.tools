const fs = require("fs");

const API_KEY = process.env.API_KEY;
const BASE = process.env.BASE;
const BROWSERS = ["Chrome", "Firefox", "Safari", "Edge"];

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

  fs.writeFileSync("data.json", JSON.stringify(records.map((r) => r.fields)));
  return records;
}
