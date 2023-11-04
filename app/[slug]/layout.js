"use client";

import { useContext } from "react";
import { DataContext } from "../../components/data-provider";
import { IconBrandPolypane } from "../../components/tabler-icons";
import { useRouter, usePathname } from "next/navigation";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import { Paper, Badge, Alert, Divider, Group, Button, Tabs, Text } from "@mantine/core";
import { IconBrandGithub, IconBrandSafari, IconBrandEdge, IconBrandChrome, IconBrandFirefox, IconBrandOpera } from "@tabler/icons-react";
import { IconArrowBack, IconListSearch, IconBrightness, IconListDetails, IconBrandSpeedtest, IconCode, IconBoxMargin, IconAccessible, IconReportMedical, IconTerminal2, IconBrandNextjs, IconAffiliate, IconHexagons, IconCrosshair, IconChevronRight } from "@tabler/icons-react";

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
        Accessibility: <IconAccessible/>,
        Audit: <IconReportMedical />,
        Console: <IconTerminal2 />,
        Elements: <IconCrosshair  />,
        JavaScript: <IconBrandNextjs  />,
        Network: <IconAffiliate  />,
        Other: <IconHexagons  />,
        Sources: <IconCode  />,
        Performance: <IconBrandSpeedtest  />,
    };

    return (
        <Paper className="column" w="100%" withBorder style={{ borderTop: 0, borderBottom: 0 }}>
            <Group justify="space-between">
                <Badge
                    size="lg"
                    variant="dot"
                    radius="0"
                    p="md"
                    style={{ borderTop: 0, borderBottom: 0, borderLeft: 0 }}
                    styles={{
                        label: { fontSize: "var(--mantine-font-size-sm)" },
                    }}>
                    {feature.Category}
                </Badge>
                <Button variant="default" size="sm" leftSection={<IconBrandGithub size={20} stroke={1.5} />} style={{ borderBottom: 0, borderTop: 0 }} component="a" href={`https://github.com/pankajparashar/canidev.tools/edit/v3/features/${feature.Slug}.json`}>
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
                    title: { fontSize: "var(--mantine-font-size-md)", marginBottom: 0 },
                    message: { fontSize: "var(--mantine-font-size-md)", wordBreak: "break-word" },
                    icon: { marginTop: "5px" },
                }}>
                {feature.Description}
            </Alert>
            <Divider />
            <Tabs value={browser} onChange={value => router.push(`/${params.slug}/${value}`)} variant="pills">
                <Tabs.List grow justify="space-between" spacing={0} style={{ gap: 0 }}>
                    <Tabs.Tab style={{ borderRight: borderColor() }} value="chrome" leftSection={<IconBrandChrome stroke={1.5} />} disabled={!feature.Chrome}></Tabs.Tab>
                    <Tabs.Tab style={{ borderRight: borderColor() }} value="firefox" leftSection={<IconBrandFirefox stroke={1.5} />} disabled={!feature.Firefox}></Tabs.Tab>
                    <Tabs.Tab style={{ borderRight: borderColor() }} value="edge" leftSection={<IconBrandEdge stroke={1.5} />} disabled={!feature.Edge}></Tabs.Tab>
                    <Tabs.Tab style={{ borderRight: borderColor() }} value="safari" leftSection={<IconBrandSafari stroke={1.5} />} disabled={!feature.Safari}></Tabs.Tab>
                    <Tabs.Tab value="polypane" leftSection={<IconBrandPolypane stroke={1.5} />} disabled={!feature.Polypane}></Tabs.Tab>
                </Tabs.List>
            </Tabs>
            <Divider />
            {children}
        </Paper>
    );
}
