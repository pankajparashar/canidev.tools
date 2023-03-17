import * as fs from 'fs';
import path from 'path';
import * as React from 'react'

import { json } from '@remix-run/node';
import { Link, useLoaderData, useSearchParams, useNavigate } from '@remix-run/react';
import { useLocalStorage } from '@mantine/hooks';

import { ThemeIcon, Group, Divider, Stack, Button, Badge, Box, NavLink, Grid, SimpleGrid, ScrollArea, TextInput, Tooltip, Text } from '@mantine/core';
import { IconHome2, IconStar, IconChevronRight, IconActivity, IconListSearch, IconSortAscending, IconBrandChrome, IconBrandFirefox, IconBrandEdge, IconBrandSafari, IconBrandOpera, IconCheckbox, IconSquareMinus, IconRss, IconTextPlus, IconSortDescending, IconSortAscendingLetters, IconSortDescendingLetters, IconArrowBack } from '@tabler/icons';

export const loader = async ({ request }) => {
	const url = new URL(request.url);
	const category = url.searchParams.get('category') || 'all';
	const sort = url.searchParams.get('sort') || 'asc'
	const search = url.searchParams.get('search') || ''
	const browser = url.searchParams.get('browser') || ''

	let records = [];
	fs.readdirSync(`${__dirname}/../features`).forEach((name) => {
		const filename = path.join('features', name);
		const file = fs.readFileSync(filename);
		const record = JSON.parse(file);
		records.push(record);
	});

	// Sort
	records = sort === 'dsc' ?
		records.sort((a,b) => b.Name.localeCompare(a.Name)) : records

	// Filter on category
	records =
        !['all', 'favorites'].includes(category) ? records.filter(
			(r) => r.Category.toLowerCase() === category.toLowerCase()
		) : records;

	// Filter on search
	records = search ?
		records.filter(r => r.Name.toLowerCase().includes(search.toLowerCase()) || r.Description.toLowerCase().includes(search.toLowerCase()))
		: records

	// Filter on browser
	records = browser !== '' ?
		records.filter(r => r[browser]) :
		records

	return json(records);
};

const getCount = data => ({
	Chrome: data.filter(f => f.Chrome).length,
	Firefox: data.filter(f => f.Firefox).length,
	Edge: data.filter(f => f.Edge).length,
	Safari: data.filter(f => f.Safari).length,
	Opera: data.filter(f => f.Opera).length,
})

export default function Index() {
	let features = useLoaderData()
	const navigate = useNavigate();
	const [params, setParams] = useSearchParams()

	const count = getCount(features)
	const category = params.get('category') || 'all'
	const sort = params.get('sort')
	const search = params.get('search')

    const [favorites, setFavorites] = useLocalStorage({ key: 'CID_Favorites', defaultValue: [] })
    if(category === "favorites") {
        features = features.filter(f => favorites.includes(f.Slug))
    }

	const toggleBrowser = browser => {
		const params = new URLSearchParams(window.location.search)
		params.get('browser') === browser ?
			params.delete('browser') :
			params.set('browser', browser)

		navigate({
			search: params.toString()
		})
	}

    const toggleFavorites = slug => {
        const favoritesSet = new Set(favorites)
        favoritesSet.has(slug) ? favoritesSet.delete(slug) : favoritesSet.add(slug)
        setFavorites([...favoritesSet])
    }

	const borderColor = theme => `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}`

	return (
		<Stack spacing={0} sx={(theme) => ({ borderRight: borderColor(theme) })}>
			<Box className="grid">
				<Grid gutter={0} sx={(theme) => ({ borderRight: borderColor(theme), borderBottom: borderColor(theme) })}>
					<Grid.Col span={10}>
						<TextInput
							styles={{ input: { fontSize: '14px'}} }
							size="sm"
							label=""
							variant="filled"
							placeholder={search ? search : `Search ${features.length} record(s)`}
							icon={<IconListSearch size={20} />}
							rightSection={
								<Tooltip label="Press Enter" position="top-end" withArrow>
									<div>
									<IconArrowBack size={18} style={{ display: 'block', opacity: 0.5 }} />
									</div>
								</Tooltip>
							}
							onKeyPress={event => {
								const value = event.target.value.trim()
								if(event.key === "Enter") {
									const url = new URL(window.location);
									if(value) url.searchParams.set('search', value);
									else url.searchParams.delete('search')
									navigate({
										search: url.searchParams.toString()
									})
								}
							}}
						/>
					</Grid.Col>
					<Grid.Col span={2}>
						<Button variant="subtle" size="sm" fullWidth={true} onClick={() => {
							params.set('sort', sort === 'dsc' ? 'asc' : 'dsc')
							navigate({
								search: params.toString()
							})
						}} sx={theme => ({ borderLeft: borderColor(theme) })}>
							{sort === 'asc' ? <IconSortAscending size={20}/> : <IconSortDescending size={20} />}
						</Button>
					</Grid.Col>
				</Grid>
				<SimpleGrid cols={5} spacing={0} sx={(theme) => ({ borderRight: borderColor(theme), borderBottom: borderColor(theme) })}>
					<Button variant={params.get('browser') === 'Chrome' ? 'active' : 'subtle'} size="sm" onClick={() => toggleBrowser('Chrome')} sx={theme => ({ borderRight: borderColor(theme) })}>
						<IconBrandChrome size={20} />
					</Button>
					<Button variant={params.get('browser') === 'Firefox' ? 'active' : 'subtle'} size="sm" onClick={() => toggleBrowser('Firefox')} sx={theme => ({ borderRight: borderColor(theme) })}>
						<IconBrandFirefox size={20} />
					</Button>
					<Button variant={params.get('browser') === 'Edge' ? 'active' : 'subtle'} size="sm" onClick={() => toggleBrowser('Edge')} sx={theme => ({ borderRight: borderColor(theme) })}>
						<IconBrandEdge size={20} />
					</Button>
					<Button variant={params.get('browser') === 'Safari' ? 'active' : 'subtle'} size="sm" onClick={() => toggleBrowser('Safari')} sx={theme => ({ borderRight: borderColor(theme) })}>
						<IconBrandSafari size={20} />
					</Button>
					<Button variant={params.get('browser') === 'Opera' ? 'active' : 'subtle'} size="sm" onClick={() => toggleBrowser('Opera')}>
						<IconBrandOpera size={20} />
					</Button>
				</SimpleGrid>
			</Box>

			<ScrollArea offsetScrollbars type="auto" className="h_100vh" scrollbarSize={12}>
				{features.map((feature) => (
					<Box className="grid" key={feature.Slug}>
						<Box
							sx={(theme) => ({
                                display: "flex",
                                flex: "1",
                                alignItems: "center",
								borderRight: `1px solid ${theme.colorScheme === 'dark'
									? theme.colors.dark[6]
									: theme.colors.gray[4]
									}`,
                                borderBottom: `1px solid ${theme.colorScheme === 'dark'
                                ? theme.colors.dark[6]
                                : theme.colors.gray[4]
                                }`,
							})}
						>
                            <Button
                                onClick={() => toggleFavorites(feature.Slug)}
                                variant="light"
                                color={favorites.includes(feature.Slug) ? "yellow" : undefined}
                                styles={(theme) => ({
                                    root: {
                                        width: "2.5em",
                                        padding: "0"
                                    }
                                })
                            }>
                                <IconStar size={16} />
                            </Button>

                            <Box sx={theme => ({flex: "1"})}><Link
                                to={feature.Slug}>
								<NavLink
									label={feature.Name}
									description={feature.description}
									rightSection={<IconChevronRight size={12} stroke={1.5} />}
								/>
							</Link></Box>
						</Box>
						<Group
							grow
							spacing="xs"
							sx={(theme) => ({
								borderBottom: `1px solid ${theme.colorScheme === 'dark'
									? theme.colors.dark[6]
									: theme.colors.gray[4]
									}`,
								paddingLeft: theme.spacing.xs,
								paddingRight: theme.spacing.xs,
							})}
						>
                            {feature.Chrome ?
                                <Button
                                    variant="subtle"
                                    size="sm"
                                    component={Link}
                                    to={`${feature.Slug}/chrome`}
                                >
                                    <IconCheckbox size={20} color="green" />
                                </Button>
                            : <IconSquareMinus size={20} color={'red'} />}

                            {feature.Firefox ?
                                <Button
                                    variant="subtle"
                                    size="sm"
                                    component={Link}
                                    to={`${feature.Slug}/firefox`}
                                >
                                    <IconCheckbox size={20} color="green" />
                                </Button>
                            : <IconSquareMinus size={20} color={'red'} radius="xs" /> }

                            {feature.Edge ? <Button
                                variant="subtle"
                                size="sm"
                                component={Link}
                                to={`${feature.Slug}/edge`}
                                >
                                <IconCheckbox size={20} color="green" />
                            </Button> : <IconSquareMinus size={20} color={'red'} radius="xs" />}

                            {feature.Safari ? <Button
                                variant="subtle"
                                size="sm"
                                component={Link}
                                to={`${feature.Slug}/safari`}
                            >
                                    <IconCheckbox size={20} color="green" />
                            </Button> : <IconSquareMinus size={20} color={'red'} radius="xs" /> }

                            {feature.Opera ? <Button
                                variant="subtle"
                                size="sm"
                                component={Link}
                                to={`${feature.Slug}/opera`}
                                >
                                        <IconCheckbox size={20} color="green" />
                            </Button> : <IconSquareMinus size={20} color={'red'} radius="xs" />}
						</Group>
					</Box>
				))}
			</ScrollArea>
			<Box className="grid" sx={theme => ({ borderTop: borderColor(theme)})}>
				<Grid gutter="0">
				     <Grid.Col span={10} sx={(theme) => ({ borderRight: borderColor(theme) })}>
					     <Button variant="light" size="sm" fullWidth={true} leftIcon={<IconTextPlus size={20} />} component="a" href="https://github.com/pankajparashar/canidev.tools/issues/new">
 						     {" Add New"}
					     </Button>
				     </Grid.Col>
				     <Grid.Col span={2} sx={(theme) => ({ borderRight: borderColor(theme) })}>
					     <Button variant="subtle" size="sm" fullWidth={true} component="a" href="https://canidevtools.substack.com/feed.xml">
						     <IconRss size={20} stroke={2.5} />
					     </Button>
				     </Grid.Col>
			     </Grid>
				 <SimpleGrid cols={5} spacing={0} verticalSpacing={0} align="center" sx={(theme) => ({ borderRight: borderColor(theme) })}>
					<Button size="sm" variant="subtle" sx={(theme) => ({ borderRight: borderColor(theme) })}>{count.Chrome}</Button>
					<Button size="sm" variant="subtle" sx={(theme) => ({ borderRight: borderColor(theme) })}>{count.Firefox}</Button>
					<Button size="sm" variant="subtle" sx={(theme) => ({ borderRight: borderColor(theme) })}>{count.Edge}</Button>
					<Button size="sm" variant="subtle" sx={(theme) => ({ borderRight: borderColor(theme) })}>{count.Safari}</Button>
					<Button size="sm" variant="subtle" sx={(theme) => ({ borderRight: borderColor(theme) })}>{count.Opera}</Button>
				</SimpleGrid>
			</Box>
		</Stack>
	);
}
