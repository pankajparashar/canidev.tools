"use client";

import { useRef, useEffect, useContext, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import superjson from "superjson";

import {
  Alert,
  Tooltip,
  Avatar,
  Box,
  Button,
  Tabs,
  Menu,
  Anchor,
  TextInput,
  Accordion,
  ActionIcon,
  AppShell,
  Burger,
  Group,
  ScrollArea,
  NavLink,
  Divider,
  SimpleGrid,
  Stack,
  Grid,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery, useLocalStorage } from "@mantine/hooks";

import {
  IconHash,
  IconSortAscending,
  IconSortDescending,
  IconFlame,
  IconSitemap,
  IconBrandGithub,
  IconBrandX,
  IconUserCircle,
  IconArrowBack,
  IconListSearch,
  IconBrightness,
  IconListDetails,
  IconChevronRight,
  IconRss,
  IconPlaylistAdd,
} from "@tabler/icons-react";

import { IconBrandSubStack, ICONS } from "./tabler-icons";
import { DataContext } from "./data-provider";

export const AppLayout = (props) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const query = searchParams.get("q");
  const sort = searchParams.get("sort");
  const [favorites] = useLocalStorage({
    key: "F12",
    defaultValue: new Set(),
    serialize: superjson.stringify,
    deserialize: (str) =>
      str === undefined ? new Set() : superjson.parse(str),
  });

  const router = useRouter();
  const { toggleColorScheme } = useMantineColorScheme();

  let { categories, features, tags } = useContext(DataContext);
  features = features
    .filter(
      (f) =>
        category === null ||
        f.Category === category ||
        (category === "favorites" && favorites.has(f.Slug))
    )
    .filter((f) => tag === null || f.Tags?.includes(tag))
    .filter(
      (f) =>
        query === null ||
        f.Name.toLowerCase().includes(query.toLowerCase()) ||
        f.Description.toLowerCase().includes(query.toLowerCase()) ||
        f.Slug.toLowerCase().includes(query.toLowerCase())
    );

  switch (sort) {
    case "dsc":
      features = features.sort().reverse();
      break;
    case "popular":
      break;
    default:
      features = features.sort();
  }
  const isMobile = useMediaQuery("(max-width: 1150px)");
  const pathname = usePathname();
  const activeSlug = pathname.split("/")[1];

  const [opened, { toggle }] = useDisclosure();

  useEffect(() => {
    document
      .getElementById(activeSlug)
      ?.scrollIntoView({ block: "start", inline: "nearest" });
  }, []);

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: 350,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="0"
    >
      <AppShell.Header>
        <h1 className="hide">Can I DevTools?</h1>
        <Group px="md" justify="space-between" h="100%">
          <Group gap={"xs"}>
            <Anchor href="/" data-umami-event="root">
              <img src="/logo.png" height="49px" className="logo" />
            </Anchor>
          </Group>
          <Group gap="xs" align="center">
            <ActionIcon
              variant="subtle"
              onClick={toggleColorScheme}
              data-umami-event="theme"
            >
              <IconBrightness />
            </ActionIcon>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section grow component={ScrollArea}>
          <Accordion
            defaultValue={tag ? "tags" : "categories"}
            variant="filled"
          >
            <Accordion.Item key="categories" value="categories">
              <Accordion.Control>
                Categories ({Object.keys(categories).length})
              </Accordion.Control>
              <Accordion.Panel>
                <NavLink
                  styles={{
                    label: {
                      fontSize: "var(--mantine-font-size-md)",
                    },
                  }}
                  label="All"
                  variant="filled"
                  active={searchParams.get("category") === null}
                  component={Link}
                  href="/"
                  leftSection={<IconListDetails stroke={1.5} size={20} />}
                  rightSection={Object.values(categories).reduce(
                    (a, b) => a + b,
                    0
                  )}
                />
                {favorites.size > 0 ? (
                  <NavLink
                    styles={{
                      label: {
                        fontSize: "var(--mantine-font-size-md)",
                      },
                    }}
                    label="Favorites"
                    variant="filled"
                    active={searchParams.get("category") === "favorites"}
                    component={Link}
                    href={{
                      pathname: "/",
                      query: { category: "favorites" },
                    }}
                    leftSection={ICONS["Favorites"]}
                    rightSection={favorites.size}
                  />
                ) : null}
                {Object.keys(categories)
                  .sort()
                  .map((category) => (
                    <NavLink
                      styles={{
                        label: {
                          fontSize: "var(--mantine-font-size-md)",
                        },
                      }}
                      label={category}
                      key={category}
                      rightSection={categories[category]}
                      leftSection={ICONS[category]}
                      component={Link}
                      variant="filled"
                      active={searchParams.get("category") === category}
                      href={{
                        pathname: "/",
                        query: { category },
                      }}
                    />
                  ))}
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item key="tags" value="tags">
              <Accordion.Control>
                Tags ({Object.keys(tags).length})
              </Accordion.Control>
              <Accordion.Panel>
                {Object.entries(tags).map(([tag, slugs]) => {
                  return (
                    <NavLink
                      key={tag}
                      label={tag}
                      leftSection={<IconHash stroke={1.5} size={20} />}
                      rightSection={slugs.length}
                      component={Link}
                      variant="filled"
                      active={searchParams.get("tag") === tag}
                      href={{
                        pathname: "/",
                        query: { tag },
                      }}
                      styles={{
                        label: {
                          fontSize: "var(--mantine-font-size-md)",
                        },
                      }}
                    />
                  );
                })}
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </AppShell.Section>
        <AppShell.Section>
          <NavFooter pathname={pathname} searchParams={searchParams} />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        {isMobile && pathname !== "/" ? (
          <Box>{props.children}</Box>
        ) : (
          <Box className="grid">
            <Box>
              <Box p="md" pb="0">
                <Group align="top" wrap="nowrap">
                  <TextInput
                    style={{ flexGrow: 1 }}
                    variant="filled"
                    placeholder={`Search ${features.length} records`}
                    leftSection={<IconListSearch stroke={1.5} size={20} />}
                    leftSectionPointerEvents="none"
                    rightSection={
                      <Tooltip
                        label="Press Enter"
                        position="left-center"
                        withArrow
                      >
                        <IconArrowBack stroke={1.5} size={20} />
                      </Tooltip>
                    }
                    pb="md"
                    onKeyDown={(event) => {
                      const value = event.target.value.trim();
                      if (event.key === "Enter") {
                        const params = new URLSearchParams(searchParams);
                        if (value) params.set("q", value);
                        else params.delete("q");
                        router.push("/" + "?" + params.toString());
                        umami.track("search");
                      }
                    }}
                  />

                  <Menu shadow="md" position="bottom-end" offset={0}>
                    <Menu.Target>
                      <Button variant="light" data-umami-event="sort">
                        <IconSortAscending stroke={1.5} />
                      </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<IconSortAscending stroke={1.5} />}
                        size={20}
                        component={Link}
                        href={{
                          pathname,
                          query: {
                            ...Object.fromEntries(searchParams),
                            sort: "asc",
                          },
                        }}
                      >
                        Sort Ascending
                      </Menu.Item>
                      <Menu.Item
                        leftSection={
                          <IconSortDescending stroke={1.5} size={20} />
                        }
                        component={Link}
                        href={{
                          pathname,
                          query: {
                            ...Object.fromEntries(searchParams),
                            sort: "dsc",
                          },
                        }}
                      >
                        Sort Descending
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item
                        leftSection={<IconFlame stroke={1.5} size={20} />}
                        component={Link}
                        href={{
                          pathname,
                          query: {
                            ...Object.fromEntries(searchParams),
                            sort: "popular",
                          },
                        }}
                      >
                        Most Popular
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
                <Divider />
              </Box>
              <ScrollArea
                h={"calc(100dvh - 190px)"}
                type="hover"
                scrollbarSize={10}
                scrollHideDelay={0}
                p="md"
                pb="0"
                pt="0"
              >
                {features.map((feature) => (
                  <div key={feature.Slug} id={feature.Slug}>
                    <NavLink
                      px={"xs"}
                      label={feature.Name}
                      description={feature.Description}
                      styles={{
                        label: {
                          fontSize: "var(--mantine-font-size-md)",
                          fontWeight:
                            activeSlug === feature.Slug ? "bold" : "inherit",
                        },
                        description: {
                          fontSize: "var(--mantine-font-size-md)",
                          fontWeight:
                            activeSlug === feature.Slug ? "bold" : "inherit",
                        },
                      }}
                      active={activeSlug === feature.Slug}
                      variant={
                        activeSlug === feature.Slug ? "filled" : "default"
                      }
                      component={Link}
                      href={{
                        pathname: `/${feature.Slug}`,
                        query: Object.fromEntries(searchParams),
                      }}
                      rightSection={<IconChevronRight stroke={1} />}
                    />
                    <Divider />
                  </div>
                ))}
              </ScrollArea>
              <Box p="md" pt="0">
                <Divider />
                <Grid grow gutter="xs" mt="md">
                  <Grid.Col span={2}>
                    <Button
                      variant="light"
                      fullWidth
                      component="a"
                      href="/feed.xml"
                      data-umami-event="rss"
                    >
                      <IconRss size={20} />
                    </Button>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Button
                      variant="light"
                      fullWidth
                      component="a"
                      href="#tally-open=mY4KvN&tally-align-left=1&tally-hide-title=1&tally-overlay=1&tally-auto-close=0"
                      data-umami-event="add-new"
                    >
                      <IconPlaylistAdd stroke={1.5} /> &nbsp;Add New
                    </Button>
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <Button
                      variant="light"
                      fullWidth
                      component="a"
                      href="/sitemap.xml"
                      data-umami-event="sitemap"
                    >
                      <IconSitemap size={20} stroke={1.5} />
                    </Button>
                  </Grid.Col>
                </Grid>
              </Box>
            </Box>
            <Box>{props.children}</Box>
          </Box>
        )}
      </AppShell.Main>
    </AppShell>
  );
};

const NavFooter = (props) => {
  const adRef = useRef();
  const [activeTab, setActiveTab] = useState("ads");

  useEffect(() => {
    adRef.current.addEventListener(
      "DOMNodeInserted",
      (event) => event.target.id === "carbonads_1" && event.target.remove()
    );

    const s = document.createElement("script");
    s.id = "_carbonads_js";
    s.src = `//cdn.carbonads.com/carbon.js?serve=CEAIVKJJ&placement=wwwcanidevtools`;
    adRef.current.appendChild(s);
  }, [props.pathname, props.searchParams]);

  return (
    <Tabs
      placement="right"
      inverted={true}
      value={activeTab}
      onChange={setActiveTab}
    >
      <Tabs.List justify="space-between">
        <Tabs.Tab value="ads" px={"xs"}>
          Ads
        </Tabs.Tab>
        <Tabs.Tab
          value="about"
          leftSection={<IconUserCircle size={20} />}
          ml="auto"
        />
      </Tabs.List>

      <Tabs.Panel value="ads">
        <Alert
          ref={adRef}
          p={"xs"}
          key={props.pathname + props.searchParams.toString()}
        ></Alert>
      </Tabs.Panel>
      <Tabs.Panel value="about">
        <Alert
          styles={{
            message: {
              wordBreak: "break-word",
              marginTop: 0,
            },
          }}
        >
          <Stack gap={0}>
            <Box>
              <Avatar
                size={"100px"}
                radius="sm"
                src="https://github.com/pankajparashar.png"
                styles={{ root: { float: "left" } }}
                mr="sm"
                component="a"
                href="https://pankajparashar.com"
              />
              It is like <a href="//caniuse.com">@CanIUse</a> but for the
              browser devtools, created by{" "}
              <a href="//pankajparashar.com">@pankajparashar</a>.
            </Box>
            <SimpleGrid cols={3} spacing={"1px"} mt="sm">
              <Tooltip withArrow label="Substack" position="top">
                <Button
                  size="xs"
                  fullWidth
                  variant="light"
                  component="a"
                  href="https://canidevtools.substack.com/"
                  target="_blank"
                >
                  <IconBrandSubStack size={15} />
                </Button>
              </Tooltip>
              <Tooltip withArrow label="Github" position="top">
                <Button
                  size="xs"
                  fullWidth
                  variant="light"
                  component="a"
                  href="https://github.com/pankajparashar/canidev.tools"
                  target="_blank"
                >
                  <IconBrandGithub size={20} />
                </Button>
              </Tooltip>
              <Tooltip withArrow label="Twitter" position="top">
                <Button
                  size="xs"
                  fullWidth
                  variant="light"
                  component="a"
                  href="https://twitter.com/canidevtools"
                  target="_blank"
                >
                  <IconBrandX size={20} />
                </Button>
              </Tooltip>
            </SimpleGrid>
          </Stack>
        </Alert>
      </Tabs.Panel>
    </Tabs>
  );
};
