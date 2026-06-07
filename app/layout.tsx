import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/QueryProvider";
import { ChatUiProvider } from "@/context/ChatUiContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Local AI Chat",
  description:
    "Private, offline AI chat powered by Ollama — no API keys, your data stays local.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <QueryProvider>
          <ChatUiProvider>
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: "#0f172a",
                  color: "#e2e8f0",
                  border: "1px solid #1e293b",
                },
              }}
            />
          </ChatUiProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
