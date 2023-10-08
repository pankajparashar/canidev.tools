import * as fs from "fs";
import path from "path";

import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

import "../public/style.css";

import { AppLayout } from "../components/app-layout";
import { DataProvider } from "../components/data-provider";

export default function RootLayout({ children }) {
    const categories = {};
    const features = [];
    fs.readdirSync(`features`).forEach(name => {
        const filename = path.join("features", name);
        const file = fs.readFileSync(filename);
        const feature = JSON.parse(file);
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
                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider theme={theme} defaultColorScheme="auto">
                    <DataProvider features={features} categories={categories}>
                        <AppLayout categories={categories}>{children}</AppLayout>
                    </DataProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
