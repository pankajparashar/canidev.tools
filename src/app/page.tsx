"use client";

import {
	Box,
	Card,
	Divider,
	ScrollArea,
	Stack,
	Text,
	TextInput,
} from "@mantine/core";
import { Message, useAssistant } from "ai/react";
import { marked } from "marked";
import React from "react";

export default function Chat() {
	const { status, messages, input, submitMessage, handleInputChange } =
		useAssistant({ api: "/api/assistant" });

	React.useEffect(() => {
		window.scrollTo(0, document.body.scrollHeight);
	}, [status, messages]);

	return (
		<Card maw={640} m={"auto"} h={"100%"} component={Stack} gap={0}>
			<Stack className="flex-1" component={ScrollArea}>
				{messages.map((m: Message) => (
					<Box key={m.id}>
						<Stack key={m.id} p={"md"} gap={0}>
							<Text fw={"bold"}>{`${m.role}: `}</Text>
							<Text
								dangerouslySetInnerHTML={{
									__html: marked.parse(m.content),
								}}
							></Text>
						</Stack>
						<Divider />
					</Box>
				))}
			</Stack>

			{status === "in_progress" && <div />}

			<Divider />

			<Stack p={"md"}>
				<form onSubmit={submitMessage}>
					<TextInput
						variant="unstyled"
						disabled={status !== "awaiting_message"}
						value={input}
						placeholder="What is the temperature in the living room?"
						onChange={handleInputChange}
						fs={"md"}
					/>
				</form>
			</Stack>
		</Card>
	);
}
