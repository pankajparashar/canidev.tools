import * as fs from 'fs';
import path from 'path';
import * as React from 'react'

import { json } from '@remix-run/node';
import { Link, useLoaderData, useSearchParams, useNavigate } from '@remix-run/react';

import { ThemeIcon, Group, Divider, Stack, Button, Badge, Box, NavLink, Grid, SimpleGrid, ScrollArea, TextInput, Tooltip, Input } from '@mantine/core';
import { IconHome2, IconGauge, IconChevronRight, IconActivity, IconListSearch, IconSortAscending, IconBrandChrome, IconBrandFirefox, IconBrandEdge, IconBrandSafari, IconBrandOpera, IconCheckbox, IconSquareMinus, IconRss, IconTextPlus, IconSortDescending, IconSortAscendingLetters, IconSortDescendingLetters, IconArrowBack } from '@tabler/icons';

export const loader = async ({ request }) => {
	const url = new URL(request.url);
	const category = url.searchParams.get('category') || 'all';
	const sort = url.searchParams.get('sort') || 'asc'
	const search = url.searchParams.get('search') || ''

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
		category !== 'all' ? records.filter(
			(r) => r.Category.toLowerCase() === category.toLowerCase()
		) : records;
	
	// Filter on search
	records = search ?
		records.filter(r => r.Name.toLowerCase().includes(search.toLowerCase()) || r.Description.toLowerCase().includes(search.toLowerCase()))
		: records
		
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
	const features = useLoaderData()
	const navigate = useNavigate();
	const [params, setParams] = useSearchParams()
	
	const count = getCount(features)
	const category = params.get('category') || 'all'
	const sort = params.get('sort')
	const search = params.get('search')
	
	return (
		<Stack
			spacing={0}
			sx={(theme) => ({
				borderRight: `1px solid ${theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[4]
					}`,
					borderLeft: `1px solid ${theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[4]
					}`,
			})}
		>
			<Box className="grid">
				<Box
					sx={(theme) => ({
						borderRight: `1px solid ${theme.colorScheme === 'dark'
							? theme.colors.dark[6]
							: theme.colors.gray[4]
							}`,
					})}
				>
					<Grid
						gutter={'xs'}
						sx={(theme) => ({
							padding: theme.spacing.xs,
						})}
					>
						<Grid.Col span={10}>
							<TextInput
								size="xs"
								label=""
								variant="filled"
								placeholder={search ? search : "Search"}
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
							<Button variant="default" size="xs" fullWidth={true} onClick={() => {
								params.set('sort', sort === 'dsc' ? 'asc' : 'dsc')
								navigate({
									search: params.toString()
								})
							}}>
								{sort === 'asc' ? <IconSortAscending size={20}/> : <IconSortDescending size={20} />}
							</Button>
						</Grid.Col>
					</Grid>
				</Box>
				<Group
					grow
					sx={(theme) => ({
						padding: theme.spacing.xs,
					})}
				>
					<Button variant="default" size="xs">
						<IconBrandChrome size={20} />
					</Button>
					<Button variant="default" size="xs">
						<IconBrandFirefox size={20} />
					</Button>
					<Button variant="default" size="xs">
						<IconBrandEdge size={20} />
					</Button>
					<Button variant="default" size="xs">
						<IconBrandSafari size={20} />
					</Button>
					<Button variant="default" size="xs">
						<IconBrandOpera size={20} />
					</Button>
				</Group>
			</Box>
			<Divider />
			<ScrollArea offsetScrollbars type="auto" className="h_100vh" scrollbarSize={12}>
				{features.map((feature) => (
					<Box className="grid" key={feature.Slug}>
						<Box
							sx={(theme) => ({
								borderRight: `1px solid ${theme.colorScheme === 'dark'
									? theme.colors.dark[6]
									: theme.colors.gray[4]
									}`,
							})}
						>
							<Link to={feature.Slug}>
								<NavLink
									label={feature.Name}
									description={feature.description}
									rightSection={<IconChevronRight size={12} stroke={1.5} />}
								/>
							</Link>
							<Divider />
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
							<Button
								variant="subtle"
								size="sm"
								component={Link}
								to={`${feature.Slug}/chrome`}
							>
								{feature.Chrome ? (
									<IconCheckbox size={20} color="green" />
								) : (
									<IconSquareMinus size={20} color={'red'} />
								)}
							</Button>
							<Button
								variant="subtle"
								size="sm"
								component={Link}
								to={`${feature.Slug}/firefox`}
							>
								{feature.Firefox ? (
									<IconCheckbox size={20} color="green" />
								) : (
									<IconSquareMinus size={20} color={'red'} radius="xs" />
								)}
							</Button>
							<Button
								variant="subtle"
								size="sm"
								component={Link}
								to={`${feature.Slug}/edge`}
							>
								{feature.Edge ? (
									<IconCheckbox size={20} color="green" />
								) : (
									<IconSquareMinus size={20} color={'red'} radius="xs" />
								)}
							</Button>
							<Button
								variant="subtle"
								size="sm"
								component={Link}
								to={`${feature.Slug}/safari`}
							>
								{feature.Safari ? (
									<IconCheckbox size={20} color="green" />
								) : (
									<IconSquareMinus size={20} color={'red'} radius="xs" />
								)}
							</Button>
							<Button
								variant="subtle"
								size="sm"
								component={Link}
								to={`${feature.Slug}/opera`}
							>
								{feature.Opera ? (
									<IconCheckbox size={20} color="green" />
								) : (
									<IconSquareMinus size={20} color={'red'} radius="xs" />
								)}
							</Button>
						</Group>
					</Box>
				))}
			</ScrollArea>
			<Divider />
			<Box className="grid">
				<Grid gutter="xs" p="xs">
				     <Grid.Col span={10}>
					     <Button variant="default" size="xs" fullWidth={true} leftIcon={<IconTextPlus size={20} />} component="a" href="https://github.com/pankajparashar/canidev.tools/issues/new">
 						     {" Add New"}
					     </Button>
				     </Grid.Col>
				     <Grid.Col span={2}>
					     <Button variant="default" size="xs" fullWidth={true} component="a" href="https://canidevtools.substack.com/feed.xml">
						     <IconRss size={20} stroke={2.5} />
					     </Button>
				     </Grid.Col>
			     </Grid>
                    <Group grow p="xs" sx={(theme) => ({
                         borderLeft: `1px solid ${theme.colorScheme === 'dark'
                              ? theme.colors.dark[6]
                              : theme.colors.gray[4]
                              }`,
                         })}
                    >
                         <Badge radius="xs" size="lg" variant="default">{count.Chrome}</Badge>                         
                         <Badge radius="xs" size="lg" variant="default">{count.Firefox}</Badge>                         
                         <Badge radius="xs" size="lg" variant="default">{count.Edge}</Badge>                         
                         <Badge radius="xs" size="lg" variant="default">{count.Safari}</Badge>                         
                         <Badge radius="xs" size="lg" variant="default">{count.Opera}</Badge>                         
                    </Group>
			</Box>
		</Stack>
	);
}
