import { Analytics } from "@vercel/analytics/react";

import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

import "../public/style.css";
import fetch from "isomorphic-unfetch";

import { AppLayout } from "../components/app-layout";
import { DataProvider } from "../components/data-provider";

export const metadata = {
    title: "Can I DevTools?",
    description: "It is like @CanIUse, but for the browser devtools, created by Pankaj Parashar and curated by community.",
};

export default async function RootLayout({ children }) {
    const features = await fetch(`https://canidev.tools/data.json`).then(res => res.json());
    const categories = {};
    features.forEach(feature => {
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
