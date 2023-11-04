"use client";

import { useRef, useEffect, useContext } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import { Alert, Tooltip, Affix, Box, Tabs, Text, Anchor, TextInput, Accordion, ActionIcon, AppShell, Burger, Group, ScrollArea, NavLink, Divider, useMantineColorScheme } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import { IconNews, IconUserCircle, IconStar, IconArrowBack, IconListSearch, IconBrightness, IconListDetails, IconBrandSpeedtest, IconCode, IconBoxMargin, IconAccessible, IconReportMedical, IconTerminal2, IconBrandNextjs, IconAffiliate, IconHexagons, IconCrosshair, IconChevronRight } from "@tabler/icons-react";
import { DataContext } from "./data-provider";

export const AppLayout = props => {
    const searchParams = useSearchParams();
    const category = searchParams.get("category")
    const query = searchParams.get("q")
    
    const router = useRouter()
    const { toggleColorScheme } = useMantineColorScheme();

    let { categories, features } = useContext(DataContext);
    features = features
        .filter(f => category === null || f.Category === category)
        .filter(f => query === null || 
                f.Name.toLowerCase().includes(query.toLowerCase()) || 
                f.Description.toLowerCase().includes(query.toLowerCase()) || 
                f.Slug.toLowerCase().includes(query.toLowerCase()))
    
    const isMobile = useMediaQuery("(max-width: 1150px)");
    const pathname = usePathname();
    const activeSlug = pathname.split("/")[1]

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
        <AppShell header={{ height: 50 }} navbar={{ width: 350, breakpoint: "sm", collapsed: { mobile: !opened } }} padding="0">
            <AppShell.Header>
                <Group px="md" justify="space-between" h="100%">
                    <Group gap={"xs"}>
                        <Anchor href="/">
                            <img src="/logo.png" height="49px" className="logo" />
                        </Anchor>
                    </Group>
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
                            <Accordion.Control>Categories ({Object.keys(categories).length})</Accordion.Control>
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
                <AppShell.Section>
                    <NavFooter />
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>
                {isMobile && pathname !== "/" ? (
                    <Box>{props.children}</Box>
                ) : (
                    <Box className="grid">
                        <ScrollArea h={"calc(100dvh - 4em)"} type="hover" scrollbarSize={10} scrollHideDelay={0} p="md" pb="0">
                            <Box style={{ position: "sticky", top: 0, backgroundColor: "var(--mantine-color-body)" }}>
                                <TextInput 
                                    variant="filled" 
                                    placeholder={`Search ${features.length} records`} 
                                    leftSection={<IconListSearch stroke={1.5} size={20} />} 
                                    leftSectionPointerEvents="none" 
                                    rightSection={
                                        <Tooltip label="Press Enter" position="left-center" withArrow>
                                            <IconArrowBack stroke={1.5} size={20} />
                                        </Tooltip>
                                    }
                                    pb="md"
                                    onKeyPress={event => {
                                        const value = event.target.value.trim();
                                        if (event.key === "Enter") {
                                            const params = new URLSearchParams(searchParams);
                                            if (value) params.set("q", value);
                                            else params.delete("q");
                                            
                                            router.push("/" + "?" + params.toString())                                         
                                        }
                                    }}
                                />
                                <Divider />
                            </Box>
                            {features
                                .map(feature => (
                                    <div key={feature.Slug}>
                                        <NavLink
                                            px={"xs"}
                                            label={feature.Name}
                                            description={feature.Description}
                                            styles={{
                                                label: { fontSize: "var(--mantine-font-size-md)" },
                                                description: { fontSize: "var(--mantine-font-size-md)" },
                                            }}
                                            active={activeSlug === feature.Slug}
                                            variant={activeSlug === feature.Slug ? "filled" : "default"}
                                            component={Link}
                                            href={{
                                                pathname: `/${feature.Slug}`,
                                                query: Object.fromEntries(searchParams),
                                            }}
                                            rightSection={<IconChevronRight stroke={1} />}
                                        />
                                        <Divider />
                                    </div>
                                ))}
                        </ScrollArea>
                        <Box>{props.children}</Box>
                    </Box>
                )}
            </AppShell.Main>
        </AppShell>
    );
};

const NavFooter = () => {
    const adRef = useRef();

    useEffect(() => {        
        adRef.current.addEventListener("DOMNodeInserted", event => event.target.id === "carbonads_1" && event.target.remove())
                
        const s = document.createElement("script");
        s.id = "_carbonads_js";
        s.src = `//cdn.carbonads.com/carbon.js?serve=CEAIVKJJ&placement=wwwcanidevtools`;
        adRef.current.appendChild(s);
    }, []);

    return (
        <Tabs defaultValue="ads" placement="right" inverted={false}>
            <Tabs.List p={0} size="xs" justify="space-between">
                <Tabs.Tab value="ads" px={0} leftSection={<IconNews size={20} />}>
                    Carbon Ads
                </Tabs.Tab>
                <Tabs.Tab value="about" px={0} leftSection={<IconUserCircle size={20} />}>
                    About
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="ads" ref={adRef} pt={"sm"}/>
            <Tabs.Panel value="about">
                <Alert color="gray">It is like <a href="//caniuse.com">@CanIUse</a> but for the browser devtools. It is created by <a href="//pankajparashar.com">@pankajparashar</a>, and curated by the community..</Alert>
            </Tabs.Panel>
        </Tabs>
    );
};
