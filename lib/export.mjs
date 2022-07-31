import "dotenv/config"
import * as fs from "fs"
import fetch from "node-fetch"

const API_KEY = process.env.API_KEY;
const BASE = process.env.BASE;
export const BROWSERS = ["Chrome", "Firefox", "Edge", "Safari", "Opera"];

const URL = "https://www.canidev.tools"

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

export async function exportData() {
    const records = await getData()
    const urlset = []
    fs.readdirSync('features').forEach(f => fs.rmSync(`features/${f}`));

    records.forEach((record) => {
        const { fields } = record
        const Data = {
            Name: fields.Name,
            Slug: fields.Slug,
            Category: fields.Category
        }
        urlset.push(`
    <url>
        <loc>${URL}/${fields.Slug}/</loc>
        <lastmod>${fields.LastModifiedTime}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
    </url>`
        )

        BROWSERS.forEach(browser => {
            if (fields[browser]) {
                const { Category, LastModified, Main, ...Rest } = fields[browser]
                Data[browser] = Rest

                urlset.push(`
    <url>
        <loc>${URL}/${fields.Slug}/${browser.toLowerCase()}</loc>
        <lastmod>${LastModified}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
    </url>
    `)
            }
        })
        
        fs.writeFileSync(`features/${fields.Slug}.json`, JSON.stringify(record, null, 2));
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">    
    ${urlset.join("")}
</urlset>`;
    fs.writeFileSync(`public/sitemap.xml`, sitemap);
}

exportData()