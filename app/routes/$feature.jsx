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
import { IconBrandGithub } from '@tabler/icons';
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
} from '@tabler/icons';


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
                {formatDistanceToNow(new Date(feature.LastModifiedTime), { addSuffix: true })}
            </Alert>

            <Alert p="lg" title="Author" styles={_ => ({ title: { marginBottom: 0 }})} sx={theme => ({ borderBottom: borderColor(theme) })}>
              <Anchor variant="link" href={`https://twitter.com/${feature.Author}`}>
                {feature.Author}
              </Anchor>
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