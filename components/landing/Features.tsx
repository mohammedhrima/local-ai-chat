import { Code2, KeyRound, type LucideIcon, MessageSquare, Save, ShieldCheck, Zap } from "lucide-react";

const FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: KeyRound, title: "No API keys", desc: "Talk to a local LLM through Ollama — nothing to sign up for, nothing to pay." },
  { icon: ShieldCheck, title: "Your data stays local", desc: "Accounts and chats live in your own MongoDB. Nothing leaves your machine." },
  { icon: Zap, title: "Streaming replies", desc: "Token-by-token responses for a fast, fluid conversation." },
  { icon: MessageSquare, title: "Guest mode", desc: "Start chatting instantly with no account. Guest chats clear on refresh." },
  { icon: Save, title: "Saved history", desc: "Sign in to keep your chats — rename and revisit them anytime." },
  { icon: Code2, title: "Markdown + code", desc: "Rich formatting with syntax-highlighted code blocks and copy buttons." },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-2xl border border-ink-800 bg-ink-900 p-6">
            <div className="mb-4 inline-flex rounded-xl bg-brand-500/10 p-3 text-brand-400">
              <Icon size={22} />
            </div>
            <h3 className="mb-1.5 font-semibold text-white">{title}</h3>
            <p className="text-sm text-ink-400">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
