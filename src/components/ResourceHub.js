import React, { useState } from "react";

const availableLanguages = ["English", "Hindi", "Tamil"];
const resources = {
  English: [{ type: "video", title: "Breathing Exercise", url: "#" }],
  Hindi: [{ type: "audio", title: "Relaxation (Hindi)", url: "#" }],
  Tamil: [{ type: "guide", title: "Student Guide (Tamil)", url: "#" }],
};

function ResourceHub() {
  const [lang, setLang] = useState("English");

  return (
    <section>
      <h2>Localized Resource Hub</h2>
      <select value={lang} onChange={(e) => setLang(e.target.value)}>
        {availableLanguages.map((l) => (
          <option key={l}>{l}</option>
        ))}
      </select>
      <ul>
        {resources[lang].map((r, i) => (
          <li key={i}>
            {r.type === "video" && <a href={r.url}>Watch: {r.title}</a>}
            {r.type === "audio" && <a href={r.url}>Listen: {r.title}</a>}
            {r.type === "guide" && <a href={r.url}>Read: {r.title}</a>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ResourceHub;
