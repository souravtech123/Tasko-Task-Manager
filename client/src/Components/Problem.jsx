
const problems = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4 7h16M4 12h10M4 17h7"/>
      </svg>
    ),
    accent: "from-violet-500 to-violet-700",
    glow: "rgba(139,92,246,0.18)",
    border: "hover:border-violet-500/40",
    tag: "Structure",
    title: "Ideas Without Structure",
    description:
      "Student founders often have strong ideas but no clear framework to turn them into real execution. Without structure, ideas stay unfinished.",
    stat: "73%",
    statLabel: "student startups never move past ideation",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 9h6M9 13h6M9 17h4"/>
      </svg>
    ),
    accent: "from-cyan-500 to-cyan-700",
    glow: "rgba(34,211,238,0.18)",
    border: "hover:border-cyan-500/40",
    tag: "Execution",
    title: "Chaotic Task Management",
    description:
      "Startup tasks quickly become messy without a system. Priorities blur, deadlines slip, and teams lose momentum.",
    stat: "68%",
    statLabel: "miss their first product milestone",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="3" strokeWidth="1.8"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M5.5 21a6.5 6.5 0 0113 0"/>
      </svg>
    ),
    accent: "from-amber-500 to-orange-600",
    glow: "rgba(251,191,36,0.18)",
    border: "hover:border-amber-500/40",
    tag: "Collaboration",
    title: "Broken Team Alignment",
    description:
      "Teams struggle to coordinate responsibilities and progress. Everyone works hard, but no one knows what others are shipping.",
    stat: "81%",
    statLabel: "fail due to team misalignment",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative bg-[#080810] overflow-hidden py-28 lg:py-36">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Sora:wght@600;700;800&display=swap');

        .headline-font { font-family: 'Sora', sans-serif; }
        .body-font { font-family: 'Inter', sans-serif; }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(30px); }
          to { opacity:1; transform:translateY(0); }
        }

        .card-hover{
          transition: all .35s ease;
        }

        .card-hover:hover{
          transform: translateY(-8px);
        }

      `}</style>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-violet-700/10 blur-[120px] rounded-full"/>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[260px] bg-cyan-600/10 blur-[100px] rounded-full"/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-20"
          style={{animation:"fadeUp .7s ease both"}}
        >

          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 body-font">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"/>
            <span className="text-xs text-zinc-400 tracking-widest uppercase">
              The Problem
            </span>
          </div>

          <h2 className="headline-font text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Startups Don't Fail From Ideas —
            <span className="block bg-gradient-to-r from-rose-400 to-orange-400 bg-clip-text text-transparent">
              They Fail From Execution.
            </span>
          </h2>

          <p className="body-font text-lg text-zinc-400 leading-relaxed">
            Thousands of students dream about building startups.  
            They have ideas, passion, and ambition — but most never start
            because they lack a clear system to manage tasks, teams, and
            progress.
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {problems.map((p,i)=>(
            <div
              key={i}
              className={`card-hover relative bg-white/[0.04] border border-white/[0.08] ${p.border} rounded-2xl p-7`}
              style={{boxShadow:"0 6px 40px rgba(0,0,0,0.45)"}}
            >

              {/* icon + tag */}
              <div className="flex items-center justify-between mb-6">

                <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${p.accent} text-white shadow-lg`}>
                  {p.icon}
                </div>

                <span className="body-font text-[11px] text-zinc-500 uppercase tracking-widest border border-white/10 rounded-full px-3 py-1">
                  {p.tag}
                </span>

              </div>

              <h3 className="headline-font text-lg text-white font-semibold mb-3">
                {p.title}
              </h3>

              <p className="body-font text-sm text-zinc-400 leading-relaxed mb-6">
                {p.description}
              </p>

              <div className="border-t border-white/10 pt-5">

                <div className="flex items-end gap-2">
                  <span className="headline-font text-3xl text-white font-bold">
                    {p.stat}
                  </span>
                  <span className="body-font text-xs text-zinc-500 mb-1">
                    {p.statLabel}
                  </span>
                </div>

                <div className="mt-3 h-[2px] bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${p.accent}`}
                    style={{width:p.stat}}
                  />
                </div>

              </div>

            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="text-center mt-16 body-font">
          <p className="text-sm text-zinc-500">
            Sound familiar?
            <a
              href="#features"
              className="text-violet-400 ml-2 hover:text-violet-300 transition"
            >
              See how Tasko fixes this →
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}

