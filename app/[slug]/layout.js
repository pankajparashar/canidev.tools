"use client";

import { useContext, useState, useEffect } from "react";
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
	IconEye,
	IconClockHour3,
	IconNews,
	IconUsers,
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
	IconCirclesRelation,
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
	const [views, setViews] = useState("-");
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
		Debugger: <IconCode />,
		Performance: <IconBrandSpeedtest />,
	};

	useEffect(() => {
		fetch(`https://real-catfish-46253.kv.vercel-storage.com/get/${params.slug}`, {
			headers: {
				Authorization:
					"Bearer AbStASQgMTViZjljMWYtZDFjMS00YzExLWE2ZDgtMTQ1NTJmMWVkZDFlNTU2YWMzMzdmMTUyNGU4YjhjMjMzMjcxMTE1YjAxN2M=",
			},
		})
			.then(response => response.json())
			.then(data => {
				const viewCount = typeof Number(data.result) === "number" ? Number(data.result) + 1 : 1;
				setViews(viewCount);
				fetch(`https://real-catfish-46253.kv.vercel-storage.com/set/${params.slug}/${viewCount}`, {
					headers: {
						Authorization:
							"Bearer AbStASQgMTViZjljMWYtZDFjMS00YzExLWE2ZDgtMTQ1NTJmMWVkZDFlNTU2YWMzMzdmMTUyNGU4YjhjMjMzMjcxMTE1YjAxN2M=",
					},
				});
			});
	}, []);

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
							icon={<IconUsers />}
							title="Authors"
							styles={{
								icon: { marginTop: "5px" },
								title: {
									fontSize: "var(--mantine-font-size-md)",
								},
								message: {
									fontSize: "var(--mantine-font-size-md)",
									marginTop: 0,
								},
							}}>
							{feature.Authors
								? feature.Authors.map((author, idx) => (
										<span key={author}>
											<a href={`//twitter.com/${author}`} target="_blank">
												{author}
											</a>
											{idx !== feature.Authors.length - 1 ? ", " : ""}
										</span>
								  ))
								: ""}
						</Alert>
						<Alert
							icon={<IconClockHour3 />}
							title="Last Modified"
							styles={{
								icon: { marginTop: "5px" },
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
							icon={<IconNews />}
							title="Newsletter"
							styles={{
								icon: { marginTop: "5px" },
								title: {
									fontSize: "var(--mantine-font-size-md)",
								},
								message: {
									fontSize: "var(--mantine-font-size-md)",
									marginTop: 0,
								},
							}}>
							{feature.Newsletter ? (
								<a href={`https://canidevtools.substack.com/p/${feature.Newsletter}`} target="_blank">
									{feature.Newsletter}
								</a>
							) : (
								"-"
							)}
						</Alert>
						<Alert
							icon={<IconEye />}
							title="Views"
							styles={{
								icon: { marginTop: "5px" },
								title: {
									fontSize: "var(--mantine-font-size-md)",
								},
								message: {
									fontSize: "var(--mantine-font-size-md)",
									marginTop: 0,
								},
							}}>
							{views}
						</Alert>
					</SimpleGrid>
					<Divider />
					<Accordion
						defaultValue="related"
						styles={{
							content: { padding: "0 1em" },
						}}>
						<Accordion.Item value="related">
							<Accordion.Control
								icon={<IconCirclesRelation stroke={1.5} size={20} />}
								disabled={!feature.Related}>
								<Text fw={700}>Related{`(${feature.Related ? feature.Related.length : 0})`}</Text>
							</Accordion.Control>

							{feature.Related ? (
								<>
									<Divider />
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
								</>
							) : null}
						</Accordion.Item>
					</Accordion>
				</>
			)}
		</Paper>
	);
}
