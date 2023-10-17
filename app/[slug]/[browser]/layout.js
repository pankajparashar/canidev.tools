import * as fs from "fs";
import path from "path";

export async function generateStaticParams() {
    const paths = [];
    fs.readdirSync("features").map(name => {
        ["chrome", "firefox", "edge", "safari", "opera", "polypane"].forEach(browser => {
            paths.push({ browser, slug: path.basename(name, ".json") });
        });
    });
    return paths;
}

export async function generateMetadata({ params }) {
    const filename = path.join("features", params.slug + ".json");
    const file = fs.readFileSync(filename);
    const feature = JSON.parse(file);
    const browser = params.browser.charAt(0).toUpperCase() + params.browser.slice(1);

    return {
        title: `${browser} | ${feature.Name} | Can I DevTools`,
        description: feature.description,
    };
}

export default function Layout({ children }) {
    return <>{children}</>;
}
