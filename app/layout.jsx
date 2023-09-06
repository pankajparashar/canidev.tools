import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

import { AppLayout } from "../components/app-layout";
import "../public/globals.css";

import * as fs from "fs";
import path from "path";

export default function RootLayout({ children }) {
  const categories = {};
  fs.readdirSync(`features`).forEach((name) => {
    const filename = path.join("features", name);
    const file = fs.readFileSync(filename);
    const feature = JSON.parse(file);

    const category = feature.Category;
    categories[category] =
      category in categories ? categories[category] + 1 : 1;
  });

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body>
        <MantineProvider
          theme={{
            fontFamily: '"Operator Mono", sans-serif',
          }}
        >
          <AppLayout categories={categories}>{children}</AppLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
