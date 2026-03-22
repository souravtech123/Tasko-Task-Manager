
const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4 7h16M4 12h10M4 17h7"/>
      </svg>
    ),
    gradient: "from-violet-500 to-indigo-600",
    glow: "rgba(139,92,246,0.18)",
    border: "hover:border-violet-500/40",
    tag: "Ideation",
    title: "Startup Idea Workspace",
    description:
      "Capture ideas and convert them into a structured startup roadmap. Define vision, market, and milestones in one place.",
    bullets: [
      "Idea → roadmap builder",
      "Market validation tools",
      "Startup planning boards",
    ],
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
    gradient: "from-cyan-500 to-blue-600",
    glow: "rgba(34,211,238,0.18)",
    border: "hover:border-cyan-500/40",
    tag: "Execution",
    title: "Task & Progress System",
    description:
      "Organize tasks, sprints, and milestones clearly. Keep your team aligned and shipping consistently.",
    bullets: [
      "Kanban sprint boards",
      "Milestone tracking",
      "Smart priority system",
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="3" strokeWidth="1.8"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M5.5 21a6.5 6.5 0 0113 0"/>
      </svg>
    ),
    gradient: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.18)",
    border: "hover:border-emerald-500/40",
    tag: "Team",
    title: "Team Collaboration",
    description:
      "Collaborate with co-founders and teammates in real time. Assign roles, track activity, and stay aligned.",
    bullets: [
      "Role-based permissions",
      "Activity timeline",
      "Mentions & comments",
    ],
  },
];

export default function SolutionSection() {
  return (
    <section className="relative bg-[#080810] py-28 lg:py-36 overflow-hidden">

      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Sora:wght@600;700;800&display=swap');

      .headline-font{font-family:'Sora',sans-serif;}
      .body-font{font-family:'Inter',sans-serif;}

      @keyframes fadeUp{
        from{opacity:0;transform:translateY(30px)}
        to{opacity:1;transform:translateY(0)}
      }

      .card{
        transition:all .35s ease;
      }

      .card:hover{
        transform:translateY(-8px);
      }
      `}</style>

      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[320px] bg-violet-600/10 blur-[120px] rounded-full"/>
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[300px] bg-cyan-600/10 blur-[110px] rounded-full"/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-20"
          style={{animation:"fadeUp .7s ease both"}}
        >

          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 body-font">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"/>
            <span className="text-xs text-zinc-400 uppercase tracking-widest">
              The Solution
            </span>
          </div>

          <h2 className="headline-font text-4xl sm:text-5xl lg:text-6xl text-white font-extrabold leading-tight mb-6">
            The Startup System
            <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Built For Student Founders
            </span>
          </h2>

          <p className="body-font text-lg text-zinc-400 leading-relaxed">
            Tasko provides a single workspace where student founders can
            organize ideas, manage execution, and collaborate with their teams.
          </p>

        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {features.map((f,i)=>(
            <div
              key={i}
              className={`card relative bg-white/[0.04] border border-white/[0.08] ${f.border} rounded-2xl p-7`}
              style={{boxShadow:"0 8px 40px rgba(0,0,0,0.45)"}}
            >

              {/* icon + tag */}
              <div className="flex items-center justify-between mb-6">

                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white shadow-lg`}>
                  {f.icon}
                </div>

                <span className="body-font text-[11px] text-zinc-500 uppercase tracking-widest border border-white/10 rounded-full px-3 py-1">
                  {f.tag}
                </span>

              </div>

              <h3 className="headline-font text-xl font-semibold text-white mb-3">
                {f.title}
              </h3>

              <p className="body-font text-sm text-zinc-400 leading-relaxed mb-6">
                {f.description}
              </p>

              <ul className="space-y-2">
                {f.bullets.map((b,j)=>(
                  <li key={j} className="body-font text-sm text-zinc-300 flex items-center gap-2">

                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${f.gradient}`}></span>

                    {b}

                  </li>
                ))}
              </ul>

            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="text-center mt-20 body-font">

          <p className="text-zinc-500 mb-6">
            Start building your startup with the right system.
          </p>

          <a
            href="#signup"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:scale-105 transition"
          >
            Start for free
          </a>

        </div>

      </div>

    </section>
  );
}

