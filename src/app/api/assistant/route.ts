import { AssistantResponse } from "ai";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    // Parse the request body
    const input: {
        threadId: string | null;
        message: string;
    } = await req.json();

    // Create a thread if needed
    const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

    // Add a message to the thread
    const message = await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: input.message,
    });

    return AssistantResponse({ threadId, messageId: message.id }, async ({ forwardStream }) => {
        // Run the assistant on the thread
        const runStream = openai.beta.threads.runs.stream(threadId, {
            assistant_id: process.env.ASSISTANT_ID || "",
        });

        // forward run status would stream message deltas
        await forwardStream(runStream);
    });
}
