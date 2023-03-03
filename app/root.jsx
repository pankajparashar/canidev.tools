// Node.js
import * as fs from "fs";
import path from "path";

// React
import * as React from "react";

// Vercel
import { Analytics } from "@vercel/analytics/react";

// Remix
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { json } from "@remix-run/node";

// Mantime
import { Image, Tabs, Badge, Box, NavLink, MantineProvider, Collapse, Anchor, Flex, Grid, Stack, Button, Divider, Alert, Text, createEmotionCache } from "@mantine/core";
import { useMediaQuery, useColorScheme, useLocalStorage } from "@mantine/hooks";
import { StylesPlaceholder } from "@mantine/remix";

// Tabler
import { IconQuote, IconStar, IconCode, IconListDetails, IconBrandTwitter, IconBrandGithub, IconNews, IconBrightness, IconBoxMargin, IconList, IconAccessible, IconReportMedical, IconTerminal2, IconBrandNextjs, IconAffiliate, IconHexagons, IconCrosshair, IconUserCircle } from "@tabler/icons";

// Custom
import styles from "./root.css";
import Carbon from "react-carbon";
import { Carousel } from 'antd';

createEmotionCache({ key: "cid" });

export function meta () {
    const title = "Can I DevTools?";
    const description = "It is like @CanIUse, but for the browser devtools, created and curated by Pankaj Parashar";

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
        "og:image": "https://canidev.tools/social-image.png",
    };
};

export function links() {
    return [
        { rel: "stylesheet", href: styles },
        { rel: "search", type: "application/opensearchdescription+xml", href: "/opensearch.xml", title: "CID" }
    ];
}

export function loader() {
    const categories = {};
    fs.readdirSync(`${__dirname}/../features`).forEach(name => {
        const filename = path.join("features", name);
        const file = fs.readFileSync(filename);
        const feature = JSON.parse(file);

        const category = feature.Category;
        categories[category] = category in categories ? categories[category] + 1 : 1;
    });
    return json({ categories, ENV: {
            VERCEL_ANALYTICS_ID: process.env.VERCEL_ANALYTICS_ID, } 
        }, {
        "Cache-Control": "public, s-maxage=60",
      });
}

export function CarbonAds() {
    React.useEffect(() => {
        document.getElementById("pixelmobco")?.addEventListener(
            "DOMNodeInserted",
            function (event) {
                if (event.target.parentNode.id === "pixelmobco" && event.target.id === "carbonads_1") {
                    event.target.remove();
                }
            },
            false
        );
    });

    return (
        <Alert p="xs" color="blue" title="Ads via Carbon" radius="xs">
            <Carbon placement="wwwcanidevtools" serve="CEAIVKJJ" />
        </Alert>
    );
}

export default function App() {
    const {categories, ENV} = useLoaderData();
    const isWide = useMediaQuery("(min-width: 700px)", true, {
        getInitialValueInEffect: false,
    });

    const [params, _] = useSearchParams();
    const [open, setOpen] = React.useState(isWide);
    const [favorites, __] = useLocalStorage({
        key: "CID_Favorites",
        defaultValue: [],
    });

    const preferredColorScheme = useColorScheme();
    const [colorScheme, setColorScheme] = React.useState(preferredColorScheme);
    const toggleColorScheme = () => setColorScheme(colorScheme === "dark" ? "light" : "dark");

    React.useEffect(() => setOpen(isWide), [isWide]);
    React.useEffect(() => setColorScheme(preferredColorScheme), [preferredColorScheme]);

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
    };
    const colors = {
        CSS: "red",
        Accessibility: "pink",
        Audit: "grape",
        Console: "violet",
        Elements: "indigo",
        JavaScript: "lime",
        Network: "yellow",
        Other: "orange",
        Sources: "green",
    };

    const borderColor = theme => `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}`
    return (
        <html
            lang="en"
            style={{
                backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
                color: colorScheme === "dark" ? "#fff" : "#000",
            }}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width" />
                <Meta />
                <Links />
            </head>
            <body>
                <MantineProvider
                    withNormalizeCSS
                    theme={{
                        fontFamily: '"Operator Mono", "InputMono", sans-serif',
                        primaryColor: "gray",
                        primaryShade: 9,
                        defaultRadius: "xs",
                        colorScheme: colorScheme,
                    }}>
                    <Box
                        className="grid"
                        sx={theme => ({
                            borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}`,
                            borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}`,
                        })}>
                        <Stack spacing={0} sx={theme => ({ borderRight: borderColor(theme) })}>
                            
                            <Flex justify="space-between" align="center">
                                <Button size="sm" variant="subtle" component={Link} to="/"
                                    sx={theme => ({ borderRight: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}` })}
                                >
                                    <svg viewBox="178.683 222.461 394.649 307.103" xmlns="http://www.w3.org/2000/svg" width="20px" fill={colorScheme === "dark" ? "#ffffff" : "#000000"}>
                                        <path d="m490.73 249.34-197.32 276.25-32.125-22.93 197.32-276.25zm75.199 170.45-98.664-78.93-24.645 30.844 79.387 63.496-79.402 63.52 24.645 30.844 98.664-78.93c4.6953-3.7734 7.418-9.4336 7.418-15.434s-2.7227-11.664-7.4023-15.41zm-256.52-39.465-79.402-63.52 79.402-63.52-24.664-30.824-98.664 78.93c-4.6758 3.75-7.3984 9.4141-7.3984 15.414s2.7227 11.66 7.3984 15.41l98.664 78.93z" />
                                    </svg>
                                </Button>
                                <Text weight={700}>Can I DevTools?</Text>
                                <Button variant="subtle" size="sm" onClick={() => setOpen(!open)}
                                    sx={theme => ({ borderLeft: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}` })}
                                >
                                    <IconListDetails size={20} />
                                </Button>
                            </Flex>

                            <Divider />

                            <Collapse className="collapse" in={open}>
                                <Link to={"/"} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                    <NavLink
                                        active={params.get("category") === null}
                                        key={"all"}
                                        icon={<IconList size="20" stroke="2" />}
                                        label={"All"}
                                        rightSection={
                                            <Badge size="md" variant="filled" color={"dark.5"}>
                                                {Object.values(categories).reduce((a, b) => a + b)}
                                            </Badge>
                                        }
                                    />
                                </Link>
                                {Object.keys(categories)
                                    .sort()
                                    .map(category => (
                                        <Link to={`/?category=${category.toLocaleLowerCase()}`} key={category} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                            <NavLink
                                                itemProp="item"
                                                active={params.get("category")?.toLowerCase() === category.toLowerCase()}
                                                key={category}
                                                icon={icons[category]}
                                                label={category}
                                                rightSection={
                                                    <Badge size="md" variant="filled" color={colors[category]}>
                                                        {categories[category]}
                                                    </Badge>
                                                }
                                            />
                                        </Link>
                                    ))}
                                <Link to={"/?category=favorites"} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                    <NavLink
                                        active={params.get("category") === "favorites"}
                                        key={"favorites"}
                                        icon={<IconStar size="20" stroke="1.5" />}
                                        label={"Favorites"}
                                        rightSection={
                                            <Badge size="md" variant="filled" color={"yellow.5"}>
                                                {favorites.length}
                                            </Badge>
                                        }
                                    />
                                </Link>
                            
                                <Divider />
                                <Grid gutter={0}>
                                    <Grid.Col
                                        span={3}
                                        sx={theme => ({
                                            borderRight: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]}`,
                                        })}>
                                        <Button fullWidth={true} size="sm" variant="subtle" component="a" href="https://twitter.com/CanIDevTools">
                                            <IconBrandTwitter size={20} />
                                        </Button>
                                    </Grid.Col>
                                    <Grid.Col
                                        span={3}
                                        sx={theme => ({
                                            borderRight: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]}`,
                                        })}>
                                        <Button fullWidth={true} size="sm" variant="subtle" component="a" href="https://github.com/pankajparashar/canidev.tools">
                                            <IconBrandGithub size={20} />
                                        </Button>
                                        <Divider orientation="vertical" />
                                    </Grid.Col>
                                    <Grid.Col
                                        span={3}
                                        sx={theme => ({
                                            borderRight: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4]}`,
                                        })}>
                                        <Button fullWidth={true} size="sm" variant="subtle" component="a" href="https://canidevtools.substack.com">
                                            <IconNews size={20} />
                                        </Button>
                                        <Divider orientation="vertical" />
                                    </Grid.Col>
                                    <Grid.Col span={3}>
                                        <Button fullWidth={true} size="sm" variant="subtle" onClick={toggleColorScheme}>
                                            <IconBrightness size={20} />
                                        </Button>
                                    </Grid.Col>
                                </Grid>
                                <Divider />

                                <Tabs defaultValue="about">
                                    <Tabs.List position="apart">
                                        <Tabs.Tab value="about" icon={<IconUserCircle size={18} />}>About</Tabs.Tab>
                                        <Tabs.Tab value="testimonials" icon={<IconQuote size={18} />}>Testimonials</Tabs.Tab>
                                    </Tabs.List>

                                    <Tabs.Panel value="about">
                                        <About />
                                    </Tabs.Panel>

                                    <Tabs.Panel value="testimonials">
                                        <Testimonials />
                                    </Tabs.Panel>
                                </Tabs>

                                <Divider />
                            </Collapse>

                        </Stack>
                        <Box className="colspan">
                            <Outlet />
                        </Box>
                    </Box>
                </MantineProvider>
                <ScrollRestoration />

                <Analytics />
                <Scripts />
                <StylesPlaceholder />

                {process.env.NODE_ENV === "development" && <LiveReload />}
                {/* 👇 Write the ENV values to the window */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.ENV = ${JSON.stringify(ENV)}`,
                    }}
                /> 
            </body>
        </html>
    );
}

const About = () => 
    <Alert p="xs">
        <Box sx={theme => ({ maxWidth: "500px" })}>
            It is like{" "}
            <Anchor href="https://caniuse.com/" target="_blank">
                @CanIUse
            </Anchor>{" "}
            but for the browser devtools, created & curated by{" "}
            <Anchor href="https://pankajparashar.com" target="_blank">
                @pankajparashar
            </Anchor>
            . Get weekly tips & tricks for your favorite browser devtools by{" "}
            <Anchor href="https://canidevtools.substack.com/" target="_blank">
                subscribing
            </Anchor>{" "}
            to the newsletter!
        </Box>
        <br />
        <CarbonAds />
    </Alert>

const Testimonials = () => 
    <Carousel autoplay dotPosition="right">
        {[
            'https://res.cloudinary.com/dw9fem4ki/image/upload/v1675244568/pika-1675244292768-1x_fctkaz.png',
            'https://res.cloudinary.com/dw9fem4ki/image/upload/v1675244568/pika-1675244314666-1x_ctlzo5.png',
            'https://res.cloudinary.com/dw9fem4ki/image/upload/v1675244568/pika-1675244249461-1x_jtuvnh.jpg',
            'https://res.cloudinary.com/dw9fem4ki/image/upload/v1675244568/pika-1675244351871-1x_hw0sqt.png'
        ].map((image) => <Image src={image} withPlaceholder key={image} /> )}
    </Carousel>
