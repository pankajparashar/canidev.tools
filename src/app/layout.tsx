// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import { theme } from "@/lib/theme";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import "@mantine/core/styles.css";
import { Suspense } from "react";
import "./main.css";

export const metadata = {
	title: "Devtools GPT",
	description: "I have followed setup instructions carefully",
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
			</body>
		</html>
	);
}
