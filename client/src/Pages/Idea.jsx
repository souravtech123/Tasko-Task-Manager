import { useState, useRef, useEffect } from "react";
import { ideaDatabase } from "../Components/ideadb";

export default function ProjectIdeaGenerator() {
  const [domain, setDomain] = useState("");
  const [tech, setTech] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState(null);

  const resultRef = useRef(null);

  const answeredCount = [domain, tech, difficulty, goal].filter(Boolean).length;

  const generateIdea = () => {
    // 1️⃣ Exact match
    let idea = ideaDatabase.find(
      item =>
        item.questions.domain === domain &&
        item.questions.tech === tech &&
        item.questions.difficulty === difficulty &&
        item.questions.goal === goal
    );

    // 2️⃣ Partial match (same domain + goal)
    if (!idea) {
      const partialMatches = ideaDatabase.filter(
        item =>
          item.questions.domain === domain &&
          item.questions.goal === goal
      );

      if (partialMatches.length > 0) {
        idea = partialMatches[Math.floor(Math.random() * partialMatches.length)];
      }
    }

    // 3️⃣ Fallback: completely random idea
    if (!idea) {
      idea = ideaDatabase[Math.floor(Math.random() * ideaDatabase.length)];
    }

    setResult(idea.idea);
  };

  /* 🔥 AUTO SCROLL WHEN RESULT APPEARS */
  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [result]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Project Idea Generator
          </h1>
          <p className="text-gray-500 mt-1">
            Answer a few questions and get a project idea 🚀
          </p>
        </div>

        {/* Progress */}
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{answeredCount}/4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(answeredCount / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          <Question label="Domain" value={domain} onChange={setDomain}>
            <option value="">Choose domain</option>
            <option>Web Development</option>
            <option>AI</option>
            <option>App Development</option>
            <option>Data Science</option>
          </Question>

          <Question label="Technology" value={tech} onChange={setTech}>
            <option value="">Choose technology</option>
            <option>HTML, CSS, JavaScript</option>
            <option>React, JavaScript</option>
            <option>Python, ML</option>
            <option>Node.js</option>
          </Question>

          <Question label="Difficulty" value={difficulty} onChange={setDifficulty}>
            <option value="">Choose difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </Question>

          <Question label="Goal" value={goal} onChange={setGoal}>
            <option value="">Choose goal</option>
            <option>Learning</option>
            <option>Portfolio</option>
            <option>Startup</option>
          </Question>

          <button
            onClick={generateIdea}
            disabled={answeredCount < 4}
            className={`w-full py-3 rounded-full font-medium transition
              ${
                answeredCount < 4
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-[1.02]"
              }`}
          >
            Generate Idea
          </button>
        </div>

        {/* Result */}
        {result && (
          <div
            ref={resultRef}
            className="animate-fadeIn bg-gradient-to-br from-white to-blue-50 border border-blue-100 p-5 rounded-xl"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{result.title}</h2>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Idea Generated
              </span>
            </div>

            <p className="text-sm text-gray-600 mt-2">
              {result.description}
            </p>

            <ul className="mt-3 space-y-1 text-sm list-disc ml-5">
              {result.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Styles */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* 🔁 Reusable Question Card */
function Question({ label, value, onChange, children }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full p-2 rounded-lg border border-gray-300 bg-white"
      >
        {children}
      </select>
    </div>
  );
}
