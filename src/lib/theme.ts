"use client";

import { Anchor, Card, createTheme } from "@mantine/core";

export let theme = createTheme({
	fontFamily: "PP Supply Mono",
	fontFamilyMonospace: "PP Supply Mono",
	defaultRadius: "xs",
	primaryColor: "violet",

	components: {
		Card: Card.extend({
			defaultProps: {
				withBorder: true,
			},
		}),

		Anchor: Anchor.extend({
			defaultProps: {
				underline: "never",
			},
		}),
	},
});
