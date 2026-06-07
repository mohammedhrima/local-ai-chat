"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type Dispatch,
  type RefObject,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { Chat, ChatMessage } from "@/types";

interface ChatUiValue {
  selectedChatId: string | null;
  selectedChatIdRef: RefObject<string | null>;
  setSelectedChatId: (id: string | null) => void;
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  isStreaming: boolean;
  setIsStreaming: (value: boolean) => void;
  openChat: (chat: Chat) => void;
  newChat: () => void;
}

const ChatUiContext = createContext<ChatUiValue | null>(null);

export function ChatUiProvider({ children }: { children: ReactNode }) {
  const [selectedChatId, setSelectedChatIdState] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const selectedChatIdRef = useRef<string | null>(null);

  const setSelectedChatId = (id: string | null) => {
    selectedChatIdRef.current = id;
    setSelectedChatIdState(id);
  };

  const openChat = (chat: Chat) => {
    setSelectedChatId(chat._id);
    setMessages(chat.messages ?? []);
  };

  const newChat = () => {
    setSelectedChatId(null);
    setMessages([]);
  };

  return (
    <ChatUiContext.Provider
      value={{
        selectedChatId,
        selectedChatIdRef,
        setSelectedChatId,
        messages,
        setMessages,
        isStreaming,
        setIsStreaming,
        openChat,
        newChat,
      }}
    >
      {children}
    </ChatUiContext.Provider>
  );
}

export function useChatUi() {
  const ctx = useContext(ChatUiContext);
  if (!ctx) throw new Error("useChatUi must be used within ChatUiProvider");
  return ctx;
}
