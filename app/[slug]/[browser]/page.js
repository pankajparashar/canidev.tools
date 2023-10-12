"use client";
import { useContext } from "react";
import { marked } from "marked";

import { DataContext } from "../../../components/data-provider";
import { ScrollArea, Accordion, Box, Text, Divider } from "@mantine/core";
import { IconWorld, IconNotes } from "@tabler/icons-react";

export default function Page({ params }) {
    const { features } = useContext(DataContext);
    const feature = features.find(f => f.Slug === params.slug);
    const browser = params.browser.charAt(0).toUpperCase() + params.browser.slice(1);

    return (
        <ScrollArea.Autosize mah={"100%"} type="never">
            <Accordion
                defaultValue={feature.MP4 ? "video" : "notes"}
                styles={{
                    itemTitle: { fontWeight: "bold" },
                    content: { padding: 0 },
                }}>
                <Accordion.Item value="video">
                    <Accordion.Control icon={<IconWorld stroke={1} />}>
                        <Text fw={700}>{browser}</Text>
                    </Accordion.Control>
                    <Accordion.Panel p="0">
                        <video controls autoPlay loop muted playsInline preload="metadata" src={feature[browser]?.MP4 + "#t=0.1"} />
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="notes">
                    <Accordion.Control icon={<IconNotes stroke={1} />}>
                        <Text fw={700}>Notes</Text>
                    </Accordion.Control>
                    <Accordion.Panel maw={"750px"} pr="xs">
                        <Box
                            dangerouslySetInnerHTML={{
                                __html: feature[browser]?.Notes ? marked.parse(Array.isArray(feature[browser].Notes) ? feature[browser].Notes.join("\n") : feature[browser].Notes) : "",
                            }}
                        />
                        <Divider label="References" labelPosition="left" variant="dashed" pl="md" pr="md" />
                        <Box
                            dangerouslySetInnerHTML={{
                                __html: feature[browser]?.References ? marked.parse(Array.isArray(feature[browser].References) ? feature[browser].References.join("\n") : feature[browser].References) : "",
                            }}
                        />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </ScrollArea.Autosize>
    );
}
