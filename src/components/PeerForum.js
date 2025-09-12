import React, { useState } from "react";

function PeerForum() {
  const [posts, setPosts] = useState([
    { author: "Volunteer", text: "Share your story or worries, it's safe here." },
  ]);
  const [input, setInput] = useState("");

  const submitPost = () => {
    if (input.trim() === "") return;
    setPosts([...posts, { author: "Student", text: input.trim() }]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-start px-4 py-10 font-sans pt-[105px]">
      <main className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-blue-900 text-center select-none">
          🤝 Peer Support Forum
        </h2>

        {/* Posts section */}
        <div
          className="flex-1 overflow-y-auto max-h-[400px] border border-blue-200 rounded-lg p-4 bg-blue-50 space-y-4"
          aria-label="Peer posts"
        >
          {posts.map((p, i) => (
            <article
              key={i}
              className={`p-4 rounded-lg shadow-sm ${
                p.author === "Volunteer" ? "bg-blue-100 border-l-4 border-blue-400" : "bg-white border border-gray-200"
              }`}
              tabIndex={0}
              aria-label={`${p.author} posted`}
            >
              <p className="mb-1 text-gray-800">{p.text}</p>
              <footer className="text-right text-xs font-semibold text-blue-700">
                — {p.author}
              </footer>
            </article>
          ))}
        </div>

        {/* Input section */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitPost();
          }}
          className="flex gap-3"
          aria-label="Post your message"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How are you feeling? Share anonymously."
            className="flex-1 px-4 py-3 rounded-xl border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-blue-400 text-gray-900 shadow-sm"
            aria-label="Message input"
            maxLength={280}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-offset-1 focus:ring-blue-400 transition"
            aria-label="Post anonymously"
          >
            Post
          </button>
        </form>
      </main>
    </div>
  );
}

export default PeerForum;
