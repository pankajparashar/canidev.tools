"use client";

import { useRef, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group, ScrollArea, Anchor, NavLink, Divider } from "@mantine/core";

import { IconListDetails, IconBrandSpeedtest, IconCode, IconBoxMargin, IconAccessible, IconReportMedical, IconTerminal2, IconBrandNextjs, IconAffiliate, IconHexagons, IconCrosshair } from "@tabler/icons-react";

export const AppLayout = props => {
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
                <Group h="100%" px="md" justify="space-between">
                    <Anchor href="/">canidev.tools</Anchor>
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <AppShell.Section grow component={ScrollArea}>
                    <NavLink label="All" variant="filled" active leftSection={<IconListDetails stroke={1.5} size={20} />} rightSection={152} />
                    {Object.entries(props.categories).map(([category, count]) => (
                        <NavLink
                            styles={{
                                label: { fontSize: "var(--mantine-font-size-md)" },
                            }}
                            label={category}
                            key={category}
                            rightSection={count}
                            leftSection={icons[category]}
                        />
                    ))}
                </AppShell.Section>
                <Divider />
                <AppShell.Section></AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>{props.children}</AppShell.Main>
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
