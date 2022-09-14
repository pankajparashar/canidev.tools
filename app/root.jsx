import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useParams,
  useSearchParams,
} from '@remix-run/react';
import styles from './root.css';

import * as React from 'react';
import * as fs from 'fs';
import path from 'path';
import { json } from '@remix-run/node';

import { useMediaQuery } from '@mantine/hooks';
import {
  IconGridDots,
  IconCode,
  IconBookmark,
  IconListDetails,
  IconBrandTwitter,
  IconBrandGithub,
  IconNews,
  IconBrightness,
  IconBrandDiscord,
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
  IconAd2,
} from '@tabler/icons';
import { Badge, Box, NavLink, MantineProvider, Collapse } from '@mantine/core';
import { Grid, Button, Divider, Alert, Text } from '@mantine/core';
import { Group } from '@mantine/core';

export const meta = () => {
  return { title: 'Can I DevTools?' };
};

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ];
}

export function loader() {
  const categories = {};
  fs.readdirSync('features').forEach((name) => {
    const filename = path.join('features', name);
    const file = fs.readFileSync(filename);
    const feature = JSON.parse(file);

    const category = feature.fields.Category;
    if (category in categories) {
      categories[category] = categories[category] + 1;
    } else {
      categories[category] = 1;
    }
  });
  return json(categories);
}

export function CarbonAds() {
  const adRef = React.useRef();

  React.useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//cdn.carbonads.com/carbon.js?serve=CEAIVKJJ&placement=wwwcanidevtools';
    script.async = true;
    script.id = '_carbonads_js';
    adRef.current.appendChild(script);
  }, []);

  return (
    <Alert
      icon={<IconAd2 size={20} />}
      title="Sponsored by"
      color="blue"
      radius="xs"
      withCloseButton
    >
      <Box ref={adRef} className="carbon-cad" />
    </Alert>
  );
}

export default function App() {
  const [params, setParams] = useSearchParams();
  const categories = useLoaderData();
  const isMobile = useMediaQuery('(max-width: 700px)');
  const [open, setOpen] = React.useState(true);
  const icons = {
    CSS: <IconBoxMargin size={20} stroke={1.5} />,
    Accessibility: <IconAccessible size={20} stroke={1.5} />,
    Audit: <IconReportMedical size={20} stroke={1.5} />,
    Console: <IconTerminal2 size={20} stroke={1.5} />,
    Elements: <IconCrosshair size={20} stroke={1.5} />,
    JavaScript: <IconBrandNextjs size={20} stroke={1.5} />,
    Network: <IconAffiliate size={20} stroke={1.5} />,
    Other: <IconHexagons size={20} stroke={1.5} />,
    Sources: <IconCode size={20} stroke={1.5} />,
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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <Meta />
        <Links />
      </head>
      <body>
        <MantineProvider
          withNormalizeCSS
          theme={{
            fontFamily: '"Operator Mono", "Input Mono", sans-serif',
            primaryColor: 'gray',
            primaryShade: 9,
            defaultRadius: 'xs',
          }}
        >
          <Box className="grid">
            <Box
              sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
              })}
            >
              <Box
                p="xs"
                sx={(theme) => ({
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRight: `1px solid ${theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[4]
                    }`,
                })}
              >
                <Button size="xs" variant="default" component={Link} to="/">
                  <svg
                    viewBox="178.683 222.461 394.649 307.103"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                  >
                    <path
                      d="m490.73 249.34-197.32 276.25-32.125-22.93 197.32-276.25zm75.199 170.45-98.664-78.93-24.645 30.844 79.387 63.496-79.402 63.52 24.645 30.844 98.664-78.93c4.6953-3.7734 7.418-9.4336 7.418-15.434s-2.7227-11.664-7.4023-15.41zm-256.52-39.465-79.402-63.52 79.402-63.52-24.664-30.824-98.664 78.93c-4.6758 3.75-7.3984 9.4141-7.3984 15.414s2.7227 11.66 7.3984 15.41l98.664 78.93z"
                      fill="#000000"
                    />
                  </svg>
                </Button>
                <Box>
                  <Text weight={700}>Can I DevTools?</Text>
                </Box>
                <Button
                  variant="default"
                  size="xs"
                  onClick={() => setOpen(!open)}
                >
                  <IconListDetails size={20} />
                </Button>
              </Box>
              <Divider />

              <Collapse
                in={open}
                sx={(theme) => ({
                  borderRight: `1px solid ${theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[4]
                    }`,
                })}
              >
                <Link to={'/'}>
                  <NavLink
                    active={params.get('category') === null}
                    key={'all'}
                    icon={<IconList size="20" stroke="2" />}
                    label={'All'}
                    rightSection={
                      <Badge size="md" variant="light" color={'dark'}>
                        {Object.values(categories).reduce((a, b) => a + b)}
                      </Badge>
                    }
                  />
                </Link>
                {Object.keys(categories)
                  .sort()
                  .map((category) => (
                    <Link
                      to={`/?category=${category.toLocaleLowerCase()}`}
                      key={category}
                    >
                      <NavLink
                        active={
                          params.get('category')?.toLowerCase() ===
                          category.toLowerCase()
                        }
                        key={category}
                        icon={icons[category]}
                        label={category}
                        rightSection={
                          <Badge
                            size="md"
                            variant="light"
                            color={colors[category]}
                          >
                            {categories[category]}
                          </Badge>
                        }
                      />
                    </Link>
                  ))}
              </Collapse>

              <Collapse
                in={open}
                sx={(theme) => ({
                  borderRight: `1px solid ${theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[4]
                    }`,
                })}
              >
                <Divider />
                <Group
                  grow
                  sx={(theme) => ({
                    padding: theme.spacing.xs,
                  })}
                >
                  <Button
                    variant="default"
                    component="a"
                    href="https://twitter.com/CanIDevTools"
                  >
                    <IconBrandTwitter size={20} />
                  </Button>
                  <Button
                    variant="default"
                    component="a"
                    href="https://github.com/pankajparashar/canidev.tools"
                  >
                    <IconBrandGithub size={20} />
                  </Button>
                  <Button
                    variant="default"
                    component="a"
                    href="https://canidevtools.substack.com"
                  >
                    <IconNews size={20} />
                  </Button>
                  <Button variant="default">
                    <IconBrightness size={20} />
                  </Button>
                </Group>
                <Divider />
                <CarbonAds />
                <Divider />
              </Collapse>
            </Box>
            <Box className="colspan">
              <Outlet />
            </Box>
          </Box>
        </MantineProvider>
        <ScrollRestoration />
        <Scripts />
        <script data-goatcounter="https://canidevtools.goatcounter.com/count"
          async src="//gc.zgo.at/count.js"></script>
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
