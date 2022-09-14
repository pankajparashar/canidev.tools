import { useParams, useLoaderData } from '@remix-run/react';
import { Link } from '@remix-run/react';
import { marked } from 'marked';
import * as fs from 'fs';
import path from 'path';
import { json } from '@remix-run/node'; // or cloudflare/deno
import {
  Accordion,
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Group,
  Image,
  Tabs,
  Text,
  SegmentedControl,
  ThemeIcon,
} from '@mantine/core';
import {
  IconBrandChrome,
  IconBrandFirefox,
  IconBrandEdge,
  IconBrandSafari,
  IconBrandOpera,
  IconShare,
  IconBrandWindows,
  IconBrandApple,
  IconBrandUbuntu,
} from '@tabler/icons';

export function loader({ params }) {
  const filename = path.join('features', params.feature + '.json');
  const file = fs.readFileSync(filename);
  const record = JSON.parse(file);

  const newObj = Object.fromEntries(
    Object.entries(record).map(([k, v]) => [k.toLowerCase(), v])
  );

  return json(newObj);
}

export default function Browser() {
  const { browser } = useParams();
  const feature = useLoaderData();

  const icons = {
    chrome: <IconBrandChrome size="18" stroke="1.5" />,
    firefox: <IconBrandFirefox size="18" stroke="1.5" />,
    edge: <IconBrandEdge size="18" stroke="1.5" />,
    safari: <IconBrandSafari size="18" stroke="1.5" />,
    opera: <IconBrandOpera size="18" stroke="1.5" />,
  };

  return (
    <Box
      sx={(theme) => ({
        borderLeft: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[4]
        }`,
      })}
    >
      <Group
        position="apart"
        sx={(theme) => ({
          padding: theme.spacing.xs,
        })}
      >
        <Button
          size="xs"
          radius="xs"
          leftIcon={icons[browser]}
          variant="default"
        >
          {browser.toLocaleUpperCase()}
        </Button>
        <Group spacing="xs">
          <IconBrandWindows stroke="1.5" size="20" />
          <Divider orientation="vertical" />
          <IconBrandApple stroke="1.5" size="20" />
          <Divider orientation="vertical" />
          <IconBrandUbuntu stroke="1.5" size="20" />
        </Group>
        <Button
          size="xs"
          radius="xs"
          variant="default"
          leftIcon={<IconShare size="18" />}
        >
          Share
        </Button>
      </Group>
      <Divider />
      <Tabs color="dark" defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab value="gallery">PNG</Tabs.Tab>
          <Tabs.Tab value="messages">GIF</Tabs.Tab>
          <Tabs.Tab value="settings">MP4</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery">
          <Image fit="contain" src={feature[browser].Image} />
        </Tabs.Panel>

        <Tabs.Panel value="messages">
          <Image fit="contain" src={feature[browser].GIF} />
        </Tabs.Panel>

        <Tabs.Panel value="settings">
          <video controls preload="metadata">
            <source src={feature[browser].Video} type="video/mp4" />
          </video>
        </Tabs.Panel>
      </Tabs>
      <Divider />
      <Accordion
        defaultValue="notes"
        sx={(theme) => ({
          fontSize: theme.fontSizes.sm,
        })}
      >
        <Accordion.Item value="notes">
          <Accordion.Control
            p="xs"
            sx={(theme) => ({
              borderBottom: `1px solid ${
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[4]
              }`,
            })}
          >
            <Text weight="700" size="sm">
              Notes
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <div
              dangerouslySetInnerHTML={{
                __html: feature[browser].Notes
                  ? marked.parse(feature[browser].Notes)
                  : '',
              }}
            />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="references">
          <Accordion.Control
            p="xs"
            sx={(theme) => ({
              borderBottom: `1px solid ${
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[4]
              }`,
            })}
          >
            <Text weight="700" size="sm">
              References
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <div
              dangerouslySetInnerHTML={{
                __html: feature[browser].References
                  ? marked.parse(feature[browser].References)
                  : '',
              }}
            />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Box>
  );
}
