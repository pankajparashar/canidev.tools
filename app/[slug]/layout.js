"use client";

import { useContext } from "react";
import { DataContext } from "../../components/data-provider";
import { IconBrandPolypane } from "../../components/tabler-icons";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { Paper, Badge, Alert, Divider, Group, Button, Tabs, Text } from "@mantine/core";
import { IconBrandGithub, IconMinus, IconBrandSafari, IconBrandEdge, IconBrandChrome, IconBrandFirefox, IconBrandOpera } from "@tabler/icons-react";

import { IconBrandSpeedtest, IconCode, IconBoxMargin, IconAccessible, IconReportMedical, IconTerminal2, IconBrandNextjs, IconAffiliate, IconHexagons, IconCrosshair } from "@tabler/icons-react";

export default function Layout({ children, params }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const browser = pathname.split("/")[2];

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
        Sources: <IconCode stroke={2.5} />,
        Performance: <IconBrandSpeedtest stroke={1.5} />,
    };

    return (
        <Paper className="column" w="100%" withBorder style={{ borderTop: 0, borderBottom: 0 }}>
            <Group justify="space-between">
                <Badge size="lg" variant="dot" radius="0" p="md" style={{ borderTop: 0, borderBottom: 0, borderLeft: 0 }}>
                    {feature.Category}
                </Badge>
                <Button variant="default" size="sm" leftSection={<IconBrandGithub size={20} stroke={1.5} />} style={{ borderBottom: 0, borderTop: 0 }}>
                    <Text fw="700" size="sm">
                        Edit
                    </Text>
                </Button>
            </Group>
            <Divider />
            <Alert
                title={feature.Name}
                styles={{
                    title: { fontSize: "var(--mantine-font-size-md)", marginBottom: 0 },
                    message: { fontSize: "var(--mantine-font-size-md)", wordBreak: "break-word" },
                }}>
                {feature.Description}
            </Alert>
            <Tabs value={browser} onChange={value => router.push(`/${params.slug}/${value}`)} variant="pills">
                <Tabs.List grow justify="space-between">
                    <Tabs.Tab value="chrome" leftSection={<IconBrandChrome stroke={1.5} />} disabled={!feature.Chrome}></Tabs.Tab>
                    <Tabs.Tab value="firefox" leftSection={<IconBrandFirefox stroke={1.5} />} disabled={!feature.Firefox}></Tabs.Tab>
                    <Tabs.Tab value="edge" leftSection={<IconBrandEdge stroke={1.5} />} disabled={!feature.Edge}></Tabs.Tab>
                    <Tabs.Tab value="safari" leftSection={<IconBrandSafari stroke={1.5} />} disabled={!feature.Safari}></Tabs.Tab>
                    <Tabs.Tab value="opera" leftSection={<IconBrandOpera stroke={1.5} />} disabled={!feature.Opera}></Tabs.Tab>
                    <Tabs.Tab value="polypane" leftSection={<IconBrandPolypane stroke={1.5} />} disabled={!feature.Polypane}></Tabs.Tab>
                </Tabs.List>
            </Tabs>
            <Divider />
            {children}
        </Paper>
    );
}
