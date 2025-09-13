import React, { useState, useEffect, useRef } from "react";

// Fade-in message animation
const fadeInStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(16px);}
    to   { opacity: 1; transform: translateY(0);}
  }
`;

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((msgs) => [
        ...msgs,
        {
          sender: "bot",
          text: "🌸 Stay calm, take a deep breath. Would you like me to guide you through some mindful breathing?",
        },
      ]);
    }, 1200);
  };

  useEffect(() => {
    setTimeout(() => {
      setMessages([
        {
          sender: "bot",
          text: "👋 Hello! I'm your mental health companion. How are you feeling today?",
        },
      ]);
    }, 800);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-blue-200 font-sans mt-[65px]">
      <style>{fadeInStyles}</style>
      <main className="relative w-full max-w-2xl flex flex-col h-[85vh] md:h-[80vh] rounded-2xl shadow-2xl border border-blue-100 overflow-hidden bg-blue-100">
        {/* Header */}
        <header className="flex items-center justify-center py-6 border-b border-blue-100 bg-blue-100">
          <h2 className="text-2xl font-semibold text-blue-900 tracking-tight select-none">
            🌼 AI Mental Health Chatbot
          </h2>
        </header>

        {/* Messages Area */}
        <section
          className="flex-1 overflow-y-auto p-5 bg-blue-300"
          aria-live="polite"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`my-3 flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              style={{ animation: "fadeIn 0.5s cubic-bezier(.61,.01,.47,1.49)" }}
            >
              <span
                className={`px-4 py-2 rounded-2xl max-w-[75%] text-base shadow 
                  ${m.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-lg rounded-tl-2xl"
                    : "bg-blue-100 text-blue-900 rounded-bl-lg rounded-tr-2xl"
                  }`}
                tabIndex={0}
                aria-label={m.sender === "user" ? "Your message" : "Bot message"}
              >
                {m.text}
              </span>
            </div>
          ))}
          {isTyping && (
            <div className="text-blue-500 italic text-sm mt-2 animate-pulse">Bot is typing…</div>
          )}
          <div ref={messagesEndRef} />
        </section>

        {/* Input Section */}
        <form
          className="flex items-center gap-2 p-4 bg-blue-100 border-t border-blue-100"
          onSubmit={e => { e.preventDefault(); sendMessage(); }}
          aria-label="Send a message"
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your concern or how you feel…"
            className="flex-1 px-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/70 text-gray-800 shadow-sm"
            autoComplete="off"
            aria-label="Type your concern"
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition"
            aria-label="Send message"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}

export default Chatbot;
