import * as fs from "fs"
import captureWebsite from 'capture-website';

const apiCall = slug => {
	return captureWebsite.file(`http://localhost:3000/${slug}`, `./public/images/${slug}.png`, {
  		width: 550,
  		height: 270,
  		styles: [
	  		`
	  		body {
		  		--shadow-color: 0deg 0% 63%;
		  		margin: 2em 2em 0 !important;
		  		box-shadow: 0px -1px 1.1px hsl(var(--shadow-color) / 0.29),
		  		0px -2.6px 2.9px -0.6px hsl(var(--shadow-color) / 0.29),
		  		0px -5.2px 5.9px -1.2px hsl(var(--shadow-color) / 0.29),
		  		0.1px -10.4px 11.7px -1.9px hsl(var(--shadow-color) / 0.29),
		  		0.2px -20px 22.5px -2.5px hsl(var(--shadow-color) / 0.29);
	  		}
	  		`
  		],
  		overwrite: true
		});	
}

const f = async (previous, slug) => {
  await previous;
  return apiCall(slug);
};

const items = fs.readdirSync("features").map(f => f.split(".")[0])
apiCall("set-keyboard-shortcuts")