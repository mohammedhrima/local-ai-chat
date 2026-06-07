import { connectDB } from "@/lib/db";
import { Chat } from "@/models/Chat";
import { getCurrentUserId } from "@/lib/auth";
import { streamOllama } from "@/lib/ollama";
import type { ChatMessage } from "@/types";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  const { chatId, messages } = (await req.json()) as {
    chatId?: string;
    messages: ChatMessage[];
  };

  if (!messages?.length) {
    return new Response(JSON.stringify({ message: "messages required" }), {
      status: 400,
    });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let answer = "";
      try {
        for await (const token of streamOllama(messages)) {
          answer += token;
          controller.enqueue(encoder.encode(token));
        }
        if (userId && chatId) {
          await persistTurn(
            userId,
            chatId,
            messages[messages.length - 1],
            answer,
          );
        }
      } catch (error) {
        controller.enqueue(
          encoder.encode(`\n\n[error] ${(error as Error).message}`),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

async function persistTurn(
  userId: string,
  chatId: string,
  prompt: ChatMessage,
  answer: string,
) {
  await connectDB();
  const chat = await Chat.findOne({ _id: chatId, userId });
  if (!chat) return;
  chat.messages.push({
    role: "user",
    content: prompt.content,
    createdAt: new Date(),
  });
  chat.messages.push({
    role: "assistant",
    content: answer,
    createdAt: new Date(),
  });
  if (chat.name === "New Chat" && prompt.content) {
    chat.name = prompt.content.slice(0, 40);
  }
  await chat.save();
}
