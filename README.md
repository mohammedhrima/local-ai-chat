# Local AI Chat 🤖

A private, self-hosted AI chat app. It talks to a **local LLM via Ollama** — no API keys, no third-party accounts, your data never leaves your machine. Chat instantly as a guest, or sign in to save your conversations.

Built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 · TanStack Query · MongoDB · Ollama**.

## Features

- **Local & private** — responses come from your own Ollama model; chats and accounts live in your own MongoDB.
- **Guest mode** — start chatting with no account. Guest conversations are kept in memory and cleared on refresh.
- **Saved history** — sign in (custom email/password JWT auth) to persist chats; rename and delete them.
- **Streaming replies** — token-by-token responses.
- **Markdown + code** — formatted answers with syntax-highlighted code blocks and copy buttons.

## Tech stack

| | |
|---|---|
| **Frontend** | Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · TanStack Query · react-hook-form + zod · lucide-react |
| **Backend** | Next.js route handlers · MongoDB (Mongoose) · custom JWT auth (`jose` + `bcryptjs`, httpOnly cookie) |
| **AI** | Ollama (local), streamed via the chat API |
| **Infra** | Docker Compose (MongoDB + Ollama) |

## Prerequisites

- [Node.js](https://nodejs.org) 18+
- [Docker](https://www.docker.com/) (runs MongoDB + Ollama)

## Getting started

### 1. Environment
```bash
cp .env.example .env
```
Then set a real `JWT_SECRET` (e.g. `openssl rand -hex 32`). Defaults:
```
MONGODB_URI=mongodb://localhost:27017/local-ai-chat
JWT_SECRET=...
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=granite3.1-dense:8b
```

### 2. Start MongoDB + Ollama
```bash
docker compose up -d
```
This runs MongoDB on `27017` and Ollama on `11434`. The Ollama container bind-mounts your host `~/.ollama`, so any model you've already pulled is reused.

Pull a model if you don't have one (set the same name in `OLLAMA_MODEL`):
```bash
docker exec local-ai-chat-ollama ollama pull granite3.1-dense:8b
```

### 3. Run the app
```bash
npm install
npm run dev          # http://localhost:3000
```

## How it works

- `app/api/auth/*` — signup / login / logout / me. Passwords hashed with bcrypt; a JWT is stored in an httpOnly cookie (`lib/auth.ts`).
- `app/api/chat/ai` — streams the Ollama response (`lib/ollama.ts`). For signed-in users it persists the turn to the chat; for guests it streams without saving.
- `app/api/chat/{get,create,rename,delete}` — chat CRUD, scoped to the current user.
- `hooks/*` — all data access via TanStack Query (`useAuth`, `useChats`, `useSendMessage`); components stay thin.
- `models/*` — Mongoose `User` and `Chat` schemas; `lib/db.ts` caches the connection.

## Project structure

```
app/            # routes + API (auth, chat) + landing (/) and chat (/chat)
components/     # landing/* and chat/* UI
hooks/          # TanStack Query data hooks
lib/            # db, auth (jwt/bcrypt), ollama, api fetch wrapper
models/         # Mongoose User + Chat
context/        # chat UI state (selected chat + guest messages)
providers/      # React Query provider
docker-compose.yml   # MongoDB + Ollama
```

## Scripts

```bash
npm run dev        # dev server (Turbopack)
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```
