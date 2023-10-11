import * as fs from "fs";
import path from "path";

const categories = {};
const features = [];

fs.readdirSync("features").forEach(name => {
    const filename = path.join("features", name);
    const file = fs.readFileSync(filename);
    const feature = JSON.parse(file);
    features.push(feature);

    const category = feature.Category;
    categories[category] = category in categories ? categories[category] + 1 : 1;
});

fs.writeFileSync("public/data.json", JSON.stringify(features));
