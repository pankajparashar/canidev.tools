"use client";

import {
	Box,
	Card,
	Divider,
	ScrollArea,
	SimpleGrid,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import { IconCornerDownLeft, IconWorld } from "@tabler/icons-react";
import { Message, useAssistant } from "ai/react";
import { marked } from "marked";
import React from "react";
import { ReactTyped } from "react-typed";

export default function Chat() {
	const { status, messages, input, submitMessage, handleInputChange } =
		useAssistant({ api: "/api/assistant" });

	React.useEffect(() => {
		window.scrollTo(0, document.body.scrollHeight);
	}, [status, messages]);

	return (
		<SimpleGrid cols={{ base: 1, md: 2 }} p={"lg"}>
			<Card>
				<Text size="xl">
					<ReactTyped strings={[""]} typeSpeed={40} />
				</Text>
			</Card>
			<Card h={"100%"} component={Stack} gap={0}>
				<Stack className="flex-1" component={ScrollArea}>
					{messages.map((m: Message) => (
						<Box key={m.id}>
							<Stack key={m.id} p={"md"} gap={0}>
								<Text fw={"bold"}>{`${m.role}: `}</Text>
								<div
									dangerouslySetInnerHTML={{
										__html: marked.parse(m.content),
									}}
								/>
							</Stack>
							<Divider />
						</Box>
					))}
				</Stack>

				{status === "in_progress" && <div />}

				<Divider />

				<Stack p={"md"}>
					<form onSubmit={submitMessage}>
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
								autoComplete="off"
								variant="unstyled"
								disabled={status !== "awaiting_message"}
								value={input}
								placeholder="How to use the 3D view tool in Edge"
								onChange={handleInputChange}
								size={"md"}
								leftSection={<IconWorld />}
								rightSection={<IconCornerDownLeft />}
							/>
						</ReactTyped>
					</form>
				</Stack>
			</Card>
		</SimpleGrid>
	);
}
