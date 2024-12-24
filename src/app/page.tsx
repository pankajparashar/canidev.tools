"use client";

import { IconLoaderPinwheel } from "@/components/icon-pinwheel";
import {
	ActionIcon,
	Anchor,
	Box,
	Card,
	Collapse,
	Divider,
	Flex,
	Group,
	Loader,
	ScrollArea,
	SimpleGrid,
	Stack,
	Text,
	TextInput,
	Title,
	useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconCornerDownLeft, IconSelector } from "@tabler/icons-react";
import { Message, useAssistant } from "ai/react";
import * as _ from "lodash";
import { useSearchParams } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import { ReactTyped } from "react-typed";
import remarkGfm from "remark-gfm";
import { useScramble } from "use-scramble";

export default function Chat() {
	let theme = useMantineTheme();
	let isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

	let searchParams = useSearchParams();
	let randomIdx = React.useMemo(() => _.random(prompts.length - 1), []);
	let query = searchParams.get("q") || prompts[randomIdx];

	let [opened, { toggle, close }] = useDisclosure(true);
	let { status, messages, input, submitMessage, handleInputChange, append } =
		useAssistant({ api: "/api/assistant" });

	let viewport = React.useRef<HTMLDivElement>(null);
	let { ref: titleRef } = useScramble({
		text: "Devtools GPT",
		speed: isMobile ? 1 : 0.15,
		scramble: 0,
		overflow: false,
	});

	let scrollToBottom = () =>
		viewport.current!.scrollTo({
			top: viewport.current!.scrollHeight,
			behavior: "smooth",
		});

	React.useEffect(() => {
		if (isMobile) {
			close();
		}
	}, [isMobile]); // eslint-disable-line

	React.useEffect(() => {
		scrollToBottom();
	}, [messages]);

	React.useEffect(() => {
		if (query) {
			append({
				role: "user",
				content: query,
			});
		}
	}, [query]); // eslint-disable-line

	return (
		<SimpleGrid cols={{ base: 1, md: 2 }} w={"100%"} h={"100%"}>
			<Flex
				m={"auto"}
				w={"100%"}
				h={"100%"}
				maw={640}
				p={{ base: "sm", md: "xl" }}
				justify={"center"}
				align={"center"}
			>
				<form
					onSubmit={submitMessage}
					style={{ width: "100%" }}
					id="chat"
				>
					<Stack w={"100%"}>
						<Group justify="space-between">
							<Group gap={5}>
								<Anchor href="/">
									<IconLoaderPinwheel />
								</Anchor>
								<Title order={1} ref={titleRef} />
							</Group>
							<ActionIcon
								variant="subtle"
								color="gray"
								onClick={toggle}
							>
								<IconSelector />
							</ActionIcon>
						</Group>
						<ReactTyped
							strings={prompts}
							typeSpeed={40}
							backSpeed={50}
							attr="placeholder"
							loop
						>
							<TextInput
								suppressHydrationWarning
								size="lg"
								w={"100%"}
								autoComplete="off"
								disabled={status !== "awaiting_message"}
								value={input}
								placeholder={prompts[randomIdx]}
								onChange={handleInputChange}
								rightSection={
									status === "in_progress" ? (
										<Loader size={"sm"} />
									) : (
										<ActionIcon
											variant="subtle"
											onClick={() => {}}
										>
											<IconCornerDownLeft />
										</ActionIcon>
									)
								}
							/>
						</ReactTyped>
						<Collapse in={opened} component={Stack}>
							<Text size="md">
								Your personal AI assistant to answer devtools
								queries. It has the latest up-to-date knowledge
								about all major browsers like Chrome, Firefox,
								Edge, Safari and Polypane!
							</Text>
							<Group>
								<Anchor
									onClick={() => {
										append({
											role: "user",
											content:
												"Who created Devtools GPT?",
										});
									}}
								>
									About the project
								</Anchor>
								<Divider orientation="vertical" />
								<Anchor
									onClick={() => {
										append({
											role: "user",
											content:
												prompts[
													_.random(prompts.length - 1)
												],
										});
									}}
								>
									Randomize
								</Anchor>
							</Group>
							<Ad />
						</Collapse>
					</Stack>
				</form>
			</Flex>
			<Card
				h={"100%"}
				p={{ base: "xs", md: "xl" }}
				radius={"xs"}
				shadow="xl"
			>
				<ScrollArea
					className="flex-1"
					viewportRef={viewport}
					offsetScrollbars
				>
					{messages.map((m: Message, i: number) =>
						m.role === "user" ? (
							<UserMessage key={m.id} m={m} i={i} />
						) : (
							<AgentMessage key={m.id} m={m} />
						)
					)}
					{status === "in_progress" && <Loader type="dots" />}
				</ScrollArea>
			</Card>
		</SimpleGrid>
	);
}

let UserMessage = ({ m, i }: { m: Message; i: number }) => (
	<Box className={`sticky top-0 bg-white z-${i}`}>
		<Anchor href={`/?q=${m.content}`} target="_blank">
			<ReactMarkdown>{_.capitalize(m.content)}</ReactMarkdown>
		</Anchor>
	</Box>
);

let AgentMessage = ({ m }: { m: Message }) => (
	<ReactMarkdown remarkPlugins={[remarkGfm]}>{m.content}</ReactMarkdown>
);

let prompts = [
	"Explain devtools like I am five?",
	"How to open devtools?",
	"How to block network request?",
	"How to change devtools theme?",
	"How to use the 3D view tool in Edge",
];

let Ad = () => {
	const ref = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		ref.current!.innerHTML = "";
		const s = document.createElement("script");
		s.id = "_carbonads_js";
		s.src = `//cdn.carbonads.com/carbon.js?serve=CEAIVKJJ&placement=wwwcanidevtools`;
		ref.current!.appendChild(s);
	}, []); // eslint-disable-line

	return <div ref={ref} />;
};
