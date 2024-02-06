import * as fs from "fs";
import path from "path";
import HJSON from "hjson";

(() => {
    let markdown = "![Alt](https://repobeats.axiom.co/api/embed/5265b69185b60c69748830b8d25bfd0214472e9c.svg)";

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
                markdown += b.Image ? `\n\n![](${b.Image})\n\n` : "\n";
            }
        });
    });

    fs.writeFileSync("README.md", markdown);
})();
