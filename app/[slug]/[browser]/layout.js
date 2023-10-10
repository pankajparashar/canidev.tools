import * as fs from "fs";
import path from "path";

export function generateMetadata1({ params }) {
    const filename = path.join("features", params.slug + ".json");
    const file = fs.readFileSync(filename);
    const feature = JSON.parse(file);
    const browser = params.browser.charAt(0).toUpperCase() + params.browser.slice(1);

    return {
        title: `${feature.Name} | ${browser}`,
        description: feature.Description,
    };
}

export default function Layout({ children }) {
    return <>{children}</>;
}
