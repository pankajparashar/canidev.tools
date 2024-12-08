"use client";

import { Card, createTheme } from "@mantine/core";

export let theme = createTheme({
	/** Your theme override here */
	fontFamily: "Neutral Mono",
	defaultRadius: "sm",
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
