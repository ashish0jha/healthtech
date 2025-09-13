import { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";

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

  const ai = new GoogleGenAI({ apiKey: "AIzaSyDS2TifIu9wzURMeR_ig36hRcMDwBduJhk" });

  const sendMessage = async () => {
    if (!input.trim()) return;

    const query=`You are a compassionate and professional mental health companion. Your role is to provide empathetic, supportive, and clinically appropriate psychological help. Only respond with advice, coping strategies, calming techniques, and positive guidance related to mental well-being. 

    Do NOT provide medical diagnoses or emergency services. If the user indicates crisis or danger, gently suggest seeking immediate professional help. Keep responses concise, respectful, and focused on mental health support only.

    User input: ${input}";
    `;

    // Add user message first
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: query,
      });
      console.log(response.text);
      
      if (!response) {
        throw new Error(`API error: ${response?.statusText}`);
      }

      const data = response.output_text;

      const botReply = data || "Sorry, I couldn't process that."; 

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error contacting AI service. Please try again later." },
      ]);
      console.error("Gemini API error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    // Greet user on first load
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
      <main className="relative w-[90vw] h-[80vh] flex flex-col p-4 rounded-2xl shadow-2xl border border-blue-100 overflow-hidden bg-blue-200">
        <header className="flex items-center justify-center py-6 bg-blue-200">
          <h2 className="text-2xl font-semibold text-blue-900 tracking-tight select-none ">
            🌼 AI Mental Health Chatbot
          </h2>
        </header>

        <section5
          className="flex-1 overflow-y-auto mx-10 bg-blue-300 p-5 rounded-t-lg no-scrollbar"
          aria-live="polite"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`my-3 flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              style={{ animation: "fadeIn 0.5s cubic-bezier(.61,.01,.47,1.49)" }}
            >
              <span
                className={`px-2 py-2 rounded-2xl max-w-[75%] text-base shadow 
                  ${m.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-lg rounded-tl-2xl"
                    : "bg-blue-100 text-blue-900 rounded-bl-lg rounded-tr-2xl max-w-[95%] lg:max-w-[65%]"
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
        </section5>

        <form
          className="flex items-center gap-2 p-5 bg-blue-400 mx-10 rounded-b-lg"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          aria-label="Send a message"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
