"use client";

import { useContext } from "react";

import { Divider, NavLink, SimpleGrid, Button, Box, TextInput } from "@mantine/core";
import { IconCheckbox, IconMinus, IconBrandChrome, IconBrandFirefox, IconBrandEdge, IconBrandSafari, IconBrandOpera } from "@tabler/icons-react";

import Link from "next/link";
import { DataContext } from "../components/data-provider";

export default function Page() {
    const { features } = useContext(DataContext);

    return (
        <>
            <SimpleGrid cols={{ base: 1, md: 2 }} verticalSpacing={0}>
                <TextInput variant="filled" />
                <div>
                    <SimpleGrid cols={6} spacing={0} verticalSpacing={0} h="100%">
                        <Box h="100%">
                            <Button variant="transparent" fullWidth>
                                <IconBrandChrome />
                            </Button>
                            <Divider />
                        </Box>
                        <div>
                            <Button variant="transparent" fullWidth>
                                <IconBrandFirefox />
                            </Button>
                            <Divider />
                        </div>
                        <div>
                            <Button variant="transparent" fullWidth>
                                <IconBrandEdge />
                            </Button>
                            <Divider />
                        </div>
                        <div>
                            <Button variant="transparent" fullWidth>
                                <IconBrandSafari />
                            </Button>
                            <Divider />
                        </div>
                        <div>
                            <Button variant="transparent" fullWidth>
                                <IconBrandOpera />
                            </Button>
                            <Divider />
                        </div>
                        <div>
                            <Button variant="transparent" fullWidth>
                                <IconBrandPolypane />
                            </Button>
                            <Divider />
                        </div>
                    </SimpleGrid>
                </div>
            </SimpleGrid>
            {features.map(feature => (
                <SimpleGrid cols={{ base: 1, md: 2 }} key={feature.Slug} verticalSpacing={0}>
                    <div>
                        <NavLink
                            pl="0"
                            label={feature.Name}
                            styles={{
                                label: { fontSize: "var(--mantine-font-size-md)" },
                            }}
                            component={Link}
                            href={feature.Slug}
                        />
                        <Divider variant="dashed" />
                    </div>
                    <div>
                        <SimpleGrid cols={6} h="100%" spacing={0} verticalSpacing={0}>
                            <div>
                                <Button variant="transparent" fullWidth>
                                    {feature.Chrome ? <IconCheckbox stroke={1.5} /> : <IconMinus stroke={1.5} />}
                                </Button>
                            </div>
                            <div>
                                <Button variant="transparent" fullWidth>
                                    {feature.Firefox ? <IconCheckbox stroke={1.5} /> : <IconMinus stroke={1.5} />}
                                </Button>
                            </div>
                            <div>
                                <Button variant="transparent" fullWidth>
                                    {feature.Edge ? <IconCheckbox stroke={1.5} /> : <IconMinus stroke={1.5} />}
                                </Button>
                            </div>
                            <div>
                                <Button variant="transparent" fullWidth>
                                    {feature.Safari ? <IconCheckbox stroke={1.5} /> : <IconMinus stroke={1.5} />}
                                </Button>
                            </div>
                            <div>
                                <Button variant="transparent" fullWidth>
                                    {feature.Opera ? <IconCheckbox stroke={1.5} /> : <IconMinus stroke={1.5} />}
                                </Button>
                            </div>
                            <div>
                                <Button variant="transparent" fullWidth>
                                    {feature.Polypane ? <IconCheckbox stroke={1.5} /> : <IconMinus stroke={1.5} />}
                                </Button>
                            </div>
                        </SimpleGrid>
                        <Divider />
                    </div>
                </SimpleGrid>
            ))}
        </>
    );
}

const IconBrandPolypane = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-polypane" width="25" height="25" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
        <path d="M 21,12 H 15 M 15,4 V 14 H 9 M 9,4 V 16 H 4" />
    </svg>
);
