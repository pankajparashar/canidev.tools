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
              color={colors[feature.fields.Category]}
            >
              {feature.fields.Category}
            </Badge>
            <Button
              size="xs"
              variant="default"
              radius="xs"
              leftIcon={<IconBrandGithub size={16} />}
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
              icon={icons[feature.fields.Category]}
              title={feature.fields.Name}
              color={colors[feature.fields.Category]}
            >
              {feature.fields.Description}
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
              variant="default"
              size="xs"
              disabled={!feature.fields.Chrome}
              component={Link}
              to={`/${feature.fields.Slug}/chrome`}
            >
              <IconBrandChrome size={20} />
            </Button>
            <Button
              variant="default"
              size="xs"
              disabled={!feature.fields.Firefox}
              component={Link}
              to={`/${feature.fields.Slug}/firefox`}
            >
              <IconBrandFirefox size={20} />
            </Button>
            <Button
              variant="default"
              size="xs"
              disabled={!feature.fields.Edge}
              component={Link}
              to={`/${feature.fields.Slug}/edge`}
            >
              <IconBrandEdge size={20} />
            </Button>
            <Button
              variant="default"
              size="xs"
              disabled={!feature.fields.Safari}
              component={Link}
              to={`/${feature.fields.Slug}/safari`}
            >
              <IconBrandSafari size={20} />
            </Button>
            <Button
              variant="default"
              size="xs"
              disabled={!feature.fields.Opera}
              component={Link}
              to={`/${feature.fields.Slug}/opera`}
            >
              <IconBrandOpera size={20} />
            </Button>
          </Group>
          <Divider />
          <SimpleGrid cols={2} spacing="xs" p="xs">
            <Alert
              icon={<IconClock />}
              title="Last Modified"
              color="gray.9"
              radius="xs"
              p="xs"
            >
              {new Date(feature.fields.LastModifiedTime).toLocaleString()}
            </Alert>
            <Alert
              icon={<IconUser />}
              title="Author"
              color="gray.9"
              radius="xs"
              p="xs"
            >
              Pankaj Parashar
            </Alert>
            <Alert
              icon={<IconClock />}
              title="Created At"
              color="gray.9"
              radius="xs"
              p="xs"
            >
              {new Date(feature.fields.CreatedTime).toLocaleString()}
            </Alert>
            <Alert
              icon={<IconNews />}
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
