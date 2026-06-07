"use client";

import { LogOut, User } from "lucide-react";
import { useLogout, useMe } from "@/hooks/useAuth";
import { useChatUi } from "@/context/ChatUiContext";

export default function UserMenu() {
  const { user } = useMe();
  const logout = useLogout();
  const { newChat } = useChatUi();

  if (!user) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-ink-800 text-ink-300">
        <User size={16} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink-200">{user.name}</p>
        <p className="truncate text-xs text-ink-500">{user.email}</p>
      </div>
      <button
        onClick={() => logout.mutate(undefined, { onSuccess: newChat })}
        title="Sign out"
        className="text-ink-500 hover:text-white"
      >
        <LogOut size={16} />
      </button>
    </div>
  );
}
