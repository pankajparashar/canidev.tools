"use client";

import { Card, createTheme } from "@mantine/core";

export let theme = createTheme({
    /** Your theme override here */
    fontFamily: "Geist Mono",
    defaultRadius: "xs",
    primaryColor: "dark",

    components: {
        Card: Card.extend({
            defaultProps: {
                withBorder: true,
                p: 0,
            },
        }),
    },
});
