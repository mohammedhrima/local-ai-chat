import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { AuthUser } from "@/types";

export function useMe() {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: () =>
      apiFetch<{ user: AuthUser | null }>("/api/auth/me").then((r) => r.user),
  });
  return { user: query.data ?? null, isLoading: query.isLoading };
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { email: string; password: string }) =>
      apiFetch<{ user: AuthUser }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: ({ user }) => {
      qc.setQueryData(["me"], user);
      qc.invalidateQueries({ queryKey: ["chats"] });
    },
  });
}

export function useSignup() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { name: string; email: string; password: string }) =>
      apiFetch<{ user: AuthUser }>("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: ({ user }) => {
      qc.setQueryData(["me"], user);
      qc.invalidateQueries({ queryKey: ["chats"] });
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => apiFetch("/api/auth/logout", { method: "POST" }),
    onSuccess: () => {
      qc.setQueryData(["me"], null);
      qc.removeQueries({ queryKey: ["chats"] });
    },
  });
}
