import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMe } from "@/hooks/useAuth";
import { useCreateChat } from "@/hooks/useChats";
import { useChatUi } from "@/context/ChatUiContext";
import type { ChatMessage } from "@/types";

export function useSendMessage() {
  const { user } = useMe();
  const qc = useQueryClient();
  const createChat = useCreateChat();
  const { selectedChatId, selectedChatIdRef, setSelectedChatId, messages, setMessages, setIsStreaming } =
    useChatUi();

  return useMutation({
    mutationFn: async (prompt: string) => {
      let chatId = selectedChatId;
      if (user && !chatId) {
        const { chat } = await createChat.mutateAsync();
        chatId = chat._id;
        setSelectedChatId(chatId);
      }

      // The chat this stream belongs to; only update the UI while it stays open.
      const streamChatId = user ? chatId : null;
      const isActive = () => selectedChatIdRef.current === streamChatId;

      const conversation: ChatMessage[] = [...messages, { role: "user", content: prompt }];
      if (isActive()) setMessages([...conversation, { role: "assistant", content: "" }]);
      setIsStreaming(true);

      const res = await fetch("/api/chat/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: user ? chatId : undefined, messages: conversation }),
      });
      if (!res.body) throw new Error("No response stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        if (isActive()) setMessages([...conversation, { role: "assistant", content: answer }]);
      }
    },
    onSettled: () => {
      setIsStreaming(false);
      if (user) qc.invalidateQueries({ queryKey: ["chats"] });
    },
  });
}
