import * as fs from "fs";
import path from "path";

const BROWSERS = ["Chrome", "Firefox", "Edge", "Safari", "Opera", "Polypane"];

const readme = () => {
    let markdown = "";

    fs.readdirSync("features").forEach(file => {
        const feature = JSON.parse(fs.readFileSync(path.join("features", file)));
        markdown += `## ${feature.Name}\n${feature.Description}\n\n`;

        BROWSERS.forEach(browser => {
            const link = `https://canidev.tools/${feature.Slug}/${browser.toLowerCase()}`;
            const b = feature[browser];
            if (b) {
                markdown += `[${browser}](${link}): \n`;
                markdown += `${Array.isArray(b.Notes) ? b.Notes.join("\n") : b.Notes} \n`;
            }
        });
    });

    fs.writeFileSync("README.md", markdown);
};

readme();