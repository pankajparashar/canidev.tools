"use client";

import { useRef, useEffect, useContext, Children } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { em, px, Box, Grid, SimpleGrid, TextInput, Accordion, ActionIcon, AppShell, Burger, Group, ScrollArea, NavLink, Divider, useMantineColorScheme } from "@mantine/core";

import { IconTags, IconBrightness, IconListDetails, IconBrandSpeedtest, IconCode, IconBoxMargin, IconAccessible, IconReportMedical, IconTerminal2, IconBrandNextjs, IconAffiliate, IconHexagons, IconCrosshair, IconChevronRight } from "@tabler/icons-react";
import { DataContext } from "./data-provider";

export const AppLayout = props => {
    const { categories, features } = useContext(DataContext);
    const { toggleColorScheme } = useMantineColorScheme();
    const isMobile = useMediaQuery("(max-width: 1150px)");
    const pathname = usePathname();

    const searchParams = useSearchParams();
    const [opened, { toggle }] = useDisclosure();
    const icons = {
        CSS: <IconBoxMargin size={20} stroke={1.5} />,
        Accessibility: <IconAccessible size={20} stroke={1.5} />,
        Audit: <IconReportMedical size={20} stroke={1.5} />,
        Console: <IconTerminal2 size={20} stroke={1.5} />,
        Elements: <IconCrosshair size={20} stroke={1.5} />,
        JavaScript: <IconBrandNextjs size={20} stroke={1.5} />,
        Network: <IconAffiliate size={20} stroke={1.5} />,
        Other: <IconHexagons size={20} stroke={1.5} />,
        Sources: <IconCode size={20} stroke={1.5} />,
        Performance: <IconBrandSpeedtest size={20} stroke={1.5} />,
    };

    return (
        <AppShell header={{ height: 50 }} navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }} padding="md">
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between" hiddenFrom="sm">
                    <Group gap={"xs"}>{/* <img src="/logo.png" width="48px" className="logo" /> */}</Group>
                    <Group gap="xs" align="center">
                        <ActionIcon variant="subtle" onClick={toggleColorScheme}>
                            <IconBrightness />
                        </ActionIcon>
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <AppShell.Section grow component={ScrollArea}>
                    <Accordion defaultValue="categories" variant="filled">
                        <Accordion.Item key="categories" value="categories">
                            <Accordion.Control>Categories</Accordion.Control>
                            <Accordion.Panel>
                                <NavLink label="All" variant="filled" active={searchParams.get("category") === null} component={Link} href="/" leftSection={<IconListDetails stroke={1.5} size={20} />} rightSection={Object.values(categories).reduce((a, b) => a + b, 0)} />
                                {Object.entries(categories).map(([category, count]) => (
                                    <NavLink
                                        styles={{
                                            label: { fontSize: "var(--mantine-font-size-md)" },
                                        }}
                                        label={category}
                                        key={category}
                                        rightSection={count}
                                        leftSection={icons[category]}
                                        component={Link}
                                        variant="filled"
                                        active={searchParams.get("category") === category}
                                        href={{
                                            pathname: "/",
                                            query: { category },
                                        }}
                                    />
                                ))}
                            </Accordion.Panel>
                        </Accordion.Item>
                    </Accordion>
                </AppShell.Section>
                <Divider />
                <AppShell.Section></AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>
                {isMobile && pathname !== "/" ? (
                    <Box>{props.children}</Box>
                ) : (
                    <Box className="grid">
                        <Box>
                            <TextInput variant="filled" />
                            {features
                                .filter(f => searchParams.get("category") === null || f.Category === searchParams.get("category"))
                                .map(feature => (
                                    <div key={feature.Slug}>
                                        <NavLink
                                            pl={isMobile ? 0 : "xs"}
                                            pr="0"
                                            label={feature.Name}
                                            styles={{
                                                label: { fontSize: "var(--mantine-font-size-md)" },
                                            }}
                                            active={pathname.includes(feature.Slug)}
                                            variant={pathname.includes(feature.Slug) ? "filled" : "default"}
                                            component={Link}
                                            href={`/${feature.Slug}`}
                                            rightSection={<IconChevronRight stroke={1} />}
                                        />
                                        <Divider variant="dashed" />
                                    </div>
                                ))}
                        </Box>
                        <Box>{props.children}</Box>
                    </Box>
                )}
            </AppShell.Main>
        </AppShell>
    );
};

const CarbonAd = () => {
    const reference = useRef();

    useEffect(() => {
        reference.current.innerHTML = "";
        const s = document.createElement("script");
        s.id = "_carbonads_js";
        s.src = `//cdn.carbonads.com/carbon.js?serve=CEAIVKJJ&placement=wwwcanidevtools`;
        reference.current.appendChild(s);
    }, []);

    return <div ref={reference} />;
};
