import captureWebsite from "capture-website";

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
        removeElements: [".collapse"],
        styles: [
          `
			body {
				padding: 2em 2em 0; 
				background: rgb(220, 220, 220);
			}
		  	body > div.grid {
				background-color: white;
				--shadow-color: 0deg 0% 60%;
				box-shadow:	0px -1px 1.1px hsl(var(--shadow-color) / 0.29),
				0px -2.6px 2.9px -0.6px hsl(var(--shadow-color) / 0.29),
				0px -5.2px 5.9px -1.2px hsl(var(--shadow-color) / 0.29),
				0px -10.4px 11.7px -1.9px hsl(var(--shadow-color) / 0.29),
				0px -20px 22.5px -2.5px hsl(var(--shadow-color) / 0.29);
		  	}
		  	`,
        ],
        overwrite: true,
      }
    );

  const f = async (previous, slug) => {
    await previous;
    return capture(slug);
  };

  const items = fs
    .readdirSync("features")
    .map((file) => file.split(".")[0])
    .filter(
      (slug) =>
        !fs.existsSync(`public/images/${slug}.png`) ||
        fs.statSync(`features/${slug}.json`).mtime.getTime() >
          fs.statSync(`public/images/${slug}.png`).mtime.getTime()
    );
  console.log(items);
  items.reduce(f, Promise.resolve());
})();
