import * as fs from "fs";
import path from "path";

import { Analytics } from "@vercel/analytics/react";

import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

import "../public/style.css";

import { AppLayout } from "../components/app-layout";
import { DataProvider } from "../components/data-provider";

export const metadata = {
    title: "Can I DevTools?",
    description: "It is like @CanIUse, but for the browser devtools, created by Pankaj Parashar and curated by community.",
};

export default async function RootLayout({ children }) {
    const categories = {};
    const features = [];

    fs.readdirSync("features").forEach(filename => {
        const filepath = path.join("features", filename);
        const fileobj = fs.readFileSync(filepath);
        const mtime = fs.statSync(filepath).mtime
        
        const feature = JSON.parse(fileobj);
        feature.mtime = mtime.toLocaleDateString();
        features.push(feature);

        const category = feature.Category;
        categories[category] = category in categories ? categories[category] + 1 : 1;
    });

    const theme = {
        fontFamily: "Operator Mono",
        fontFamilyMonospace: "Operator Mono",
        primaryColor: "dark",
        defaultRadius: 0,
        breakpoints: {
            sm: "700px",
            md: "1150px",
        },
    };

    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link
                  rel="icon"
                  href="/icon?<generated>"
                  type="image/<generated>"
                  sizes="<generated>"
                />
                <link
                  rel="apple-touch-icon"
                  href="/apple-icon?<generated>"
                  type="image/<generated>"
                  sizes="<generated>"
                />
                <meta name="theme-color" content="#000000" />

                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider theme={theme} defaultColorScheme="auto">
                    <DataProvider features={features} categories={categories}>
                        <AppLayout categories={categories}>{children}</AppLayout>
                    </DataProvider>
                </MantineProvider>
                <Analytics />
            </body>
        </html>
    );
}
