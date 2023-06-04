import * as fs from "fs";
import path from "path";
import * as React from "react";

import { json } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams, useNavigate } from "@remix-run/react";
import { useLocalStorage } from "@mantine/hooks";

import { ThemeIcon, Group, Divider, Stack, Button, Badge, Box, NavLink, Grid, SimpleGrid, ScrollArea, TextInput, Tooltip, Text } from "@mantine/core";
import { IconHome2, IconStar, IconChevronRight, IconActivity, IconListSearch, IconSortAscending, IconBrandChrome, IconBrandFirefox, IconBrandEdge, IconBrandSafari, IconBrandOpera, IconCheckbox, IconSquareMinus, IconRss, IconTextPlus, IconSortDescending, IconSortAscendingLetters, IconSortDescendingLetters, IconArrowBack } from "@tabler/icons";

export const loader = async ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get("category") || "all";
    const sort = url.searchParams.get("sort") || "asc";
    const search = url.searchParams.get("search") || "";
    const browser = url.searchParams.get("browser") || "";

    let records = [];
    fs.readdirSync(`${__dirname}/../features`).forEach(name => {
        const filename = path.join("features", name);
        const file = fs.readFileSync(filename);
        const record = JSON.parse(file);
        records.push(record);
    });

    // Sort
    records = sort === "dsc" ? records.sort((a, b) => b.Name.localeCompare(a.Name)) : records;

    // Filter on category
    records = !["all", "favorites"].includes(category) ? records.filter(r => r.Category.toLowerCase() === category.toLowerCase()) : records;

    // Filter on search
    records = search ? records.filter(r => r.Name.toLowerCase().includes(search.toLowerCase()) || r.Description.toLowerCase().includes(search.toLowerCase())) : records;

    // Filter on browser
    records = browser !== "" ? records.filter(r => r[browser]) : records;

    return json(records);
};

const getCount = data => ({
    Chrome: data.filter(f => f.Chrome).length,
    Firefox: data.filter(f => f.Firefox).length,
    Edge: data.filter(f => f.Edge).length,
    Safari: data.filter(f => f.Safari).length,
    Opera: data.filter(f => f.Opera).length,
    Polypane: data.filter(f => f.Polypane).length
});

export default function Index() {
    let features = useLoaderData();
    const navigate = useNavigate();
    const [params, setParams] = useSearchParams();

    const count = getCount(features);
    const category = params.get("category") || "all";
    const sort = params.get("sort");
    const search = params.get("search");

    const [favorites, setFavorites] = useLocalStorage({ key: "CID_Favorites", defaultValue: [] });
    if (category === "favorites") {
        features = features.filter(f => favorites.includes(f.Slug));
    }

    const toggleBrowser = browser => {
        const params = new URLSearchParams(window.location.search);
        params.get("browser") === browser ? params.delete("browser") : params.set("browser", browser);

        navigate({
            search: params.toString(),
        });
    };

    const toggleFavorites = slug => {
        const favoritesSet = new Set(favorites);
        favoritesSet.has(slug) ? favoritesSet.delete(slug) : favoritesSet.add(slug);
        setFavorites([...favoritesSet]);
    };

    const borderColor = theme => `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}`;

    return (
        <Stack spacing={0} sx={theme => ({ borderRight: borderColor(theme) })}>
            <Box className="grid">
                <Grid gutter={0} sx={theme => ({ borderRight: borderColor(theme), borderBottom: borderColor(theme) })}>
                    <Grid.Col span={10}>
                        <TextInput
                            styles={{ input: { fontSize: "14px" } }}
                            size="sm"
                            label=""
                            variant="filled"
                            placeholder={search ? search : `Search ${features.length} record(s)`}
                            icon={<IconListSearch size={20} />}
                            rightSection={
                                <Tooltip label="Press Enter" position="top-end" withArrow>
                                    <div>
                                        <IconArrowBack size={18} style={{ display: "block", opacity: 0.5 }} />
                                    </div>
                                </Tooltip>
                            }
                            onKeyPress={event => {
                                const value = event.target.value.trim();
                                if (event.key === "Enter") {
                                    const url = new URL(window.location);
                                    if (value) url.searchParams.set("search", value);
                                    else url.searchParams.delete("search");
                                    navigate({
                                        search: url.searchParams.toString(),
                                    });
                                }
                            }}
                        />
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Button
                            variant="subtle"
                            size="sm"
                            fullWidth={true}
                            onClick={() => {
                                params.set("sort", sort === "dsc" ? "asc" : "dsc");
                                navigate({
                                    search: params.toString(),
                                });
                            }}
                            sx={theme => ({ borderLeft: borderColor(theme) })}>
                            {sort === "asc" ? <IconSortAscending size={20} /> : <IconSortDescending size={20} />}
                        </Button>
                    </Grid.Col>
                </Grid>
                <SimpleGrid cols={6} spacing={0} sx={theme => ({ borderRight: borderColor(theme), borderBottom: borderColor(theme) })}>
                    <Button variant={params.get("browser") === "Chrome" ? "active" : "subtle"} size="sm" onClick={() => toggleBrowser("Chrome")} sx={theme => ({ borderRight: borderColor(theme) })}>
                        <IconBrandChrome size={20} />
                    </Button>
                    <Button variant={params.get("browser") === "Firefox" ? "active" : "subtle"} size="sm" onClick={() => toggleBrowser("Firefox")} sx={theme => ({ borderRight: borderColor(theme) })}>
                        <IconBrandFirefox size={20} />
                    </Button>
                    <Button variant={params.get("browser") === "Edge" ? "active" : "subtle"} size="sm" onClick={() => toggleBrowser("Edge")} sx={theme => ({ borderRight: borderColor(theme) })}>
                        <IconBrandEdge size={20} />
                    </Button>
                    <Button variant={params.get("browser") === "Safari" ? "active" : "subtle"} size="sm" onClick={() => toggleBrowser("Safari")} sx={theme => ({ borderRight: borderColor(theme) })}>
                        <IconBrandSafari size={20} />
                    </Button>
                    <Button variant={params.get("browser") === "Opera" ? "active" : "subtle"} size="sm" onClick={() => toggleBrowser("Opera")} sx={theme => ({ borderRight: borderColor(theme) })}>
                        <IconBrandOpera size={20} />
                    </Button>
                    <Button variant={params.get("browser") === "Polypane" ? "active" : "subtle"} size="sm" onClick={() => toggleBrowser("Polypane")} sx={theme => ({ borderRight: borderColor(theme) })}>
						<IconBrandPolypane />
					</Button>
                </SimpleGrid>
            </Box>

            <ScrollArea offsetScrollbars type="auto" className="h_100vh" scrollbarSize={12}>
                {features.map(feature => (
                    <Box className="grid" key={feature.Slug}>
                        <Box
                            sx={theme => ({
                                display: "flex",
                                flex: "1",
                                alignItems: "center",
                                borderRight: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}`,
                                borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}`,
                            })}>
                            <Button
                                onClick={() => toggleFavorites(feature.Slug)}
                                variant="light"
                                color={favorites.includes(feature.Slug) ? "yellow" : undefined}
                                styles={theme => ({
                                    root: {
                                        width: "2.5em",
                                        padding: "0",
                                    },
                                })}>
                                <IconStar size={16} />
                            </Button>

                            <Box sx={theme => ({ flex: "1" })}>
                                <Link to={feature.Slug}>
                                    <NavLink label={feature.Name} description={feature.description} rightSection={<IconChevronRight size={12} stroke={1.5} />} />
                                </Link>
                            </Box>
                        </Box>
                        <SimpleGrid cols={6} spacing={0} 
                            sx={theme => ({
                                borderBottom: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}`,
                                
                            })}>
                            {feature.Chrome ? (
                                <Button variant="subtle" size="sm" component={Link} to={`${feature.Slug}/chrome`} sx={theme => ({ borderRight: borderColor(theme) })}>
                                    <IconCheckbox size={20} color="green" />
                                </Button>
                            ) : (
                                <Button variant="subtle" size="sm" sx={theme => ({ borderRight: borderColor(theme) })}>
                                    <IconSquareMinus size={20} color={"red"} />
                                </Button>
                            )}

                            {feature.Firefox ? (
                                <Button variant="subtle" size="sm" component={Link} to={`${feature.Slug}/firefox`} sx={theme => ({ borderRight: borderColor(theme) })}>
                                    <IconCheckbox size={20} color="green" />
                                </Button>
                            ) : (
                                <Button variant="subtle" size="sm" sx={theme => ({ borderRight: borderColor(theme) })}>
                                    <IconSquareMinus size={20} color={"red"} />
                                </Button>
                            )}

                            {feature.Edge ? (
                                <Button variant="subtle" size="sm" component={Link} to={`${feature.Slug}/edge`} sx={theme => ({ borderRight: borderColor(theme) })}>
                                    <IconCheckbox size={20} color="green" />
                                </Button>
                            ) : (
                                <Button variant="subtle" size="sm" sx={theme => ({ borderRight: borderColor(theme) })}>
                                    <IconSquareMinus size={20} color={"red"} />
                                </Button>
                            )}

                            {feature.Safari ? (
                                <Button variant="subtle" size="sm" component={Link} to={`${feature.Slug}/safari`} sx={theme => ({ borderRight: borderColor(theme) })}>
                                    <IconCheckbox size={20} color="green" />
                                </Button>
                            ) : (
                                <Button variant="subtle" size="sm" sx={theme => ({ borderRight: borderColor(theme) })}>
                                    <IconSquareMinus size={20} color={"red"} />
                                </Button>
                            )}

                            {feature.Opera ? (
                                <Button variant="subtle" size="sm" component={Link} to={`${feature.Slug}/opera`} sx={theme => ({ borderRight: borderColor(theme) })}>
                                    <IconCheckbox size={20} color="green" />
                                </Button>
                            ) : (
                                <Button variant="subtle" size="sm" sx={theme => ({ borderRight: borderColor(theme) })}>
                                    <IconSquareMinus size={20} color={"red"} />
                                </Button>
                            )}

							{feature.Polypane ? (
                                <Button variant="subtle" size="sm" component={Link} to={`${feature.Slug}/polypane`}>
                                    <IconCheckbox size={20} color="green" />
                                </Button>
                            ) : (
                                <Button variant="subtle" size="sm">
                                    <IconSquareMinus size={20} color={"red"} />
                                </Button>
                            )}
                        </SimpleGrid>
                    </Box>
                ))}
            </ScrollArea>
            <Box className="grid" sx={theme => ({ borderTop: borderColor(theme) })}>
                <Grid gutter="0">
                    <Grid.Col span={10} sx={theme => ({ borderRight: borderColor(theme) })}>
                        <Button variant="light" size="sm" fullWidth={true} leftIcon={<IconTextPlus size={20} />} component="a" href="https://github.com/pankajparashar/canidev.tools/issues/new">
                            {" Add New"}
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={2} sx={theme => ({ borderRight: borderColor(theme) })}>
                        <Button variant="subtle" size="sm" fullWidth={true} component="a" href="https://canidevtools.substack.com/feed.xml">
                            <IconRss size={20} stroke={2.5} />
                        </Button>
                    </Grid.Col>
                </Grid>
                <SimpleGrid cols={6} spacing={0} verticalSpacing={0} align="center" sx={theme => ({ borderRight: borderColor(theme) })}>
                    <Button size="sm" variant="subtle" sx={theme => ({ borderRight: borderColor(theme) })}>
                        {count.Chrome}
                    </Button>
                    <Button size="sm" variant="subtle" sx={theme => ({ borderRight: borderColor(theme) })}>
                        {count.Firefox}
                    </Button>
                    <Button size="sm" variant="subtle" sx={theme => ({ borderRight: borderColor(theme) })}>
                        {count.Edge}
                    </Button>
                    <Button size="sm" variant="subtle" sx={theme => ({ borderRight: borderColor(theme) })}>
                        {count.Safari}
                    </Button>
                    <Button size="sm" variant="subtle" sx={theme => ({ borderRight: borderColor(theme) })}>
                        {count.Opera}
                    </Button>
                    <Button size="sm" variant="subtle">
                        {count.Polypane}
                    </Button>
                </SimpleGrid>
            </Box>
        </Stack>
    );
}

const IconBrandPolypane = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 1024 1024"
	  width="20"
	  height="20"
    >
      <defs>
        <filter id="filter5064-6" colorInterpolationFilters="sRGB">
          <feFlood
            floodColor="#306985"
            floodOpacity="0.384"
            result="flood"
          ></feFlood>
          <feComposite
            in="flood"
            in2="SourceGraphic"
            operator="in"
            result="composite1"
          ></feComposite>
          <feGaussianBlur
            in="composite1"
            result="blur"
            stdDeviation="10"
          ></feGaussianBlur>
          <feOffset dx="0" dy="6" result="offset"></feOffset>
          <feComposite
            in="SourceGraphic"
            in2="offset"
            operator="over"
            result="fbSourceGraphic"
          ></feComposite>
          <feColorMatrix
            in="fbSourceGraphic"
            result="fbSourceGraphicAlpha"
            values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"
          ></feColorMatrix>
          <feFlood
            floodColor="#306985"
            floodOpacity="0.384"
            result="flood"
          ></feFlood>
          <feComposite
            in="flood"
            in2="fbSourceGraphic"
            operator="out"
            result="composite1"
          ></feComposite>
          <feGaussianBlur
            in="composite1"
            result="blur"
            stdDeviation="3.2"
          ></feGaussianBlur>
          <feOffset dx="0" dy="0.802" result="offset"></feOffset>
          <feComposite
            in="offset"
            in2="fbSourceGraphic"
            operator="atop"
            result="composite2"
          ></feComposite>
        </filter>
        <linearGradient
          id="linearGradient5916"
          x1="578.119"
          x2="624.067"
          y1="-523.324"
          y2="-157.755"
          gradientUnits="userSpaceOnUse"
          xlinkHref="#linearGradient5922"
        ></linearGradient>
        <linearGradient id="linearGradient5922">
          <stop offset="0" stopColor="#fff" stopOpacity="1"></stop>
          <stop offset="1" stopColor="#fff" stopOpacity="0.851"></stop>
        </linearGradient>
        <filter id="filter5908-3" colorInterpolationFilters="sRGB">
          <feFlood
            floodColor="#306985"
            floodOpacity="0.384"
            result="flood"
          ></feFlood>
          <feComposite
            in="flood"
            in2="SourceGraphic"
            operator="out"
            result="composite1"
          ></feComposite>
          <feGaussianBlur
            in="composite1"
            result="blur"
            stdDeviation="6.4"
          ></feGaussianBlur>
          <feOffset dx="0" dy="7.219" result="offset"></feOffset>
          <feComposite
            in="offset"
            in2="SourceGraphic"
            operator="atop"
            result="composite2"
          ></feComposite>
        </filter>
        <clipPath id="clipPath4922-9-8" clipPathUnits="userSpaceOnUse">
          <circle
            cx="512"
            cy="540.362"
            r="425.375"
            fill="#000"
            fillOpacity="1"
            stroke="#fff"
            strokeDasharray="none"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="4"
            strokeOpacity="1"
            strokeWidth="20.678"
            opacity="1"
          ></circle>
        </clipPath>
      </defs>
      <g transform="matrix(1.13003 0 0 1.13003 -73.501 1085.795)">
        <circle
          cx="518.127"
          cy="-507.768"
          r="373.479"
          fillOpacity="1"
          stroke="none"
          strokeDasharray="none"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="4"
          strokeOpacity="1"
          strokeWidth="70.24"
          filter="url(#filter5064-6)"
          opacity="1"
          transform="translate(-99.093 97.112) scale(1.19125)"
        ></circle>
        <circle
          cx="518.127"
          cy="-507.768"
          r="373.479"
          fill="url(#linearGradient5916)"
          fillOpacity="1"
          stroke="none"
          strokeDasharray="none"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="4"
          strokeOpacity="1"
          strokeWidth="70.24"
          filter="url(#filter5064-6)"
          opacity="1"
          transform="translate(-52.85 51.793) scale(1.102)"
        ></circle>
        <g
          filter="url(#filter5908-3)"
          transform="matrix(-1 0 0 1 1030.493 -1048.984)"
        >
          <path
            fillOpacity="1"
            stroke="none"
            strokeDasharray="none"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="4"
            strokeOpacity="1"
            strokeWidth="18"
            d="M684.572 59.273h279.621v962.178H684.572zm-314.223 0h262.878v718.124H370.349zm-320.257 0h268.913v554.07H50.092z"
            clipPath="url(#clipPath4922-9-8)"
            opacity="1"
            transform="matrix(.878 0 0 .878 62.831 65.925)"
          ></path>
        </g>
      </g>
    </svg>
  );