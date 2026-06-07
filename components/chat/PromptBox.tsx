"use client";

import { useState, type KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";
import { useSendMessage } from "@/hooks/useSendMessage";
import { useChatUi } from "@/context/ChatUiContext";

export default function PromptBox() {
  const [value, setValue] = useState("");
  const send = useSendMessage();
  const { isStreaming } = useChatUi();

  const submit = () => {
    const text = value.trim();
    if (!text || isStreaming) return;
    setValue("");
    send.mutate(text);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="flex items-end gap-2 rounded-2xl border border-ink-800 bg-ink-900 p-2.5 focus-within:border-brand-500/60">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          placeholder="Message Local AI Chat…"
          className="max-h-40 flex-1 resize-none bg-transparent px-2 py-1.5 text-ink-100 outline-none placeholder:text-ink-500"
        />
        <button
          onClick={submit}
          disabled={!value.trim() || isStreaming}
          className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-ink-950 transition enabled:hover:bg-brand-400 disabled:opacity-40"
        >
          <ArrowUp size={18} />
        </button>
      </div>
      <p className="mt-2 text-center text-xs text-ink-500">
        Responses come from your local Ollama model.
      </p>
    </div>
  );
}
