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

export default function Layout({ children }) {
    return <>{children}</>;
}
