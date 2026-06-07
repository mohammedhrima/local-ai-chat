"use client";

import Link from "next/link";
import { LogIn, MessagesSquare, Plus } from "lucide-react";
import { useMe } from "@/hooks/useAuth";
import { useChats } from "@/hooks/useChats";
import { useChatUi } from "@/context/ChatUiContext";
import ChatLabel from "./ChatLabel";
import UserMenu from "./UserMenu";

export default function Sidebar({ onSignIn }: { onSignIn: () => void }) {
  const { user } = useMe();
  const { data: chats } = useChats();
  const { newChat } = useChatUi();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-ink-800 bg-ink-900">
      <Link
        href="/"
        className="flex items-center gap-2 px-4 py-4 text-white transition hover:opacity-80"
        title="Back to home"
      >
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500/15 text-brand-400">
          <MessagesSquare size={18} />
        </span>
        <span className="font-semibold">Local AI Chat</span>
      </Link>

      <div className="px-3">
        <button
          onClick={newChat}
          className="flex w-full items-center gap-2 rounded-xl border border-ink-800 bg-ink-850 px-3 py-2.5 text-sm font-medium text-ink-200 transition hover:bg-ink-800"
        >
          <Plus size={16} /> New chat
        </button>
      </div>

      <div className="mt-4 flex-1 overflow-y-auto px-3">
        {user ? (
          <>
            <p className="px-2.5 pb-1 text-xs uppercase tracking-wide text-ink-500">
              Recent
            </p>
            <div className="flex flex-col gap-0.5">
              {chats?.map((chat) => (
                <ChatLabel key={chat._id} chat={chat} />
              ))}
              {chats?.length === 0 && (
                <p className="px-2.5 py-2 text-sm text-ink-500">
                  No chats yet.
                </p>
              )}
            </div>
          </>
        ) : (
          <div className="rounded-xl border border-dashed border-ink-800 p-4 text-sm text-ink-400">
            Your chats aren&apos;t saved in guest mode.
            <button
              onClick={onSignIn}
              className="mt-2 flex items-center gap-1.5 font-medium text-brand-400 hover:text-brand-300"
            >
              <LogIn size={14} /> Sign in to save them
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-ink-800 p-3">
        {user ? (
          <UserMenu />
        ) : (
          <button
            onClick={onSignIn}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-ink-300 hover:bg-ink-850"
          >
            <LogIn size={16} /> Sign in
          </button>
        )}
      </div>
    </aside>
  );
}
