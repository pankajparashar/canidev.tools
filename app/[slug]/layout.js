"use client";

import { useContext, useState } from "react";
import { DataContext } from "../../components/data-provider";
import { IconBrandPolypane } from "../../components/tabler-icons";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import superjson from "superjson";
import { useLocalStorage } from "@mantine/hooks";

import {
  Paper,
  Badge,
  Alert,
  Divider,
  Group,
  Button,
  Tabs,
  Text,
  SimpleGrid,
  Flex,
  ActionIcon,
} from "@mantine/core";
import {
  IconStarFilled,
  IconStar,
  IconClockHour3,
  IconNews,
  IconUsers,
  IconBrandGithub,
  IconBrandSafari,
  IconBrandEdge,
  IconBrandChrome,
  IconBrandFirefox,
  IconCirclesRelation,
  IconHash,
} from "@tabler/icons-react";

export default function Layout({ children, params }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const browser = pathname.split("/")[2];
  const borderColor = () => `1px solid var(--_app-shell-border-color)`;

  const { features } = useContext(DataContext);
  const feature = features.find((f) => f.Slug === params.slug);
  const [favorites, setFavorites] = useLocalStorage({
    key: "F12",
    defaultValue: new Set(),
    serialize: superjson.stringify,
    deserialize: (str) =>
      str === undefined ? new Set() : superjson.parse(str),
  });

  const onTabChange = (value) => {
    router.push(`/${params.slug}/${value}?` + searchParams.toString());
  };

  return (
    <Paper
      className="column"
      w="100%"
      withBorder
      style={{ borderTop: 0, borderBottom: 0 }}
    >
      <Group justify="space-between" style={{ height: "40px" }}>
        <Flex align={"center"} gap="sm">
          <Badge
            variant="dot"
            radius="0"
            p="md"
            py="lg"
            style={{ borderTop: 0, borderBottom: 0, borderLeft: 0 }}
            styles={{
              root: { backgroundColor: "inherit" },
              label: { fontSize: "var(--mantine-font-size-sm)" },
            }}
          >
            {feature.Category}
          </Badge>
          <ActionIcon variant="subtle">
            <IconCirclesRelation size={20} stroke={1.5} />
          </ActionIcon>
        </Flex>
        <Flex align={"center"} gap="sm">
          <ActionIcon
            variant="subtle"
            data-umami-event="favorites"
            onClick={() => {
              const newFavorties = new Set(favorites);
              if (favorites.has(feature.Slug)) {
                newFavorties.delete(feature.Slug);
              } else {
                newFavorties.add(feature.Slug);
              }
              setFavorites(newFavorties);
            }}
          >
            {favorites.has(feature.Slug) ? (
              <IconStarFilled size={20} stroke={1.5} />
            ) : (
              <IconStar size={20} stroke={1.5} />
            )}
          </ActionIcon>
          <Button
            data-umami-event="edit"
            variant="default"
            size="sm"
            styles={{
              root: { backgroundColor: "inherit" },
            }}
            leftSection={<IconBrandGithub size={20} stroke={1.5} />}
            style={{ borderBottom: 0, borderTop: 0 }}
            component="a"
            href={`https://github.com/pankajparashar/canidev.tools/edit/v3/features/${feature.Slug}.json`}
          >
            <Text fw="700" size="sm">
              Edit
            </Text>
          </Button>
        </Flex>
      </Group>
      <Divider />
      <Alert
        title={feature.Name}
        styles={{
          root: { border: 0 },
          body: { gap: 0 },
          title: { fontSize: "var(--mantine-font-size-md)", marginBottom: 0 },
          message: {
            fontSize: "var(--mantine-font-size-md)",
            wordBreak: "break-word",
            marginTop: 0,
          },
          icon: { marginTop: "5px" },
        }}
      >
        {feature.Description}
      </Alert>
      <Divider />
      <Tabs
        value={browser}
        onChange={(value) => onTabChange(value)}
        variant="pills"
      >
        <Tabs.List grow justify="space-between" spacing={0} style={{ gap: 0 }}>
          <Tabs.Tab
            style={{ borderRight: borderColor() }}
            value="chrome"
            leftSection={<IconBrandChrome stroke={1.5} />}
            disabled={!feature.Chrome}
          ></Tabs.Tab>
          <Tabs.Tab
            style={{ borderRight: borderColor() }}
            value="firefox"
            leftSection={<IconBrandFirefox stroke={1.5} />}
            disabled={!feature.Firefox}
          ></Tabs.Tab>
          <Tabs.Tab
            style={{ borderRight: borderColor() }}
            value="edge"
            leftSection={<IconBrandEdge stroke={1.5} />}
            disabled={!feature.Edge}
          ></Tabs.Tab>
          <Tabs.Tab
            style={{ borderRight: borderColor() }}
            value="safari"
            leftSection={<IconBrandSafari stroke={1.5} />}
            disabled={!feature.Safari}
          ></Tabs.Tab>
          <Tabs.Tab
            value="polypane"
            leftSection={<IconBrandPolypane stroke={1.5} />}
            disabled={!feature.Polypane}
          ></Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Divider />
      {browser ? (
        children
      ) : (
        <>
          <SimpleGrid cols={{ base: 1, sm: 2 }} p="md">
            <Alert
              icon={<IconUsers />}
              title="Authors"
              styles={{
                body: { gap: 0 },
                icon: { marginTop: "5px" },
                title: {
                  fontSize: "var(--mantine-font-size-md)",
                },
                message: {
                  fontSize: "var(--mantine-font-size-md)",
                  marginTop: 0,
                },
              }}
            >
              {feature.Authors
                ? feature.Authors.map((author, idx) => (
                    <span key={author}>
                      <a href={`//twitter.com/${author}`} target="_blank">
                        {author}
                      </a>
                      {idx !== feature.Authors.length - 1 ? ", " : ""}
                    </span>
                  ))
                : ""}
            </Alert>
            <Alert
              icon={<IconClockHour3 />}
              title="Last Modified"
              styles={{
                body: { gap: 0 },
                icon: { marginTop: "5px" },
                title: {
                  fontSize: "var(--mantine-font-size-md)",
                },
                message: {
                  fontSize: "var(--mantine-font-size-md)",
                  marginTop: 0,
                },
              }}
            >
              {feature.LastModifiedTime}
            </Alert>
            <Alert
              icon={<IconNews />}
              title="Newsletter"
              styles={{
                body: { gap: 0 },
                icon: { marginTop: "5px" },
                title: {
                  fontSize: "var(--mantine-font-size-md)",
                },
                message: {
                  fontSize: "var(--mantine-font-size-md)",
                  marginTop: 0,
                },
              }}
            >
              {feature.Newsletter ? (
                <a
                  href={`https://canidevtools.substack.com/p/${feature.Newsletter}`}
                  target="_blank"
                >
                  {feature.Newsletter}
                </a>
              ) : (
                "-"
              )}
            </Alert>
            <Alert
              icon={<IconHash />}
              title="Tags"
              styles={{
                body: { gap: 0 },
                icon: { marginTop: "5px" },
                title: {
                  fontSize: "var(--mantine-font-size-md)",
                },
                message: {
                  fontSize: "var(--mantine-font-size-md)",
                },
              }}
            >
              {feature.Tags &&
                feature.Tags.map((tag, idx) => (
                  <>
                    <Link
                      href={{
                        pathname: "/",
                        query: { tag },
                      }}
                    >
                      {tag}
                    </Link>
                    {idx === feature.Tags.length - 1 ? "" : ", "}
                  </>
                ))}
            </Alert>
          </SimpleGrid>
          <Divider />
        </>
      )}
    </Paper>
  );
}
