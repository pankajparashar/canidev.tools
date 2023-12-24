import captureWebsite from "capture-website";
import * as fs from "fs";

(async () => {
  const isModified = (slug) =>
    fs.statSync(`features/${slug}.hjson`).mtime.getTime() >
    fs.statSync(`public/images/${slug}.png`).mtime.getTime();
  
  await Promise.all(fs
    .readdirSync("features")
    .map((file) => file.split(".")[0])
    .filter(
      (slug) => !fs.existsSync(`public/images/${slug}.png`) || isModified(slug)
    ).map(slug => {
    return captureWebsite.file(
        `http://localhost:3000/${slug}`,
        `./public/images/${slug}.png`,
        {
          width: 500,
          height: 255,
          delay: 0,
          fullPage: false,
          darkMode: false,
          blockAds: true,
          overwrite: true
        }
      )
  }));
})();
