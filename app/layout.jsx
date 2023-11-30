import * as fs from "fs";
import path from "path";

import { Analytics } from "@vercel/analytics/react";
import HJSON from "hjson";

import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

import "../public/style.css";
import "@mantine/code-highlight/styles.css";

import { AppLayout } from "../components/app-layout";
import { DataProvider } from "../components/data-provider";

export const metadata = {
    title: "Can I DevTools?",
    description: "It is like @CanIUse, but for the browser devtools, created by Pankaj Parashar and curated by community.",
    metadataBase: new URL("https://canidev.tools"),
    twitter: {
        card: "summary_large_image",
        title: "Can I DevTools?",
        description: "It is like @CanIUse, but for the browser devtools, created by Pankaj Parashar and curated by community.",
        creator: "@CanIDevTools",
        site: "canidev.tools",
    },
    openGraph: {
        title: "Can I DevTools?",
        description: "It is like @CanIUse, but for the browser devtools, created by Pankaj Parashar and curated by community.",
        url: "https://canidev.tools",
        type: "website",
    },
};

export default async function RootLayout({ children }) {
    const categories = {};
    const features = [];
    const tags = {};

    fs.readdirSync("features").forEach(filename => {
        const filepath = path.join("features", filename);
        const fileobj = fs.readFileSync(filepath, "utf8");
        const mtime = fs.statSync(filepath).mtime;

        const feature = HJSON.parse(fileobj);
        feature.LastModifiedTime = mtime.toLocaleDateString();
        feature.Slug = path.basename(filename, ".hjson");
        features.push(feature);

        const category = feature.Category;
        categories[category] = category in categories ? categories[category] + 1 : 1;

        if (feature.Tags) {
            feature.Tags.forEach(tag => {
                tags[tag] = tag in tags ? [...tags[tag], feature.Slug] : [feature.Slug];
            });
        }
    });

    features.forEach(feature => {
        if (feature.Related) {
            const related = [];
            feature.Related.forEach(slug => {
                const f = features.find(f => f.Slug === slug);
                related.push(f);
            });
            feature.Related = related;
        }
    });

    const theme = {
        fontFamily: "Berkley",
        fontFamilyMonospace: "Berkley",
        primaryColor: "dark",
        primaryShade: 4,
        defaultRadius: 0,
        breakpoints: {
            sm: "700px",
            md: "1150px",
        },
    };

    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, maximum-scale=1, initial-scale=1" />
                <link rel="canonical" href="https://canidev.tools" />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-icon?<generated>" type="image/<generated>" sizes="<generated>" />
                <meta name="theme-color" content="#000000" />

                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider theme={theme} defaultColorScheme="auto">
                    <DataProvider {...{ features, categories, tags }}>
                        <AppLayout>{children}</AppLayout>
                    </DataProvider>
                </MantineProvider>
                <Analytics />
            </body>
        </html>
    );
}
