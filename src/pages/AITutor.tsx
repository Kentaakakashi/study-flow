import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles, BookOpen, HelpCircle, CheckSquare, Calendar } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

const modes = [
  { icon: BookOpen, label: "Explain simply", prompt: "Explain this simply: " },
  { icon: HelpCircle, label: "Practice questions", prompt: "Give me practice questions about: " },
  { icon: CheckSquare, label: "Check my answer", prompt: "Check if my answer is correct: " },
  { icon: Calendar, label: "Study plan", prompt: "Make a study plan for: " },
];

const AITutor = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", text: "Hey! 👋 I'm your AI study buddy. Pick a mode below or just ask me anything about your subjects. I can explain concepts, create practice questions, check your answers, or help you make a study plan." },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const usageLeft = 8;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: "That's a great question! Here's how I'd break it down:\n\n**Key Concept:** The fundamental principle here involves understanding the relationship between variables. Think of it like building blocks — each concept builds on the previous one.\n\n**Steps:**\n1. Start with the basic definition\n2. Apply the formula\n3. Check your units\n4. Verify with a simple example\n\nWould you like me to go deeper into any of these steps? 🎯",
      };
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-120px)]">
      {/* Modes */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {modes.map((m) => (
          <button
            key={m.label}
            onClick={() => setInput(m.prompt)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 hover:bg-secondary/50 text-sm font-medium text-muted-foreground hover:text-foreground transition-all whitespace-nowrap flex-shrink-0"
          >
            <m.icon className="w-4 h-4 text-primary" />
            {m.label}
          </button>
        ))}
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i === messages.length - 1 ? 0.1 : 0 }}
            className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-md"
                : "glass-card rounded-bl-md"
            }`}>
              {msg.text}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><Bot className="w-4 h-4 text-primary" /></div>
            <div className="glass-card px-5 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="glass-card p-3 rounded-2xl">
        <div className="flex items-center justify-between mb-2 px-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-xs text-muted-foreground">{usageLeft} messages left today</span>
          </div>
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask me anything about your studies..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-secondary/30 border border-border/50 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button onClick={() => sendMessage(input)} disabled={!input.trim()} className="glow-button rounded-xl px-4 disabled:opacity-40 disabled:cursor-not-allowed">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
