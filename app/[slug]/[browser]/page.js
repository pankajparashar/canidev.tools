"use client";

import { useContext } from "react";
import { marked } from "marked";

import {
  ActionIcon,
  Alert,
  Group,
  Badge,
  ScrollArea,
  Accordion,
  Box,
  Text,
  Divider,
  CopyButton,
  Tooltip
} from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import {
  IconShare,
  IconCopy,
  IconCode,
  IconBrandYoutube,
  IconNotes,
  IconCheck
} from "@tabler/icons-react";

import { DataContext } from "../../../components/data-provider";

export default function Page({ params }) {
  const { features } = useContext(DataContext);
  const feature = features.find((f) => f.Slug === params.slug);

  const name = params.browser.charAt(0).toUpperCase() + params.browser.slice(1);
  const browser = feature[name];

  return (
    <ScrollArea.Autosize mah={"100%"} type="never">
      <Accordion
        defaultValue={browser.Video ? "video" : "notes"}
        styles={{
          content: { padding: 0 },
        }}
      >
        <Accordion.Item value="video">
          <Accordion.Control
            icon={<IconBrandYoutube stroke={1} />}
            style={{ maxHeight: "45px" }}
          >
            <Group justify="space-between" pr="sm">
              <Text fw={700}>Video</Text>
              <ActionIcon
                variant={"subtle"}
                component="a"
                href={browser.Share}
                target="_blank"
                data-umami-event="share"
              >
                <IconShare size={20} stroke={1.5} />
              </ActionIcon>
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <Divider />
            <video
              controls
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              src={
                browser.Video
                  ? browser.Video + "#t=0.1"
                  : "https://placehold.co/1920x1080.mp4?font=roboto"
              }
            />
          </Accordion.Panel>
        </Accordion.Item>
        {feature.Category !== "Tricks" ? (
          <Accordion.Item value="notes">
            <Accordion.Control
              icon={<IconNotes stroke={1} className="t_r" />}
              style={{ maxHeight: "45px" }}
            >
              <Group justify="space-between" pr="sm">
                <Text fw={700}>Notes</Text>
                {browser.Version && (
                  <Badge
                    size={"lg"}
                    variant={"light"}
                    styles={{
                      label: { textTransform: "lowercase" },
                    }}
                  >
                    v{browser.Version}+
                  </Badge>
                )}
              </Group>
            </Accordion.Control>
            <Accordion.Panel maw={"750px"} pr="xs">
              <Box
                mt="lg"
                mb="lg"
                dangerouslySetInnerHTML={{
                  __html: browser?.Notes
                    ? marked.parse(
                        Array.isArray(browser.Notes)
                          ? browser.Notes.join("\n")
                          : browser.Notes
                      )
                    : "",
                }}
              />
              {browser.References ? (
                <>
                  <Text fw={700} ml="lg" mb="sm">
                    References:
                  </Text>
                  <Alert
                    variant={"subtle"}
                    p={0}
                    ml="xs"
                    mb="md"
                    styles={{
                      message: {
                        fontSize: "var(--mantine-font-size-md)",
                        wordBreak: "break-word",
                        marginTop: 0,
                      },
                    }}
                  >
                    <Box
                      id="references"
                      dangerouslySetInnerHTML={{
                        __html: browser.References
                          ? marked.parse(
                              Array.isArray(browser.References)
                                ? browser.References.join("\n")
                                : browser.References
                            )
                          : "",
                      }}
                    />
                  </Alert>
                </>
              ) : null}
            </Accordion.Panel>
          </Accordion.Item>
        ) : (
          <Accordion.Item value={"notes"}>
            <Accordion.Control
              icon={<IconCode stroke={1} />}
              style={{ maxHeight: "45px" }}
            >
              <Group justify="space-between" pr={"sm"}>
                <Text fw={700}>Code</Text>
                <CopyButton value={browser.Code} timeout={2000}>
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
                      <ActionIcon color={copied ? 'teal' : ''} variant="subtle" onClick={copy}>
                        {copied ? (
                          <IconCheck size={20} stroke={1.5} />
                        ) : (
                          <IconCopy size={20} stroke={1.5} />
                        )}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </Group>
            </Accordion.Control>
            <Accordion.Panel p={"md"}>
              <CodeHighlight
                withCopyButton={false}
                code={browser.Code}
                language="js"
              />
            </Accordion.Panel>
          </Accordion.Item>
        )}
      </Accordion>
    </ScrollArea.Autosize>
  );
}
