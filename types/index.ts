export type Role = "user" | "assistant";

export interface ChatMessage {
  role: Role;
  content: string;
  createdAt?: string;
}

export interface Chat {
  _id: string;
  name: string;
  messages: ChatMessage[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}
