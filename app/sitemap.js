import * as fs from "fs";
import path from "path";

import HJSON from "hjson";

export default function sitemap() {
    const urlset = [];
    fs.readdirSync("features").forEach(filename => {
        const filepath = path.join("features", filename);
        const fileobj = fs.readFileSync(filepath, "utf-8");
        const mtime = fs.statSync(filepath).mtime;

        const feature = HJSON.parse(fileobj);
        const slug = path.basename(filename, ".hjson");

        urlset.push({
            url: `https://canidev.tools/${slug}`,
            lastModified: mtime,
            changeFrequency: "monthly",
            priority: 1,
        });

        ["Chrome", "Firefox", "Edge", "Safari", "Opera"].forEach(browser => {
            if (browser in feature) {
                urlset.push({
                    url: `https://canidev.tools/${slug}/${browser.toLowerCase()}`,
                    lastModified: mtime,
                    changeFrequency: "monthly",
                    priority: 1,
                });
            }
        });
    });

    return urlset;
}
