import React, { useState } from "react";

const availableLanguages = ["English"];

const resources = {
  English:[
  { "type": "video", "title": "Mindful Breathing Exercise", "url": "https://www.youtube.com/embed/wfDTp2GogaQ" },
  { "type": "video", "title": "Mental Health Basics for Students", "url": "https://www.youtube.com/embed/DxIDKZHW3-E" },
  { "type": "video", "title": "Managing Stress in College", "url": "https://www.youtube.com/embed/l_9PchV6PIc" },
  { "type": "video", "title": "Campus Mental Wellness Guide", "url": "https://www.youtube.com/embed/YBqUjjkhBFo" },
  { "type": "video", "title": "How to Sleep Better", "url": "https://www.youtube.com/embed/t0kACis_dJE" },
  { "type": "video", "title": "Yoga for Mental Clarity", "url": "https://www.youtube.com/embed/YbNrI6Va-eo" },
  { "type": "video", "title": "Building Resilience", "url": "https://www.youtube.com/embed/VNCL1glwyOI" },
  { "type": "video", "title": "Meditation for Students", "url": "https://www.youtube.com/embed/inpok4MKVLM" },
  { "type": "video", "title": "Guided Meditation: Focus", "url": "https://www.youtube.com/embed/X3-gKPNyrTA" },
  { "type": "video", "title": "Stress Relief Using Mindfulness", "url": "https://www.youtube.com/embed/w6T02g5hnT4" },
  { "type": "video", "title": "Mindfulness for Sleep", "url": "https://www.youtube.com/embed/qzR62JJCMBQ" },
],
};

function ResourceHub() {
  const [lang, setLang] = useState("English");

  return (
    <div className="min-h-screen bg-blue-100 px-6 py-10 font-sans pt-[105px] ">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 select-none">
        📚 Localized Resource Hub
      </h2>

      {lang === "English" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {resources[lang].map((r, i) => (
            <div
              key={i}
              className="bg-transparent rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-12">
                <iframe
                  src={r.url}
                  title={r.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{r.title}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ul className="max-w-xl mx-auto text-center text-gray-800 text-lg space-y-4">
          {resources[lang].map((r, i) => (
            <li key={i}>
              {r.type === "audio" && (
                <a href={r.url} className="text-blue-600 hover:underline">
                  Listen: {r.title}
                </a>
              )}
              {r.type === "guide" && (
                <a href={r.url} className="text-blue-600 hover:underline">
                  Read: {r.title}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ResourceHub;
