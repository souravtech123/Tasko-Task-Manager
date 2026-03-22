import { useState, useEffect } from "react";
import { Link } from "react-router";

const floatingCards = [
  {
    id: 1,
    title: "Product Launch",
    tag: "Design",
    tagColor: "bg-violet-500/20 text-violet-300",
    progress: 72,
    avatars: ["A", "K", "M"],
    due: "Mar 12",
    accent: "border-violet-500/30",
  },
  {
    id: 2,
    title: "API Integration",
    tag: "Dev",
    tagColor: "bg-cyan-500/20 text-cyan-300",
    progress: 45,
    avatars: ["J", "R"],
    due: "Mar 18",
    accent: "border-cyan-500/30",
  },
  {
    id: 3,
    title: "Go-to-Market",
    tag: "Strategy",
    tagColor: "bg-amber-500/20 text-amber-300",
    progress: 88,
    avatars: ["S", "L", "P", "D"],
    due: "Mar 9",
    accent: "border-amber-500/30",
  },
];

const statItems = [
  { value: "12k+", label: "Startups" },
  { value: "98%", label: "On-time delivery" },
  { value: "4.9★", label: "Rating" },
];

function ProjectCard({ card, style }) {
  return (
    <div
      className={`absolute backdrop-blur-xl bg-white/5 border ${card.accent} rounded-2xl p-4 w-56 shadow-2xl`}
      style={style}
    >
      <div className="flex justify-between mb-2">
        <span className={`text-[11px] px-2 py-0.5 rounded-full ${card.tagColor}`}>
          {card.tag}
        </span>
        <span className="text-[11px] text-zinc-500">{card.due}</span>
      </div>

      <p className="text-[13px] font-semibold text-white mb-2">
        {card.title}
      </p>

      <div className="mb-2">
        <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
          <span>Progress</span>
          <span>{card.progress}%</span>
        </div>

        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-cyan-400"
            style={{ width: `${card.progress}%` }}
          />
        </div>
      </div>

      <div className="flex">
        {card.avatars.map((a, i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-[10px] font-bold border border-white/10"
            style={{ marginLeft: i > 0 ? "-4px" : 0 }}
          >
            {a}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TaskoHero() {
  const [activeWord, setActiveWord] = useState(0);

  const words = ["Launch", "Build", "Scale", "Ship"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#080810] flex items-center overflow-hidden">

      {/* Glow background */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-6">

          {/* Badge */}
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[11px] text-zinc-300 w-fit">
            Version 4 — Free to start
          </div>

          {/* Heading */}
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
            The OS to
            <br />
            <span className="text-violet-400">{words[activeWord]}</span>
            <br />
            <span className="text-zinc-500">Your Startup.</span>
          </h1>

          {/* Description */}
          <p className="text-base text-zinc-400 max-w-md">
            Tasko brings your entire startup workflow into one place —
            sprints, roadmaps, team collaboration, and milestones.
          </p>

          {/* Medium Buttons */}
          <div className="flex gap-4">

            <Link
              to="/register"
              className="px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:scale-105 transition shadow-lg"
            >
              Start for free
            </Link>

            <a
              href="#features"
              className="px-8 py-4 rounded-xl text-base font-semibold text-zinc-300 border border-white/10 hover:bg-white/10 transition"
            >
              Watch demo
            </a>

          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-4 border-t border-white/10">

            {statItems.map((s, i) => (
              <div key={i}>
                <div className="text-xl font-bold text-white">{s.value}</div>
                <div className="text-[11px] text-zinc-500">{s.label}</div>
              </div>
            ))}

          </div>

        </div>

        {/* RIGHT SIDE FLOATING CARDS */}
        <div className="relative hidden lg:block h-[500px]">

          <ProjectCard
            card={floatingCards[0]}
            style={{ top: "0%", right: "0%" }}
          />

          <ProjectCard
            card={floatingCards[1]}
            style={{ bottom: "10%", right: "-10%" }}
          />

          <ProjectCard
            card={floatingCards[2]}
            style={{ bottom: "20%", left: "-10%" }}
          />

        </div>

      </div>

    </section>
  );
}