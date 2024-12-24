// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import { theme } from "@/lib/theme";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./main.css";

export const metadata = {
	title: "Devtools GPT",
	description:
		"Your personal AI assistant to answer devtools queries. It has the latest up-to-date knowledge about all major browsers like Chrome, Firefox, Edge, Safari and Polypane!",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider theme={theme}>
					<Suspense>{children}</Suspense>
				</MantineProvider>
				<Analytics />
			</body>
		</html>
	);
}
