"use client";

import { useState, type ComponentPropsWithoutRef } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Bot, Check, Copy } from "lucide-react";
import type { ChatMessage } from "@/types";

function CodeBlock({ className, children }: ComponentPropsWithoutRef<"code">) {
  const match = /language-(\w+)/.exec(className ?? "");
  const code = String(children).replace(/\n$/, "");
  if (!match) return <code className={className}>{children}</code>;
  return (
    <SyntaxHighlighter language={match[1]} style={oneDark} PreTag="div">
      {code}
    </SyntaxHighlighter>
  );
}

export default function Message({ message }: { message: ChatMessage }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] whitespace-pre-wrap rounded-2xl bg-ink-800 px-4 py-3 text-ink-100">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-500/10 text-brand-400">
        <Bot size={18} />
      </div>
      <div className="markdown min-w-0 flex-1 text-ink-200">
        <Markdown components={{ code: CodeBlock }}>
          {message.content || "…"}
        </Markdown>
        {message.content && (
          <button
            onClick={copy}
            className="mt-1 inline-flex items-center gap-1 text-xs text-ink-500 hover:text-ink-300"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}{" "}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>
    </div>
  );
}
