import * as React from "react"

import { useParams, useLoaderData } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { marked } from "marked";
import * as fs from "fs";
import path from "path";
import { json } from "@remix-run/node"; // or cloudflare/deno
import { Accordion, LoadingOverlay, Box, Button, Divider, Group, Image, Text } from "@mantine/core";
import { IconBrandChrome, IconBrandFirefox, IconBrandEdge, IconBrandSafari, IconBrandOpera, IconShare, IconBrandWindows, IconBrandApple, IconBrandUbuntu } from "@tabler/icons";

export function loader({ params }) {
    const filename = path.join("features", params.feature + ".json");
    const file = fs.readFileSync(filename);
    const record = JSON.parse(file);

    const newObj = Object.fromEntries(Object.entries(record).map(([k, v]) => [k.toLowerCase(), v]));

    return json(newObj);
}

export default function Browser() {
    const [visible, setVisible] = React.useState(true);
    const { browser } = useParams();
    const feature = useLoaderData();
    const refCount = (feature[browser].References?.match(new RegExp("http", "g")) || []).length;

    const icons = {
        chrome: <IconBrandChrome size="18" stroke="1.5" />,
        firefox: <IconBrandFirefox size="18" stroke="1.5" />,
        edge: <IconBrandEdge size="18" stroke="1.5" />,
        safari: <IconBrandSafari size="18" stroke="1.5" />,
        opera: <IconBrandOpera size="18" stroke="1.5" />,
    };

    const borderColor = theme => `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}`;

    return (
        <Box
            sx={theme => ({
                borderLeft: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}`,
            })}>
            <Group position="apart">
                <Button size="sm" radius="xs" leftIcon={icons[browser]} variant="subtle" component="a" href={`/${feature.slug}/${browser}`} sx={theme => ({ borderRight: borderColor(theme) })}>
                    {browser.toLocaleUpperCase()}
                </Button>
                <Button size="sm" radius="xs" variant="subtle" leftIcon={<IconShare size="18" />} component={"a"} href={feature[browser].Share} sx={theme => ({ borderLeft: borderColor(theme) })}>
                    Share
                </Button>
            </Group>
            <Divider />
            <Box sx={() => ({ position: "relative" })}>
              {feature[browser].MP4 ? 
                <div>
                  <LoadingOverlay visible={visible} overlayBlur={5} />
                  <video
                    controls autoPlay loop muted playsInline 
                    preload="metadata" 
                    key={feature[browser].MP4} 
                    src={feature[browser].MP4 + "#t=0.1"} 
                    onLoadedData={e => setVisible(false)}
                  /> 
                </div>
                : <Image withPlaceholder height={200} />
              }
            </Box>
            <Divider />
            <Accordion
                defaultValue="notes"
                sx={theme => ({
                    fontSize: theme.fontSizes.sm,
                })}>
                <Accordion.Item value="notes">
                    <Accordion.Control
                        p="xs"
                        sx={theme => ({
                            borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}`,
                        })}>
                        <Group position="apart">
                            <Text weight="700" size="sm">
                                Notes
                            </Text>
                        </Group>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: feature[browser].Notes ? marked.parse(feature[browser].Notes) : "",
                            }}
                        />
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="references">
                    <Accordion.Control
                        p="xs"
                        sx={theme => ({
                            borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}`,
                        })}>
                        <Text weight="700" size="sm">
                            References {`(${refCount})`}
                        </Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: feature[browser].References ? marked.parse(feature[browser].References) : "",
                            }}
                        />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Box>
    );
}
