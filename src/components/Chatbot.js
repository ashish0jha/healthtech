import React, { useState } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages(msgs => [
        ...msgs,
        { sender: "bot", text: "Stay calm. Try guided breathing. Would you like more help?" }
      ]);
    }, 1000);
  };

  return (
    <section>
      <h2>AI Mental Health Chatbot</h2>
      <div>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.sender === "user" ? "right" : "left" }}>
            {m.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your concern..."
      />
      <button onClick={sendMessage}>Send</button>
    </section>
  );
}

export default Chatbot;
