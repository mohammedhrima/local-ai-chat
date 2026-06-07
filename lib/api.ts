export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(path, {
    credentials: "include",
    headers: options.body
      ? { "Content-Type": "application/json", ...(options.headers ?? {}) }
      : options.headers,
    ...options,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { message?: string }).message ?? "Request failed");
  }
  return data as T;
}
