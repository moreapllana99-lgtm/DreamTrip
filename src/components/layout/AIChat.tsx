"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";
import { getChatResponse } from "@/lib/ai";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "What should I pack?",
  "Find cheap restaurants.",
  "How much money should I bring?",
  "What scams should I avoid?",
  "What language do they speak?",
  "Is it safe to travel there?",
];

export default function AIChat() {
  const { isChatOpen, toggleChat, setChatOpen } = useStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! 👋 I'm your DreamTrip AI assistant. Ask me anything about travel planning, packing tips, budgeting, or destinations!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: msg };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const history = newMessages
        .filter((m) => m.id !== "welcome")
        .map((m) => ({ role: m.role, content: m.content }));
      const response = await getChatResponse(msg, history.slice(0, -1));
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: "Sorry, I encountered an error. Please try again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center group"
        aria-label="AI Assistant"
      >
        {isChatOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-indigo-600">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                AI
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">DreamTrip AI</h3>
                <p className="text-xs text-white/70">Travel Assistant</p>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="ml-auto p-1 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-br-md"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions (when no messages) */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="px-2.5 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about travel..."
                  className="flex-1 px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-gray-200"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
