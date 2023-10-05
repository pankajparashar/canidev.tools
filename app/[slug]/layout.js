"use client";

import { useContext } from "react";
import { DataContext } from "../../components/data-provider";

import { SimpleGrid, Button, NavLink, Divider, Grid, Stack } from "@mantine/core";
import { IconCheckbox, IconMinus, IconBrandSafari, IconBrandEdge, IconBrandChrome, IconBrandFirefox, IconBrandOpera } from "@tabler/icons-react";

import { IconBrandSpeedtest, IconCode, IconBoxMargin, IconAccessible, IconReportMedical, IconTerminal2, IconBrandNextjs, IconAffiliate, IconHexagons, IconCrosshair } from "@tabler/icons-react";

export default function Layout({ children, params }) {
    const { features } = useContext(DataContext);
    const feature = features.find(f => f.Slug === params.slug);
    const icons = {
        CSS: <IconBoxMargin stroke={1.5} />,
        Accessibility: <IconAccessible stroke={1.5} />,
        Audit: <IconReportMedical stroke={1.5} />,
        Console: <IconTerminal2 stroke={1.5} />,
        Elements: <IconCrosshair stroke={1.5} />,
        JavaScript: <IconBrandNextjs stroke={1.5} />,
        Network: <IconAffiliate stroke={1.5} />,
        Other: <IconHexagons stroke={1.5} />,
        Sources: <IconCode stroke={1.5} />,
        Performance: <IconBrandSpeedtest stroke={1.5} />,
    };

    return (
        <Stack>
            <Grid justify="end" align="end">
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <NavLink
                        pb="sm"
                        active
                        variant="light"
                        label={feature.Name}
                        description={feature.Description}
                        leftSection={icons[feature.Category]}
                        styles={{
                            label: { fontSize: "var(--mantine-font-size-md)", fontWeight: "bold" },
                            description: { fontSize: "var(--mantine-font-size-md)", wordBreak: "break-all" },
                        }}
                        href={feature.Slug}
                    />
                    <Divider />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <SimpleGrid cols={6} h="100%" spacing={0}>
                        <div>
                            <Button variant="transparent" fullWidth>
                                <IconBrandChrome />
                            </Button>
                            <Divider />
                            <Button variant="transparent" disabled={!feature.Chrome} fullWidth>
                                {feature.Chrome ? <IconCheckbox stroke={1.5} /> : <IconMinus stroke={1.5} />}
                            </Button>
                        </div>
                        <div>
                            <Button variant="transparent" fullWidth>
                                <IconBrandFirefox />
                            </Button>
                            <Divider />
                            <Button variant="transparent" disabled={!feature.Firefox} fullWidth>
                                {feature.Firefox ? <IconCheckbox stroke={1.5} /> : <IconMinus stroke={1.5} />}
                            </Button>
                        </div>
                        <div>
                            <Button variant="transparent" fullWidth>
                                <IconBrandEdge />
                            </Button>
                            <Divider />
                            <Button variant="transparent" disabled={!feature.Edge} fullWidth>
                                {feature.Edge ? <IconCheckbox stroke={1.5} /> : <IconMinus stroke={1.5} />}
                            </Button>
                        </div>
                        <div>
                            <Button variant="transparent" fullWidth>
                                <IconBrandSafari />
                            </Button>
                            <Divider />
                            <Button variant="transparent" disabled={!feature.Safari} fullWidth>
                                {feature.Safari ? <IconCheckbox stroke={1.5} /> : <IconMinus stroke={1.5} />}
                            </Button>
                        </div>
                        <div>
                            <Button variant="transparent" fullWidth>
                                <IconBrandOpera />
                            </Button>
                            <Divider />
                            <Button variant="transparent" disabled={!feature.Opera} fullWidth>
                                {feature.Opera ? <IconCheckbox stroke={1.5} /> : <IconMinus stroke={1.5} />}
                            </Button>
                        </div>
                        <div>
                            <Button variant="transparent" fullWidth>
                                <IconBrandPolypane />
                            </Button>
                            <Divider />
                            <Button variant="transparent" disabled={!feature.Polypane} fullWidth>
                                {feature.Polypane ? <IconCheckbox stroke={1.5} /> : <IconMinus stroke={1.5} />}
                            </Button>
                        </div>
                    </SimpleGrid>
                    <Divider />
                </Grid.Col>
            </Grid>

            {children}
        </Stack>
    );
}

const IconBrandPolypane = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-polypane" width="25" height="25" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M 21,12 H 15 M 15,4 V 14 H 9 M 9,4 V 16 H 4" />
    </svg>
);
