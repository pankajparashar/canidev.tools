import * as fs from "fs";
import path from "path";

import "@mantine/core/styles.css";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

import "../public/style.css";
import { AppLayout } from "../components/app-layout";

export default function RootLayout({ children }) {
    const categories = {};
    fs.readdirSync(`features`).forEach(name => {
        const filename = path.join("features", name);
        const file = fs.readFileSync(filename);
        const feature = JSON.parse(file);

        const category = feature.Category;
        categories[category] = category in categories ? categories[category] + 1 : 1;
    });
    const theme = {
        fontFamily: "Operator Mono",
        primaryColor: "dark",
        defaultRadius: 0,
    };

    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
            </head>
            <body>
                <MantineProvider theme={theme}>
                    <AppLayout categories={categories}>{children}</AppLayout>
                </MantineProvider>
            </body>
        </html>
    );
}
