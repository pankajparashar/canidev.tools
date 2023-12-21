import captureWebsite from "capture-website";
import * as fs from "fs";

(() => {
  const capture = (slug) =>
    captureWebsite.file(
      `http://localhost:3000/${slug}`,
      `./public/images/${slug}.png`,
      {
        width: 500,
        height: 255,
        delay: 0,
        fullPage: false,
        darkMode: false,
        blockAds: true,
        styles: [],
        overwrite: true,
      }
    );

  const f = async (previous, slug) => {
    await previous;
    console.log(slug);
    return capture(slug);
  };

  const isModified = (slug) =>
    fs.statSync(`features/${slug}.hjson`).mtime.getTime() >
    fs.statSync(`public/images/${slug}.png`).mtime.getTime();

  const items = fs
    .readdirSync("features")
    .map((file) => file.split(".")[0])
    .filter(
      (slug) => !fs.existsSync(`public/images/${slug}.png`) || isModified(slug)
    );
  items.reduce(f, Promise.resolve());
})();
