"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { api } from "@/lib/api";


const SYSTEM_PROMPT = `You are EcoSpark AI, a helpful assistant for the EcoSpark Hub community portal — a platform where people share sustainability ideas to help the environment.

Your job is to:
1. Help members come up with sustainability idea topics to post (energy, waste, transportation, water, food, etc.)
2. Help them write problem statements, proposed solutions, and descriptions for their ideas
3. Suggest which category their idea fits into
4. Give constructive feedback on idea feasibility
5. Inspire people to think about environmental impact

Keep responses concise, friendly, and actionable. Use simple language. Always encourage the user to submit their idea on EcoSpark Hub.

Do NOT answer questions unrelated to sustainability, environment, or idea writing.`;

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "Suggest a sustainability idea for my neighborhood",
  "Help me write a problem statement about plastic waste",
  "What energy-saving ideas can I post?",
  "Is a rooftop solar project a good idea?",
  "Help me describe a composting initiative",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm EcoSpark AI 🌱 I can help you come up with sustainability ideas, write problem statements, proposed solutions, and more. What would you like help with today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

const sendMessage = async (text?: string) => {
  const userText = text || input.trim();
  if (!userText || loading) return;

  const userMsg: Message = { role: "user", content: userText };
  const updatedMessages = [...messages, userMsg];
  setMessages(updatedMessages);
  setInput("");
  setLoading(true);

  try {
    const res = await api.post("/ai/chat", {
      messages: updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: res.data.reply },
    ]);
  } catch {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "Something went wrong. Try again!" },
    ]);
  } finally {
    setLoading(false);
  }
};

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-green-50 pt-20 pb-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-700 rounded-full mb-4">
            <Sparkles className="w-7 h-7 text-green-200" />
          </div>
          <h1 className="text-3xl font-semibold text-green-900">EcoSpark AI</h1>
          <p className="text-gray-500 text-sm mt-2">
            Get help crafting your sustainability ideas
          </p>
        </div>

        {/* Chat window */}
        <div className="bg-white rounded-3xl border border-green-100 shadow-sm overflow-hidden flex flex-col h-[60vh]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "assistant"
                      ? "bg-green-700"
                      : "bg-green-100"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="w-4 h-4 text-white" />
                  ) : (
                    <User className="w-4 h-4 text-green-700" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "assistant"
                      ? "bg-green-50 text-green-900 rounded-tl-sm"
                      : "bg-green-700 text-white rounded-tr-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading */}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-green-50 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-green-600 animate-spin" />
                  <span className="text-sm text-green-600">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-green-100 p-4">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me about sustainability ideas..."
                rows={1}
                className="flex-1 px-4 py-2.5 border border-green-200 rounded-xl text-sm outline-none focus:border-green-400 resize-none"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="px-4 py-2.5 bg-green-700 text-white rounded-xl hover:bg-green-800 disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-6">
          <p className="text-xs text-gray-400 mb-3 text-center">Try asking:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1.5 bg-white border border-green-200 text-green-700 rounded-full hover:bg-green-50 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}