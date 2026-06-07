"use client";

import { useState } from "react";
import Link from "next/link";
import { MessagesSquare, Menu } from "lucide-react";
import { useChatUi } from "@/context/ChatUiContext";
import Sidebar from "@/components/chat/Sidebar";
import Message from "@/components/chat/Message";
import PromptBox from "@/components/chat/PromptBox";
import AuthModal from "@/components/chat/AuthModal";

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 text-center">
      <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand-500/10 text-brand-400">
        <MessagesSquare size={28} />
      </span>
      <h1 className="text-2xl font-semibold text-white">
        How can I help you today?
      </h1>
      <p className="mt-2 text-ink-400">
        Ask anything — your local AI model will answer.
      </p>
    </div>
  );
}

export default function ChatPage() {
  const { messages } = useChatUi();
  const [authOpen, setAuthOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSignIn = () => {
    setSidebarOpen(false);
    setAuthOpen(true);
  };

  return (
    <div className="flex h-screen bg-ink-950">
      <div className="hidden md:flex">
        <Sidebar onSignIn={openSignIn} />
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full">
            <Sidebar onSignIn={openSignIn} />
          </div>
        </div>
      )}

      <main className="flex flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-ink-800 px-4 py-3 md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-ink-300">
            <Menu size={20} />
          </button>
          <Link href="/" className="font-semibold text-white">
            Local AI Chat
          </Link>
        </header>

        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8">
              {messages.map((message, i) => (
                <Message key={i} message={message} />
              ))}
            </div>
          )}
        </div>

        <div className="px-4 pb-5">
          <PromptBox />
        </div>
      </main>

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </div>
  );
}
