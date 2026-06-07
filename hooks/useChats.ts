import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { useMe } from "@/hooks/useAuth";
import type { Chat } from "@/types";

export function useChats() {
  const { user } = useMe();
  return useQuery({
    queryKey: ["chats"],
    queryFn: () =>
      apiFetch<{ chats: Chat[] }>("/api/chat/get").then((r) => r.chats),
    enabled: !!user,
  });
}

export function useCreateChat() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () =>
      apiFetch<{ chat: Chat }>("/api/chat/create", { method: "POST" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["chats"] }),
  });
}

export function useRenameChat() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { chatId: string; name: string }) =>
      apiFetch("/api/chat/rename", {
        method: "POST",
        body: JSON.stringify(vars),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["chats"] }),
  });
}

export function useDeleteChat() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (chatId: string) =>
      apiFetch("/api/chat/delete", {
        method: "POST",
        body: JSON.stringify({ chatId }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["chats"] }),
  });
}
