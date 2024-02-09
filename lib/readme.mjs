import * as fs from "fs";
import path from "path";
import HJSON from "hjson";

(() => {
    let markdown = "";

    fs.readdirSync("features").forEach(filename => {
        const filepath = path.join("features", filename);
        const fileobj = fs.readFileSync(filepath, "utf8");

        const feature = HJSON.parse(fileobj);
        const slug = path.basename(filename, ".hjson");
        markdown += `## ${feature.Name}\n${feature.Description}\n\n`;

        ["Chrome", "Firefox", "Edge", "Safari", "Polypane"].forEach(browser => {
            const link = `https://canidev.tools/${slug}/${browser.toLowerCase()}`;
            const b = feature[browser];
            if (b) {
                markdown += `[${browser}](${link}): \n`;
                if (b.Notes) markdown += `${Array.isArray(b.Notes) ? b.Notes.join("\n") : b.Notes}\n`;
                if (b.Code) markdown += `<pre>${b.Code}</pre>`;
                if (b.Thumbnail && b.Video) markdown += `[![](${b.Thumbnail})](${b.Video})`;
            }
            markdown += "\n\n"
        });
    });

    fs.writeFileSync("README.md", markdown);
})();
