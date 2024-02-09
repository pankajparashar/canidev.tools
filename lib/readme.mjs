import * as fs from "fs";
import path from "path";
import HJSON from "hjson";

const getThumbnailURL = url => {
    const parts = url.replace(".mp4", ".jpg").split("/")
    parts[6] = "l_play,w_200,o_50"
    return parts.join("/")
}

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
                if (b.Video) markdown += `[![](${getThumbnailURL(b.Video)})](${b.Video})`;
            }
            markdown += "\n\n"
        });
    });

    fs.writeFileSync("README.md", markdown);
})();
