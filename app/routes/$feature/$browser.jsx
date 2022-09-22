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
  Badge,
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
        spacing="xs"
        sx={(theme) => ({
          padding: theme.spacing.xs,
        })}
      >
        <Button
          size="xs"
          radius="xs"
          leftIcon={icons[browser]}
          variant="default"
          component="a"
          href={`/${feature.slug}/${browser}`}
        >
          {browser.toLocaleUpperCase()}
        </Button>
        <Group spacing="xs">
          <ThemeIcon color={feature[browser].Platform.includes("Windows") ? "" : "gray.2"} variant="subtle"><IconBrandWindows stroke="1.5" size="20" /></ThemeIcon>
          <Divider orientation="vertical" />
          <IconBrandApple stroke="1.5" size="20" />
          <Divider orientation="vertical" />
          <ThemeIcon color={feature[browser].Platform.includes("Linux") ? "" : "gray.2"} variant="subtle"><IconBrandUbuntu stroke="1.5" size="20" /></ThemeIcon>
        </Group>
        <Button
          size="xs"
          radius="xs"
          variant="default"
          leftIcon={<IconShare size="18" />}
          component={"a"}
          href={feature[browser].Share}
        >
          Share
        </Button>
      </Group>
      <Divider />
      <Tabs color="dark" defaultValue="png">
        <Tabs.List>
          <Tabs.Tab value="png">PNG</Tabs.Tab>
          <Tabs.Tab value="gif">GIF</Tabs.Tab>
          <Tabs.Tab value="mp4">MP4</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="png">
          <Image fit="contain" src={feature[browser].PNG} key={feature[browser].PNG} />
        </Tabs.Panel>
        <Tabs.Panel value="gif">
          <Image fit="contain" src={feature[browser].GIF} key={feature[browser].GIF} />
        </Tabs.Panel>
        <Tabs.Panel value="mp4">
          <video controls preload="metadata" key={feature[browser].MP4}>
            <source src={feature[browser].MP4 + "#t=0.1"} type="video/mp4" />
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
