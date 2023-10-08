"use client";
import { useContext } from "react";
import { marked } from "marked";

import { DataContext } from "../../../components/data-provider";
import { ScrollArea, Accordion, Box, Text } from "@mantine/core";

export default function Page({ params }) {
    const { features } = useContext(DataContext);
    const feature = features.find(f => f.Slug === params.slug);
    const browser = params.browser.charAt(0).toUpperCase() + params.browser.slice(1);

    return (
        <ScrollArea mah={"100%"}>
            <Accordion
                defaultValue="video"
                styles={{
                    itemTitle: { fontWeight: "bold" },
                    content: { padding: 0 },
                }}>
                <Accordion.Item value="video">
                    <Accordion.Control>
                        <Text weight="700">Video</Text>
                    </Accordion.Control>
                    <Accordion.Panel p="0">
                        <video controls autoPlay loop muted playsInline preload="metadata" src={feature[browser]?.MP4 + "#t=0.1"} />
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="notes">
                    <Accordion.Control>Notes</Accordion.Control>
                    <Accordion.Panel>
                        <Box
                            pl="xs"
                            pb="xs"
                            pr="xs"
                            dangerouslySetInnerHTML={{
                                __html: feature[browser].Notes ? marked.parse(Array.isArray(feature[browser].Notes) ? feature[browser].Notes.join("\n") : feature[browser].Notes) : "",
                            }}
                        />
                        <Box
                            pl="xs"
                            pb="xs"
                            pr="xs"
                            dangerouslySetInnerHTML={{
                                __html: feature[browser].References ? marked.parse(Array.isArray(feature[browser].References) ? feature[browser].References.join("\n") : feature[browser].References) : "",
                            }}
                        />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </ScrollArea>
    );
}
