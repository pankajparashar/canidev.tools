"use client";

import {
	ActionIcon,
	Anchor,
	Box,
	Card,
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
} from "@mantine/core";
import { IconCornerDownLeft, IconWorld } from "@tabler/icons-react";
import { Message, useAssistant } from "ai/react";
import * as _ from "lodash";
import { useSearchParams } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import { ReactTyped } from "react-typed";
import remarkGfm from "remark-gfm";
import { useScramble } from "use-scramble";

export default function Chat() {
	const searchParams = useSearchParams();
	const query = searchParams.get("q") || "Explain devtools like I am five?";

	const {
		status,
		messages,
		input,
		submitMessage,
		handleInputChange,
		append,
	} = useAssistant({ api: "/api/assistant" });

	const viewport = React.useRef<HTMLDivElement>(null);
	// hook returns a ref
	const { ref } = useScramble({
		text: "Devtools GPT",
		speed: 0.25,
		scramble: 20,
	});

	const scrollToBottom = () =>
		viewport.current!.scrollTo({
			top: viewport.current!.scrollHeight,
			behavior: "smooth",
		});

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
						<Title order={1} ref={ref} />
						<ReactTyped
							strings={[
								"How to open devtools?",
								"How to block network request?",
								"How to change devtools theme?",
							]}
							typeSpeed={40}
							backSpeed={50}
							attr="placeholder"
							loop
						>
							<TextInput
								size="lg"
								w={"100%"}
								autoComplete="off"
								disabled={status !== "awaiting_message"}
								value={input}
								placeholder="How to use the 3D view tool in Edge"
								onChange={handleInputChange}
								leftSection={<IconWorld />}
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
						<Text size="md">
							Your personal AI assistant to answer devtools
							queries. It has the latest up-to-date knowledge
							about all major browsers like Chrome, Firefox, Edge,
							Safari and Polypane!
						</Text>
						<Group>
							<Anchor
								onClick={() => {
									append({
										role: "user",
										content: "Who created Devtools GPT?",
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
											"What is the source of your knowlegde?",
									});
								}}
							>
								Knowledge base
							</Anchor>
							<Divider orientation="vertical" />
							<Anchor href="">Share</Anchor>
						</Group>
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
