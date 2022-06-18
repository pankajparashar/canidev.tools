import "dotenv/config"
import * as fs from "fs"

import { BROWSERS, getData } from "./fetch.mjs"

export async function exportData() {
    const records = await getData()

    records.forEach((record) => {
        const { fields } = record
        const Data = {}

        BROWSERS.forEach(browser => {
            if (fields[browser]) {
                const { LastModified, Main, ...Rest } = fields[browser]
                Data[browser] = Rest
            }
        })

        fs.writeFileSync(`features/${fields.Slug}.json`, JSON.stringify(Data, null, 2));
    });
}

exportData()