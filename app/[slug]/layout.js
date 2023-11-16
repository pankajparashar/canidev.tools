"use client";

import { useContext } from "react";
import { DataContext } from "../../components/data-provider";
import { IconBrandPolypane } from "../../components/tabler-icons";
import { useRouter, usePathname } from "next/navigation";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import Link from "next/link";

import {
	Box,
	NavLink,
	Accordion,
	Paper,
	Badge,
	Alert,
	Divider,
	Group,
	Button,
	Tabs,
	Text,
	SimpleGrid,
} from "@mantine/core";
import {
	IconBrandGithub,
	IconBrandSafari,
	IconBrandEdge,
	IconBrandChrome,
	IconBrandFirefox,
	IconBrandOpera,
	IconArrowBack,
	IconListSearch,
	IconBrightness,
	IconListDetails,
	IconBrandSpeedtest,
	IconCode,
	IconRoute,
	IconBoxMargin,
	IconAccessible,
	IconReportMedical,
	IconTerminal2,
	IconBrandNextjs,
	IconAffiliate,
	IconHexagons,
	IconCrosshair,
	IconChevronRight,
} from "@tabler/icons-react";

export default function Layout({ children, params }) {
	const router = useRouter();
	const pathname = usePathname();
	const isMobile = useMediaQuery("(max-width: 700px)");

	const browser = pathname.split("/")[2];
	const borderColor = theme => `1px solid var(--_app-shell-border-color)`;

	const { features } = useContext(DataContext);
	const feature = features.find(f => f.Slug === params.slug);

	const icons = {
		CSS: <IconBoxMargin />,
		Accessibility: <IconAccessible />,
		Audit: <IconReportMedical />,
		Console: <IconTerminal2 />,
		Elements: <IconCrosshair />,
		JavaScript: <IconBrandNextjs />,
		Network: <IconAffiliate />,
		Other: <IconHexagons />,
		Sources: <IconCode />,
		Performance: <IconBrandSpeedtest />,
	};

	return (
		<Paper className="column" w="100%" withBorder style={{ borderTop: 0, borderBottom: 0 }}>
			<Group justify="space-between" style={{ height: "40px" }}>
				<Badge
					variant="dot"
					radius="0"
					p="md"
					py="lg"
					style={{ borderTop: 0, borderBottom: 0, borderLeft: 0 }}
					styles={{
						label: { fontSize: "var(--mantine-font-size-sm)" },
					}}>
					{feature.Category}
				</Badge>
				<Button
					variant="default"
					size="sm"
					leftSection={<IconBrandGithub size={20} stroke={1.5} />}
					style={{ borderBottom: 0, borderTop: 0 }}
					component="a"
					href={`https://github.com/pankajparashar/canidev.tools/edit/v3/features/${feature.Slug}.json`}>
					<Text fw="700" size="sm">
						Edit
					</Text>
				</Button>
			</Group>
			<Divider />
			<Alert
				color="gray"
				icon={isMobile ? null : icons[feature.Category]}
				title={feature.Name}
				styles={{
					root: { border: 0 },
					title: { fontSize: "var(--mantine-font-size-md)", marginBottom: 0 },
					message: { fontSize: "var(--mantine-font-size-md)", wordBreak: "break-word", marginTop: 0 },
					icon: { marginTop: "5px" },
				}}>
				{feature.Description}
			</Alert>
			<Divider />
			<Tabs value={browser} onChange={value => router.push(`/${params.slug}/${value}`)} variant="pills">
				<Tabs.List grow justify="space-between" spacing={0} style={{ gap: 0 }}>
					<Tabs.Tab
						style={{ borderRight: borderColor() }}
						value="chrome"
						leftSection={<IconBrandChrome stroke={1.5} />}
						disabled={!feature.Chrome}></Tabs.Tab>
					<Tabs.Tab
						style={{ borderRight: borderColor() }}
						value="firefox"
						leftSection={<IconBrandFirefox stroke={1.5} />}
						disabled={!feature.Firefox}></Tabs.Tab>
					<Tabs.Tab
						style={{ borderRight: borderColor() }}
						value="edge"
						leftSection={<IconBrandEdge stroke={1.5} />}
						disabled={!feature.Edge}></Tabs.Tab>
					<Tabs.Tab
						style={{ borderRight: borderColor() }}
						value="safari"
						leftSection={<IconBrandSafari stroke={1.5} />}
						disabled={!feature.Safari}></Tabs.Tab>
					<Tabs.Tab
						value="polypane"
						leftSection={<IconBrandPolypane stroke={1.5} />}
						disabled={!feature.Polypane}></Tabs.Tab>
				</Tabs.List>
			</Tabs>
			<Divider />
			{browser ? (
				children
			) : (
				<>
					<SimpleGrid cols={{ base: 1, sm: 2 }} p="md">
						<Alert
							color="gray"
							title="Authors"
							styles={{
								title: {
									fontSize: "var(--mantine-font-size-md)",
								},
								message: {
									fontSize: "var(--mantine-font-size-md)",
									marginTop: 0,
								},
							}}>
							{feature.Authors ? feature.Authors.join(", ") : ""}
						</Alert>
						<Alert
							color="gray"
							title="Last Modified"
							styles={{
								title: {
									fontSize: "var(--mantine-font-size-md)",
								},
								message: {
									fontSize: "var(--mantine-font-size-md)",
									marginTop: 0,
								},
							}}>
							{feature.LastModifiedTime}
						</Alert>
						<Alert
							color="gray"
							title="Newsletter"
							styles={{
								title: {
									fontSize: "var(--mantine-font-size-md)",
								},
								message: {
									fontSize: "var(--mantine-font-size-md)",
									marginTop: 0,
								},
							}}>
							{feature.Newsletter || "-"}
						</Alert>
					</SimpleGrid>
					<Divider />
					<Accordion
						defaultValue="related"
						styles={{
							content: { padding: "0 1em" },
						}}>
						<Accordion.Item value="related">
							<Accordion.Control icon={<IconRoute />} disabled={!feature.Related}>
								<Text fw={700}>Related{`(${feature.Related ? feature.Related.length : 0})`}</Text>
							</Accordion.Control>
							<Divider />
							{feature.Related ? (
								<Accordion.Panel>
									{feature.Related.map((f, idx) => (
										<Box key={f.Slug}>
											{idx !== 0 && <Divider />}
											<NavLink
												label={f.Name}
												description={f.Description}
												styles={{
													label: {
														fontSize: "var(--mantine-font-size-md)",
													},
													description: {
														fontSize: "var(--mantine-font-size-md)",
														maxWidth: "750px",
													},
												}}
												component={Link}
												href={{
													pathname: `/${f.Slug}`,
												}}
												rightSection={<IconChevronRight stroke={1} />}
											/>
										</Box>
									))}
								</Accordion.Panel>
							) : null}
						</Accordion.Item>
					</Accordion>
				</>
			)}
		</Paper>
	);
}
