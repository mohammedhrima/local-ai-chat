import Link from "next/link";
import { ArrowRight, Github, MessageSquareText } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center px-6 pt-28 pb-20 text-center">
      <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink-800 bg-ink-900 px-4 py-1.5 text-sm text-ink-400">
        <span className="h-2 w-2 rounded-full bg-brand-500" /> Runs fully
        offline with Ollama
      </span>
      <h1 className="bg-gradient-to-b from-white to-ink-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
        Local AI Chat
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-400">
        A private, self-hosted AI chat. No API keys, no account required — your
        conversations stay on your machine. Sign in to save them.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 font-semibold text-ink-950 transition hover:bg-brand-400"
        >
          <MessageSquareText size={18} /> Start chatting{" "}
          <ArrowRight size={16} />
        </Link>
        <a
          href="https://github.com/mohammedhrima/local-ai-chat"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-ink-800 bg-ink-900 px-6 py-3 font-semibold text-ink-300 transition hover:bg-ink-800"
        >
          <Github size={18} /> Source
        </a>
      </div>
    </section>
  );
}
