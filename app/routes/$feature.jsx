import * as fs from 'fs';
import path from 'path';

import { formatDistanceToNow } from 'date-fns'

import { Outlet } from '@remix-run/react';
import { Link, useLoaderData, useParams, useLocation } from '@remix-run/react';
import { json } from '@remix-run/node';
import { Text, Button } from '@mantine/core';
import { Group } from '@mantine/core';
import { Accordion, Anchor } from '@mantine/core';
import { Box, NavLink } from '@mantine/core';
import { Divider } from '@mantine/core';
import { Badge } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';
import { Alert } from '@mantine/core';
import { SimpleGrid } from '@mantine/core';
import {
  IconChevronRight,
  IconBrandChrome,
  IconBrandFirefox,
  IconBrandEdge,
  IconBrandSafari,
  IconBrandOpera,
  IconBoxMargin,
  IconAccessible,
  IconReportMedical,
  IconTerminal2,
  IconBrandNextjs,
  IconAffiliate,
  IconHexagons,
  IconCrosshair,
  IconCode,
} from '@tabler/icons-react';


export const meta = ({ data }) => {
  const { record } = data
  const title = `${record.Name} | Can I DevTools?`
  const description = record.Description
  const url = `https://canidev.tools/${record.Slug}/`
  const image = `https://canidev.tools/images/${record.Slug}.png`

  return {
    title,
    description,
    "og:url": url,
    "og:title": title,
    "og:description": description,
    "og:image": image
  };
};

export let headers = () => {
  return {
    "Cache-Control": "public, s-maxage=120",
  };
};

export function loader({ params }) {
  const filename = path.join('features', params.feature + '.json');
  const file = fs.readFileSync(filename);
  const record = JSON.parse(file);
  record.LastModifiedTime = fs.statSync(filename).ctime

  if (record.Related) {
    record.Related = record.Related.map(slug => {
      const xyz = path.join('features', slug + '.json');
      const tuw = fs.readFileSync(xyz);
      const related = JSON.parse(tuw);
      return { Name: related.Name, Slug: related.Slug }
    })
  }

  return json({ record }, {
    "Cache-Control": "public, s-maxage=60",
  });
}

export default function Feature() {
  const params = useParams();
  const { record: feature } = useLoaderData();
  const location = useLocation();

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
    Performance: "teal",
  };

  const borderColor = theme => `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4]}`
  return (
    <div className="grid">
      <Box>
        <Box sx={(theme) => ({ borderRight: borderColor(theme) })}>
          <Group position="apart">
            <Badge
              radius={0}
              variant="dot"
              size="lg"
              p="md"
              color={colors[feature.Category]}
              styles={{ root: { border: 0 } }}
              sx={theme => ({ borderRight: borderColor(theme) })}
            >
              {feature.Category}
            </Badge>
            <Button
              sx={theme => ({ borderLeft: borderColor(theme) })}
              size="sm"
              variant="subtle"
              leftIcon={<IconBrandGithub size={16} />}
              component="a"
              href={`https://github.com/pankajparashar/canidev.tools/edit/main/features/${feature.Slug}.json`}
            >
              Edit
            </Button>
          </Group>
        </Box>
        <Divider />
        <Box sx={(theme) => ({ borderRight: borderColor(theme) })}>
          <Alert p="lg" title={feature.Name} color={colors[feature.Category]} styles={_ => ({ title: { marginBottom: 0 }})}>
            {feature.Description}
          </Alert>
          <Divider />
          <SimpleGrid cols={6} spacing={0}>
            <Button
              fullWidth={true}
              variant={path.basename(location.pathname) === "chrome" ? "filled" : "subtle"}
              color={colors[feature.Category]}
              size="sm"
              disabled={!feature.Chrome}
              component={Link}
              to={`/${feature.Slug}/chrome`}
              sx={theme => ({ borderRight: borderColor(theme) })}
            >
              <IconBrandChrome size={20} />
            </Button>
            <Button
              fullWidth={true}
              variant={path.basename(location.pathname) === "firefox" ? "filled" : "subtle"}
              color={colors[feature.Category]}
              size="sm"
              disabled={!feature.Firefox}
              component={Link}
              to={`/${feature.Slug}/firefox`}
              sx={theme => ({ borderRight: borderColor(theme) })}
            >
              <IconBrandFirefox size={20} />
            </Button>
            <Button
              fullWidth={true}
              variant={path.basename(location.pathname) === "edge" ? "filled" : "subtle"}
              color={colors[feature.Category]}
              size="sm"
              disabled={!feature.Edge}
              component={Link}
              to={`/${feature.Slug}/edge`}
              sx={theme => ({ borderRight: borderColor(theme) })}
            >
              <IconBrandEdge size={20} />
            </Button>
            <Button
              fullWidth={true}
              variant={path.basename(location.pathname) === "safari" ? "filled" : "subtle"}
              color={colors[feature.Category]}
              size="sm"
              disabled={!feature.Safari}
              component={Link}
              to={`/${feature.Slug}/safari`}
              sx={theme => ({ borderRight: borderColor(theme) })}
            >
              <IconBrandSafari size={20} />
            </Button>
            <Button
              fullWidth={true}
              variant={path.basename(location.pathname) === "opera" ? "filled" : "subtle"}
              color={colors[feature.Category]}
              size="sm"
              disabled={!feature.Opera}
              component={Link}
              to={`/${feature.Slug}/opera`}
              sx={theme => ({ borderRight: borderColor(theme) })}
            >
              <IconBrandOpera size={20} />
            </Button>
            <Button
              fullWidth={true}
              variant={path.basename(location.pathname) === "polypane" ? "filled" : "subtle"}
              color={colors[feature.Category]}
              size="sm"
              disabled={!feature.Polypane}
              component={Link}
              to={`/${feature.Slug}/polypane`}
            >
              <IconBrandPolypane />
            </Button>

          </SimpleGrid>
          <Divider />
          <SimpleGrid cols={2} spacing={0}>
            <Alert p="lg" title="Last Modified" styles={_ => ({ title: { marginBottom: 0 }})} sx={theme => ({ borderRight: borderColor(theme), borderBottom: borderColor(theme) })}>
              {feature.LastModifiedTime}
            </Alert>

            <Alert p="lg" title="Author" styles={_ => ({ title: { marginBottom: 0 }})} sx={theme => ({ borderBottom: borderColor(theme) })}>
              {Array.isArray(feature.Author) ? 
                  <div>
                    {feature.Author.map(author => 
                        <div><Anchor key={author} variant="link" href={`https://twitter.com/${author}`}>{author}</Anchor></div>)}
                  </div>
                  :
                  <Anchor variant="link" href={`https://twitter.com/${feature.Author}`}>{feature.Author}</Anchor>
              }
            </Alert>

            <Alert p="lg" title="Test Live" styles={_ => ({ title: { marginBottom: 0 }})} sx={theme => ({ borderRight: borderColor(theme) })}>
              via <Anchor variant="link" href="https://live.browserstack.com/dashboard">BrowserStack</Anchor>
            </Alert>

            <Alert p="lg" title="Newsletter" styles={_ => ({ title: { marginBottom: 0 }})}>
              <Anchor variant="link" color={"indigo.9"} href={`https://canidevtools.substack.com/p/${feature.Newsletter}`}>
                {feature.Newsletter}
              </Anchor>
            </Alert>
          </SimpleGrid>
          <Divider />
          <Accordion>
            <Accordion.Item value="Related">
              <Accordion.Control p="xs" sx={theme => ({ borderBottom: borderColor(theme) })}>
                <Text weight="700" size="sm">
                  Related ({`${feature.Related ? feature.Related.length : 0}`})
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                {feature.Related && feature.Related.map(record =>
                  <Link to={`/${record.Slug}`}>
                    <NavLink
                      key={record.Slug}
                      label={record.Name}
                      rightSection={<IconChevronRight size={12} stroke={1.5} />}
                    />
                    <Divider />
                  </Link>
                )}
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Box>
      </Box>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

const IconBrandPolypane = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-polypane" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M 21,12 H 15 M 15,4 V 14 H 9 M 9,4 V 16 H 4" />
  </svg>
);