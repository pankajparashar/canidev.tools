"use client";

import { Message, useAssistant } from "ai/react";

export default function Chat() {
    const { status, messages, input, submitMessage, handleInputChange } = useAssistant({ api: "/api/assistant" });

    return (
        <div>
            {messages.map((m: Message) => (
                <div key={m.id}>
                    <strong>{`${m.role}: `}</strong>
                    {m.role !== "data" && m.content}
                    {m.role === "data" && (
                        <>
                            {(m.data as any).description}
                            <br />
                            <pre className={"bg-gray-200"}>{JSON.stringify(m.data, null, 2)}</pre>
                        </>
                    )}
                </div>
            ))}

            {status === "in_progress" && <div />}

            <form onSubmit={submitMessage}>
                <input disabled={status !== "awaiting_message"} value={input} placeholder="What is the temperature in the living room?" onChange={handleInputChange} />
            </form>
        </div>
    );
}
