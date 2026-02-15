import { NavLink } from "react-router";

export default function Hero() {

  const scrollToIdeaGenerator = () => {
    const target = document.getElementById("project-system");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#f8fafc] text-gray-900">

      {/* PREMIUM BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-blue-300/30 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] bg-indigo-300/30 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-[#f8fafc]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 flex flex-col lg:flex-row items-center gap-24">

        {/* LEFT */}
        <div className="flex-1 text-center lg:text-left">

          {/* VERSION BADGE */}
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm text-gray-600">
            ✨ Tasko v3 · AI-powered workspace
          </div>

          {/* HEADING */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
            Turn ideas into
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              real software projects
            </span>
          </h1>

          {/* SUBTEXT */}
          <p className="mt-6 max-w-xl text-base sm:text-lg text-gray-600 mx-auto lg:mx-0">
            Start working instantly or generate powerful project ideas with AI.
            Tasko v3 gives developers everything they need — from idea to execution.
          </p>

          {/* FEATURES */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
            <span className="chip">💡 Idea Generator</span>
            <span className="chip">📋 Task & Sprint Planning</span>
            <span className="chip">⭐ Performance Tracking</span>
          </div>

          {/* CTA BUTTONS */}
          <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">

            {/* PRIMARY */}
            <NavLink
              to="/project"
              className="inline-flex items-center justify-center px-9 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-xl hover:shadow-2xl hover:scale-[1.03] transition"
            >
              🚀 Start Work
            </NavLink>

            {/* SECONDARY */}
            <NavLink
              to={'/idea'}
              className="inline-flex items-center justify-center px-9 py-4 rounded-2xl bg-white border border-gray-300 text-gray-800 font-medium shadow-sm hover:bg-gray-50 hover:scale-[1.02] transition"
            >
              💡 Generate Idea
            </NavLink>

          </div>

          <p className="mt-6 text-xs text-gray-400">
            Trusted by students, developers & early-stage teams
          </p>
        </div>

        {/* RIGHT VISUAL */}
        <div className="flex-1 relative w-full max-w-md lg:max-w-lg">

          <div className="relative rounded-[30px] border border-gray-200 bg-white shadow-2xl p-6">

            {/* CARD HEADER */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-semibold text-gray-800">
                Project Idea Generator
              </span>
              <span className="text-xs font-medium text-indigo-600">
                ● Premium AI
              </span>
            </div>

            {/* IDEA CARDS */}
            <div className="space-y-4">
              <div className="idea-card active">
                <p className="text-sm font-medium">
                  🚀 AI Resume Analyzer
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Resume scoring, job matching & ATS insights
                </p>
              </div>

              <div className="idea-card">
                📊 College Project Management System
              </div>

              <div className="idea-card">
                🧠 Smart Learning Planner with AI
              </div>
            </div>
          </div>

          {/* GLOWS */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-300/40 rounded-full blur-[90px]" />
          <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-indigo-300/40 rounded-full blur-[90px]" />
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .chip {
          padding: 0.45rem 1rem;
          border-radius: 999px;
          background: white;
          border: 1px solid #e5e7eb;
          font-size: 0.85rem;
          color: #4b5563;
        }
        .idea-card {
          padding: 0.9rem 1rem;
          border-radius: 0.9rem;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          font-size: 0.9rem;
          color: #374151;
        }
        .idea-card.active {
          background: linear-gradient(to right, #eef2ff, #f5f3ff);
          border-color: #c7d2fe;
        }
      `}</style>
    </section>
  );
}
