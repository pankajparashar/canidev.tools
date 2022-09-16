import * as fs from 'fs';
import path from 'path';

import { Outlet } from '@remix-run/react';
import { Link, useLoaderData, useParams } from '@remix-run/react';
import { json } from '@remix-run/node'; // or cloudflare/deno
import { Stack, Button } from '@mantine/core';
import { Group } from '@mantine/core';
import { Breadcrumbs, Anchor } from '@mantine/core';
import { Box } from '@mantine/core';
import { Accordion, NavLink } from '@mantine/core';
import { Text } from '@mantine/core';
import { Divider } from '@mantine/core';
import { Badge, Grid } from '@mantine/core';
import { IconHome2, IconBrandGithub } from '@tabler/icons';
import { Alert } from '@mantine/core';
import { Space } from '@mantine/core';
import { ThemeIcon } from '@mantine/core';

import { SimpleGrid } from '@mantine/core';
import { Spoiler } from '@mantine/core';
import {
  IconInfoCircle,
  IconAlertCircle,
  IconBrandChrome,
  IconBrandFirefox,
  IconBrandEdge,
  IconBrandSafari,
  IconBrandOpera,
  IconBoxMargin,
  IconList,
  IconAccessible,
  IconReportMedical,
  IconTerminal2,
  IconZoomCode,
  IconBrandJavascript,
  IconBrandNextjs,
  IconAffiliate,
  IconHexagons,
  IconCrosshair,
  IconCode,
  IconGauge,
  IconClock,
  IconUser,
  IconNews,
  IconAt,
} from '@tabler/icons';

export function loader({ params }) {
  const filename = path.join('features', params.feature + '.json');
  const file = fs.readFileSync(filename);
  const record = JSON.parse(file);

  return json(record);
}

export default function Feature() {
  const params = useParams();
  const feature = useLoaderData();
  const icons = {
    CSS: <IconBoxMargin size={30} stroke={2} />,
    Accessibility: <IconAccessible size={30} stroke={1.5} />,
    Audit: <IconReportMedical size={30} stroke={1.5} />,
    Console: <IconTerminal2 size={30} stroke={1.5} />,
    Elements: <IconCrosshair size={30} stroke={2} />,
    JavaScript: <IconBrandNextjs size={30} stroke={1.5} />,
    Network: <IconAffiliate size={30} stroke={1.5} />,
    Other: <IconHexagons size={30} stroke={1.5} />,
    Sources: <IconCode size={30} stroke={1.5} />,
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
    <div className="grid">
      <Box>
        <Box
          sx={(theme) => ({
            padding: theme.spacing.xs,
            borderRight: `1px solid ${
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[4]
            }`,
          })}
        >
          <Group position="apart">
            <Badge
              radius="xs"
              variant="dot"
              size="lg"
              p="xs"
              color={colors[feature.Category]}
            >
              {feature.Category}
            </Badge>
            <Button
              size="xs"
              variant="default"
              radius="xs"
              leftIcon={<IconBrandGithub size={16} />}
              component="a"
              href={`https://github.com/pankajparashar/canidev.tools/edit/main/features/${feature.Slug}.json`}
            >
              Edit
            </Button>
          </Group>
        </Box>
        <Divider />
        <Box
          sx={(theme) => ({
            borderRight: `1px solid ${
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[4]
            }`,
          })}
        >
          <Box p="xs">
            <Alert
            styles={theme => ({
              title: {
                marginBottom: 0
              }
            })} 

              icon={icons[feature.Category]}
              title={feature.Name}
              color={colors[feature.Category]}
            >
              {feature.Description}
            </Alert>
          </Box>
          <Divider />
          <Group
            grow
            sx={(theme) => ({
              padding: theme.spacing.xs,
            })}
          >
            <Button
              variant="outline"
              color={colors[feature.Category]}
              size="xs"
              disabled={!feature.Chrome}
              component={Link}
              to={`/${feature.Slug}/chrome`}
            >
              <IconBrandChrome size={20} />
            </Button>
            <Button
              variant="outline"
              color={colors[feature.Category]}
              size="xs"
              disabled={!feature.Firefox}
              component={Link}
              to={`/${feature.Slug}/firefox`}
            >
              <IconBrandFirefox size={20} />
            </Button>
            <Button
              variant="outline"
              color={colors[feature.Category]}
              size="xs"
              disabled={!feature.Edge}
              component={Link}
              to={`/${feature.Slug}/edge`}
            >
              <IconBrandEdge size={20} />
            </Button>
            <Button
              variant="outline"
              color={colors[feature.Category]}
              size="xs"
              disabled={!feature.Safari}
              component={Link}
              to={`/${feature.Slug}/safari`}
            >
              <IconBrandSafari size={20} />
            </Button>
            <Button
              variant="outline"
              color={colors[feature.Category]}
              size="xs"
              disabled={!feature.Opera}
              component={Link}
              to={`/${feature.Slug}/opera`}
            >
              <IconBrandOpera size={20} />
            </Button>
          </Group>
          <Divider />
          <SimpleGrid cols={2} spacing="xs" p="xs">
            <Alert
              styles={theme => ({
                title: {
                  marginBottom: 0
                }
              })} 
              title="Last Modified"
              color="gray.9"
              radius="xs"
              p="xs"
            >
              {new Date(feature.LastModifiedTime).toISOString().slice(0,10)}
            </Alert>
            <Alert
              styles={theme => ({
              title: {
                marginBottom: 0
              }
            })} 
              title="Author"
              color="gray.9"
              radius="xs"
              p="xs"
            >
              Pankaj Parashar
            </Alert>
            <Alert
            styles={theme => ({
              title: {
                marginBottom: 0
              }
            })} 
              title="Created At"
              color="gray.9"
              radius="xs"
              p="xs"
            >
              {new Date(feature.CreatedTime).toISOString().slice(0,10)}
            </Alert>
            <Alert
            styles={theme => ({
              title: {
                marginBottom: 0
              }
            })} 
              title="Newsletter"
              color="gray.9"
              radius="xs"
              p="xs"
            >
              Tips & Tricks #1
            </Alert>
          </SimpleGrid>
          <Divider />
        </Box>
      </Box>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
