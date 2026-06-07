import type { ChatMessage } from "@/types";

const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "granite3.1-dense:8b";

const SYSTEM_PROMPT =
  "You are Local AI Chat, a helpful and friendly AI assistant. " +
  "The full conversation so far is provided to you as prior messages — read it and use it to stay in context, " +
  "remembering details, names, and anything the user told you earlier in this conversation. " +
  "Never claim that you cannot recall earlier messages: they are available to you above. " +
  "Answer clearly and use Markdown (with fenced code blocks) when helpful.";

export async function* streamOllama(
  messages: ChatMessage[],
): AsyncGenerator<string> {
  const res = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      stream: true,
    }),
  });

  if (!res.ok || !res.body) {
    throw new Error(`Ollama request failed (${res.status})`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let newline: number;
    while ((newline = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, newline).trim();
      buffer = buffer.slice(newline + 1);
      if (!line) continue;
      try {
        const token = JSON.parse(line)?.message?.content;
        if (token) yield token;
      } catch {
        // ignore partial / non-JSON lines
      }
    }
  }
}
