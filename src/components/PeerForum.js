import React, { useState } from "react";

function PeerForum() {
  const [posts, setPosts] = useState([
    { author: "Volunteer", text: "Share your story or worries, it's safe here." },
  ]);
  const [input, setInput] = useState("");

  const submitPost = () => {
    setPosts([...posts, { author: "Student", text: input }]);
    setInput("");
  };

  return (
    <section>
      <h2>Peer Support Forum</h2>
      <div>
        {posts.map((p, i) => (
          <div key={i}>
            <strong>{p.author}:</strong> {p.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="How are you feeling?"
      />
      <button onClick={submitPost}>Post Anonymously</button>
    </section>
  );
}

export default PeerForum;
