"use client";

import { useState } from "react";
import { Check, MessageSquare, Pencil, Trash2, X } from "lucide-react";
import type { Chat } from "@/types";
import { useDeleteChat, useRenameChat } from "@/hooks/useChats";
import { useChatUi } from "@/context/ChatUiContext";

export default function ChatLabel({ chat }: { chat: Chat }) {
  const { selectedChatId, openChat, newChat } = useChatUi();
  const rename = useRenameChat();
  const del = useDeleteChat();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(chat.name);

  const active = selectedChatId === chat._id;

  const save = () => {
    setEditing(false);
    if (name.trim() && name.trim() !== chat.name) {
      rename.mutate({ chatId: chat._id, name: name.trim() });
    }
  };

  const remove = () => {
    del.mutate(chat._id);
    if (active) newChat();
  };

  return (
    <div
      className={`group flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm ${
        active ? "bg-ink-800 text-white" : "text-ink-400 hover:bg-ink-850"
      }`}
    >
      <MessageSquare size={15} className="shrink-0" />
      {editing ? (
        <>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
            className="min-w-0 flex-1 bg-transparent outline-none"
          />
          <button onClick={save} className="hover:text-white">
            <Check size={14} />
          </button>
          <button
            onClick={() => {
              setEditing(false);
              setName(chat.name);
            }}
            className="hover:text-white"
          >
            <X size={14} />
          </button>
        </>
      ) : (
        <>
          <button onClick={() => openChat(chat)} className="min-w-0 flex-1 truncate text-left">
            {chat.name}
          </button>
          <button
            onClick={() => setEditing(true)}
            className="opacity-0 transition group-hover:opacity-100 hover:text-white"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={remove}
            className="opacity-0 transition group-hover:opacity-100 hover:text-red-400"
          >
            <Trash2 size={13} />
          </button>
        </>
      )}
    </div>
  );
}
