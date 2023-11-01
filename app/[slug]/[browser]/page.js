"use client";

import { useContext } from "react";
import { marked } from "marked";

import { ScrollArea, Accordion, Box, Text, Divider } from "@mantine/core";
import { IconBrandYoutube, IconNotes, IconBrandSafari, IconBrandEdge, IconBrandChrome, IconBrandFirefox, IconBrandOpera } from "@tabler/icons-react";

import { DataContext } from "../../../components/data-provider";
import { IconBrandPolypane } from "../../../components/tabler-icons";

export default function Page({ params }) {
    const { features } = useContext(DataContext);
    const feature = features.find(f => f.Slug === params.slug);
    
    const name = params.browser.charAt(0).toUpperCase() + params.browser.slice(1);
    const browser = feature[name]

    const icons = {
        Chrome: <IconBrandChrome stroke={1} />,
        Firefox: <IconBrandFirefox stroke={1} />,
        Edge: <IconBrandEdge stroke={1} />,
        Safari: <IconBrandSafari stroke={1} />,
        Opera: <IconBrandOpera stroke={1} />,
        Polypane: <IconBrandPolypane stroke={1} />,
    };

    return (
        <ScrollArea.Autosize mah={"100%"} type="never">
            <Accordion
                defaultValue={browser.Video ? "video" : "notes"}
                styles={{
                    itemTitle: { fontWeight: "bold" },
                    content: { padding: 0 },
                }}>
                <Accordion.Item value="video">
                    <Accordion.Control icon={<IconBrandYoutube stroke={1} />}>
                        <Text fw={700}>Video</Text>
                    </Accordion.Control>
                    <Accordion.Panel p="0">
                        <video controls autoPlay loop muted playsInline preload="metadata" src={browser?.Video + "#t=0.1"} />
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="notes">
                    <Accordion.Control icon={<IconNotes stroke={1} />}>
                        <Text fw={700}>Notes</Text>
                    </Accordion.Control>
                    <Accordion.Panel maw={"750px"} pr="xs">
                        <Box
                            dangerouslySetInnerHTML={{
                                __html: browser?.Notes ? 
                                            marked.parse(Array.isArray(browser.Notes) ? browser.Notes.join("\n") : browser.Notes) : "",
                            }}
                        />
                        {browser.References ? 
                            <>
                                <Divider label="Read more" labelPosition="centre" variant="dashed" px="md" />
                                <Box
                                    dangerouslySetInnerHTML={{
                                        __html: browser.References ? marked.parse(Array.isArray(browser.References) ? browser.References.join("\n") : browser.References) : "",
                                    }}
                                />
                            </> 
                        : null}                        
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </ScrollArea.Autosize>
    );
}
