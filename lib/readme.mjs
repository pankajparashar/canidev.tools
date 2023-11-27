import * as fs from "fs";
import path from "path";

(() => {
    let markdown = "";

    fs.readdirSync("features").forEach(file => {
        const feature = JSON.parse(fs.readFileSync(path.join("features", file)));
        const slug = path.basename(file, ".json");
        markdown += `## ${feature.Name}\n${feature.Description}\n\n`;

        ["Chrome", "Firefox", "Edge", "Safari", "Polypane"].forEach(browser => {
            const link = `https://canidev.tools/${slug}/${browser.toLowerCase()}`;
            const b = feature[browser];
            if (b) {
                markdown += `[${browser}](${link}): \n`;
                markdown += `${Array.isArray(b.Notes) ? b.Notes.join("\n") : b.Notes}\n`;
                markdown += b.Image ? `\n\n![](${b.Image})\n\n` : "\n";
            }
        });
    });

    fs.writeFileSync("README.md", markdown);
})();
