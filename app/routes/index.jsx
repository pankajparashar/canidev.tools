import * as fs from 'fs';
import path from 'path';

import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { ScrollArea } from '@mantine/core';
import { SimpleGrid } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { Grid } from '@mantine/core';
import { Badge, Box, NavLink } from '@mantine/core';
import { Stack, Button } from '@mantine/core';
import { Divider } from '@mantine/core';
import { Group } from '@mantine/core';
import { ThemeIcon } from '@mantine/core';

import {
  IconHome2,
  IconGauge,
  IconChevronRight,
  IconActivity,
  IconListSearch,
  IconSortAscending,
  IconBrandChrome,
  IconBrandFirefox,
  IconBrandEdge,
  IconBrandSafari,
  IconBrandOpera,
  IconCheckbox,
  IconSquareMinus,
} from '@tabler/icons';

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const category = url.searchParams.get('category');

  let records = [];
  fs.readdirSync(`${__dirname}/../features`).forEach((name) => {
    const filename = path.join('features', name);
    const file = fs.readFileSync(filename);
    const record = JSON.parse(file);
    records.push(record);
  });

  records =
    category && category.length > 0
      ? records.filter(
        (r) => r.fields.Category.toLowerCase() === category.toLowerCase()
      )
      : records;
  return json(records);
};

export default function Index() {
  const features = useLoaderData();

  return (
    <Stack
      spacing={0}
      sx={(theme) => ({
        borderRight: `1px solid ${theme.colorScheme === 'dark'
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
                placeholder="Filter"
                icon={<IconListSearch size={20} />}
              />
            </Grid.Col>
            <Grid.Col span={2}>
              <Button variant="default" size="xs" fullWidth={true}>
                <IconSortAscending size={20} />
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

      <ScrollArea
        offsetScrollbars
        type="auto"
        className="h_100vh"
        scrollbarSize={12}
      >
        {features.map((feature) => (
          <Box className="grid" key={feature.fields.Slug}>
            <Box
              sx={(theme) => ({
                borderRight: `1px solid ${theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[4]
                  }`,
              })}
            >
              <Link to={feature.fields.Slug}>
                <NavLink
                  label={feature.fields.Name}
                  description={feature.fields.description}
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
                size="xs"
                component={Link}
                to={`${feature.fields.Slug}/chrome`}
              >
                {feature.fields.Chrome ? (
                  <IconCheckbox size={20} color="green" />
                ) : (
                  <IconSquareMinus size={20} color={'red'} />
                )}
              </Button>
              <Button variant="subtle" size="xs">
                {feature.fields.Firefox ? (
                  <IconCheckbox size={20} color="green" />
                ) : (
                  <IconSquareMinus size={20} color={'red'} radius="xs" />
                )}
              </Button>
              <Button variant="subtle" size="xs">
                {feature.fields.Edge ? (
                  <IconCheckbox size={20} color="green" />
                ) : (
                  <IconSquareMinus size={20} color={'red'} radius="xs" />
                )}
              </Button>
              <Button variant="subtle" size="xs">
                {feature.fields.Safari ? (
                  <IconCheckbox size={20} color="green" />
                ) : (
                  <IconSquareMinus size={20} color={'red'} radius="xs" />
                )}
              </Button>
              <Button variant="subtle" size="xs">
                {feature.fields.Opera ? (
                  <IconCheckbox size={20} color="green" />
                ) : (
                  <IconSquareMinus size={20} color={'red'} radius="xs" />
                )}
              </Button>
            </Group>
          </Box>
        ))}
      </ScrollArea>
    </Stack>
  );
}
