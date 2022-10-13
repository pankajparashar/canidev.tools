import * as fs from 'fs';
import path from 'path';

import * as React from 'react';

import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import { json } from '@remix-run/node';

import { Badge, Box, NavLink, MantineProvider, Collapse, Anchor, Group, SimpleGrid, Button, Divider, Alert, Text, TextInput, createEmotionCache } from '@mantine/core';
import { useMediaQuery, useColorScheme } from '@mantine/hooks';
import { StylesPlaceholder } from '@mantine/remix';

import { IconAt, IconCode, IconListDetails, IconBrandTwitter, IconBrandGithub, IconNews, IconBrightness, IconBoxMargin, IconList, IconAccessible, IconReportMedical, IconTerminal2, IconBrandNextjs, IconAffiliate, IconHexagons, IconCrosshair, IconAd2, IconInfoCircle } from '@tabler/icons';
import styles from './root.css';

export const meta = () => {
    const title = 'Can I DevTools?'
    const description = "It is like @CanIUse, but for the browser devtools, created and curated by Pankaj Parashar"

    return {
        title,
        description,

        "theme-color": "#000000",
        "google-site-verification": "2yd7PjEmLRyLyn7nmV_UuDCCeZSK-n6eQdlYuNwZBMM",

        "twitter:card": "summary_large_image",
        "twitter:site": "@CanIDevTools",
        "twitter:creator": "@pankajparashar",

        "og:url": "https://canidev.tools",
        "og:title": title,
        "og:description": description,
        "og:image": "https://canidev.tools/social-image.png"
    };
};

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles,
        },
    ];
}

export function loader() {
    const categories = {};
    fs.readdirSync(`${__dirname}/../features`).forEach((name) => {
        const filename = path.join('features', name);
        const file = fs.readFileSync(filename);
        const feature = JSON.parse(file);

        const category = feature.Category;
        if (category in categories) {
            categories[category] = categories[category] + 1;
        } else {
            categories[category] = 1;
        }
    });
    return json(categories);
}

export function CarbonAds() {
    const adRef = React.useRef();

    React.useEffect(() => {
        adRef.current.innerHTML = ""
        const script = document.createElement('script');
        script.src =
            '//cdn.carbonads.com/carbon.js?serve=CEAIVKJJ&placement=wwwcanidevtools';
        script.async = true;
        script.id = '_carbonads_js';
        adRef.current.appendChild(script);
    }, []);

    return (
            <Box p="xs">
        <Alert
            p="xs"
            title="Ads via Carbon"
            radius="xs"
            withCloseButton
            icon={<IconAd2 size={24}/>}
        >
            <Box ref={adRef} className="carbon-cad"/>
        </Alert></Box>
    );
}

createEmotionCache({key: 'cid'});

export default function App() {
    const categories = useLoaderData();
    const isWide = useMediaQuery('(min-width: 700px)', true, {getInitialValueInEffect: false});

    const [params, setParams] = useSearchParams();
    const [open, setOpen] = React.useState(isWide);

    const preferredColorScheme = useColorScheme();
    const [colorScheme, setColorScheme] = React.useState(preferredColorScheme);
    const toggleColorScheme = () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

    React.useEffect(() => setOpen(isWide), [isWide])
    React.useEffect(() => setColorScheme(preferredColorScheme), [preferredColorScheme])

    const icons = {
        CSS: <IconBoxMargin size={20} stroke={1.5}/>,
        Accessibility: <IconAccessible size={20} stroke={1.5}/>,
        Audit: <IconReportMedical size={20} stroke={1.5}/>,
        Console: <IconTerminal2 size={20} stroke={1.5}/>,
        Elements: <IconCrosshair size={20} stroke={1.5}/>,
        JavaScript: <IconBrandNextjs size={20} stroke={1.5}/>,
        Network: <IconAffiliate size={20} stroke={1.5}/>,
        Other: <IconHexagons size={20} stroke={1.5}/>,
        Sources: <IconCode size={20} stroke={1.5}/>,
    };
    const colors = {
        CSS: 'red',
        Accessibility: 'pink',
        Audit: 'grape',
        Console: 'violet',
        Elements: 'indigo',
        JavaScript: 'lime',
        Network: 'yellow',
        Other: 'orange',
        Sources: 'green',
    };

    return (
        <html lang="en" style={{
            backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
            color: colorScheme === 'dark' ? '#fff' : '#000',
        }}>
        <head>
            <StylesPlaceholder/>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width"/>
            <Meta/>
            <Links/>
        </head>
        <body>
        <MantineProvider
            withNormalizeCSS
            theme={{
                fontFamily: '"Operator Mono", "InputMono", sans-serif',
                primaryColor: 'gray',
                primaryShade: 9,
                defaultRadius: 'xs',
                colorScheme: colorScheme
            }}
        >
            <Box className="grid"
                 sx={theme => ({
                     borderTop: `1px solid ${theme.colorScheme === 'dark'
                         ? theme.colors.dark[6]
                         : theme.colors.gray[4]
                     }`,
                     borderBottom: `1px solid ${theme.colorScheme === 'dark'
                         ? theme.colors.dark[6]
                         : theme.colors.gray[4]
                     }`
                 })}>
                <Box
                    sx={(theme) => ({
                        display: 'flex',
                        flexDirection: 'column',
                    })}
                >
                    <Box
                        p="xs"
                        sx={(theme) => ({
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderRight: `1px solid ${theme.colorScheme === 'dark'
                                ? theme.colors.dark[6]
                                : theme.colors.gray[4]
                            }`,
                        })}
                    >
                        <Button size="xs" variant="default" component={Link} to="/">
                            <svg
                                viewBox="178.683 222.461 394.649 307.103"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20px"
                                fill={colorScheme === 'dark' ? '#ffffff' : '#000000'}
                            >
                                <path
                                    d="m490.73 249.34-197.32 276.25-32.125-22.93 197.32-276.25zm75.199 170.45-98.664-78.93-24.645 30.844 79.387 63.496-79.402 63.52 24.645 30.844 98.664-78.93c4.6953-3.7734 7.418-9.4336 7.418-15.434s-2.7227-11.664-7.4023-15.41zm-256.52-39.465-79.402-63.52 79.402-63.52-24.664-30.824-98.664 78.93c-4.6758 3.75-7.3984 9.4141-7.3984 15.414s2.7227 11.66 7.3984 15.41l98.664 78.93z"

                                />
                            </svg>
                        </Button>
                        <Box>
                            <Text weight={700}>Can I DevTools?</Text>
                        </Box>
                        <Button
                            variant="default"
                            size="xs"
                            onClick={() => setOpen(!open)}
                        >
                            <IconListDetails size={20}/>
                        </Button>
                    </Box>
                    <Divider/>
                    <Collapse in={open} p="xs" sx={(theme) => ({
                        borderRight: `1px solid ${theme.colorScheme === 'dark'
                            ? theme.colors.dark[6]
                            : theme.colors.gray[4]
                        }`,
                    })}>
                        <SimpleGrid spacing="xs">
                            <Alert icon={<IconInfoCircle size={24}/>} title="About" radius="xs" p="xs">
                                It is like <Anchor href="https://caniuse.com/" target="_blank">@CanIUse</Anchor> but for
                                the browser devtools, created & curated by <Anchor href="https://pankajparashar.com"
                                                                                   target="_blank">@pankajparashar</Anchor>.

                                <TextInput mt="xs" variant="default" styles={{ label: {marginBottom: "5px"} }} label="Subscribe to Newsletter:" placeholder="eg., email@gmail.com" icon={<IconAt size={14} />} />
                            </Alert>
                        </SimpleGrid>
                    </Collapse>

                    <Collapse
                        className="collapse"
                        itemScope itemType="https://schema.org/BreadcrumbList"
                        in={open}
                        sx={(theme) => ({
                            borderRight: `1px solid ${theme.colorScheme === 'dark'
                                ? theme.colors.dark[6]
                                : theme.colors.gray[4]
                            }`,
                        })}
                    >
                        <Divider/>
                        <Link to={'/'} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                            <NavLink
                                active={params.get('category') === null}
                                key={'all'}
                                icon={<IconList size="20" stroke="2"/>}
                                label={'All'}
                                rightSection={
                                    <Badge size="md" variant="light" color={'dark'}>
                                        {Object.values(categories).reduce((a, b) => a + b)}
                                    </Badge>
                                }
                            />
                        </Link>
                        {Object.keys(categories)
                            .sort()
                            .map((category) => (
                                <Link
                                    to={`/?category=${category.toLocaleLowerCase()}`}
                                    key={category}
                                    itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem"
                                >
                                    <NavLink
                                        itemProp="item"
                                        active={
                                            params.get('category')?.toLowerCase() ===
                                            category.toLowerCase()
                                        }
                                        key={category}
                                        icon={icons[category]}
                                        label={category}
                                        rightSection={
                                            <Badge
                                                size="md"
                                                variant="light"
                                                color={colors[category]}
                                            >
                                                {categories[category]}
                                            </Badge>
                                        }
                                    />
                                </Link>
                            ))}
                    </Collapse>

                    <Collapse
                        className="collapse"
                        in={open}
                        sx={(theme) => ({
                            borderRight: `1px solid ${theme.colorScheme === 'dark'
                                ? theme.colors.dark[6]
                                : theme.colors.gray[4]
                            }`,
                        })}
                    >
                        <Divider/>
                        <Group
                            grow
                            sx={(theme) => ({
                                padding: theme.spacing.xs,
                            })}
                        >
                            <Button
                                size="xs"
                                variant="default"
                                component="a"
                                href="https://twitter.com/CanIDevTools"
                            >
                                <IconBrandTwitter size={20}/>
                            </Button>
                            <Button
                                size="xs"
                                variant="default"
                                component="a"
                                href="https://github.com/pankajparashar/canidev.tools"
                            >
                                <IconBrandGithub size={20}/>
                            </Button>
                            <Button
                                size="xs"
                                variant="default"
                                component="a"
                                href="https://canidevtools.substack.com"
                            >
                                <IconNews size={20}/>
                            </Button>
                            <Button
                                size="xs"
                                variant="default" onClick={toggleColorScheme}>
                                <IconBrightness size={20}/>
                            </Button>
                        </Group>
                        <Divider/>
                        <CarbonAds/>
                        <Divider/>

                    </Collapse>
                </Box>
                <Box className="colspan">
                    <Outlet/>
                </Box>
            </Box>
        </MantineProvider>
        <ScrollRestoration/>
        <Scripts/>
        <script data-goatcounter="https://canidevtools.goatcounter.com/count"
                async src="//gc.zgo.at/count.js"></script>
        {process.env.NODE_ENV === 'development' && <LiveReload/>}
        </body>
        </html>
    );
}
