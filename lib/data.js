import * as fs from "fs";
import path from "path";

export const getData = () => {
    const categories = {};
    const features = [];

    fs.readdirSync(path.join(process.cwd(), "features")).forEach(name => {
        const filename = path.join(process.cwd(), "features", name);
        const file = fs.readFileSync(filename);
        const feature = JSON.parse(file);
        features.push(feature);

        const category = feature.Category;
        categories[category] = category in categories ? categories[category] + 1 : 1;
    });

    return { categories, features };
};
