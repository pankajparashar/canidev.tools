import * as React from "react"

import { useParams, useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import * as fs from "fs";
import path from "path";
import { json } from "@remix-run/node";

import { Accordion, LoadingOverlay, Box, Button, Divider, Group, Image, Text } from "@mantine/core";
import { IconBrandChrome, IconBrandFirefox, IconBrandEdge, IconBrandSafari, IconBrandOpera, IconShare, IconBrandWindows, IconBrandApple, IconBrandUbuntu } from "@tabler/icons";

export function loader({ params }) {
  const filename = path.join("features", params.feature + ".json");
  const file = fs.readFileSync(filename);
  const record = JSON.parse(file);

  const newObj = Object.fromEntries(Object.entries(record).map(([k, v]) => [k.toLowerCase(), v]));

  return json(newObj, {
    "Cache-Control": "public, s-maxage=60",
  });
}

export default function Browser() {
  const { browser } = useParams();
  const feature = useLoaderData();
  const refCount = (feature[browser].References?.match(new RegExp("http", "g")) || []).length;

  const icons = {
    chrome: <IconBrandChrome size="18" stroke="1.5" />,
    firefox: <IconBrandFirefox size="18" stroke="1.5" />,
    edge: <IconBrandEdge size="18" stroke="1.5" />,
    safari: <IconBrandSafari size="18" stroke="1.5" />,
    opera: <IconBrandOpera size="18" stroke="1.5" />,
  };

  const borderColor = theme => `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}`;

  return (
    <Box
      sx={theme => ({
        borderLeft: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}`,
      })}>
      <Group position="apart">
        <Button size="sm" radius="xs" leftIcon={icons[browser]} variant="subtle" component="a" href={`/${feature.slug}/${browser}`} sx={theme => ({ borderRight: borderColor(theme) })}>
          {browser.toLocaleUpperCase()}
        </Button>
        <Button size="sm" radius="xs" variant="subtle" leftIcon={<IconShare size="18" />} component={"a"} href={feature[browser].Share} sx={theme => ({ borderLeft: borderColor(theme) })}>
          Share
        </Button>
      </Group>
      <Divider />
      <Box style={{ position: "relative" }}>
        {feature[browser].MP4 ? <Video MP4={feature[browser].MP4} key={feature[browser].MP4} /> : <Image withPlaceholder height={300} />}
      </Box>
      <Accordion
        defaultValue="notes"
        sx={theme => ({
          fontSize: theme.fontSizes.sm,
        })}>
        <Accordion.Item value="notes">
          <Accordion.Control
            p="xs"
            sx={theme => ({
              borderBottom: borderColor(theme),
              borderTop: borderColor(theme)
            })}>
            <Group position="apart">
              <Text weight="700" size="sm">
                Notes
              </Text>
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <Box pl="xs" pb="xs" pr="xs"
              dangerouslySetInnerHTML={{
                __html: feature[browser].Notes ? marked.parse(Array.isArray(feature[browser].Notes) ? feature[browser].Notes.join("\n") : feature[browser].Notes) : "",
              }}
            />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="references">
          <Accordion.Control
            p="xs"
            sx={theme => ({
              borderBottom: borderColor(theme),
            })}>
            <Text weight="700" size="sm">
              References {`(${refCount})`}
            </Text>
          </Accordion.Control>
          {feature[browser].References ? <Accordion.Panel>
            <Box pl="xs" pb="xs" pr="xs"
              dangerouslySetInnerHTML={{
                __html: feature[browser].References ? marked.parse(feature[browser].References) : "",
              }}
            />
          </Accordion.Panel> : null}
        </Accordion.Item>
      </Accordion>
    </Box>
  );
}

const Video = ({ MP4 }) => {
  const [visible, setVisible] = React.useState(true);

  return (
    <>
      <LoadingOverlay visible={visible} overlayBlur={5} />
      <video
        controls autoPlay loop muted playsInline
        preload="metadata"
        src={MP4 + "#t=0.1"}
        onLoadedData={_ => setVisible(false)}
      />
    </>
  )
}
