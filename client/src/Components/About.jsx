
const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M4 7h16M4 12h10M4 17h7"/>
      </svg>
    ),
    gradient: "from-violet-500 to-purple-600",
    glowColor: "rgba(139,92,246,0.2)",
    borderHover: "hover:border-violet-500/40",
    number: "01",
    title: "Startup Idea Board",
    description:
      "Capture ideas and transform them into structured startup concepts with built-in validation tools.",
    badge: "Ideation",
    badgeColor: "text-violet-400 bg-violet-500/10",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 9h6M9 13h6M9 17h4"/>
      </svg>
    ),
    gradient: "from-cyan-500 to-blue-600",
    glowColor: "rgba(34,211,238,0.18)",
    borderHover: "hover:border-cyan-500/40",
    number: "02",
    title: "Task & Sprint Management",
    description:
      "Plan sprints, manage backlogs, and keep execution focused with a clean kanban workflow.",
    badge: "Execution",
    badgeColor: "text-cyan-400 bg-cyan-500/10",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="3"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M5.5 21a6.5 6.5 0 0113 0"/>
      </svg>
    ),
    gradient: "from-emerald-500 to-teal-600",
    glowColor: "rgba(16,185,129,0.18)",
    borderHover: "hover:border-emerald-500/40",
    number: "03",
    title: "Team Collaboration",
    description:
      "Assign roles, comment on tasks, and stay aligned with real-time activity updates.",
    badge: "Teamwork",
    badgeColor: "text-emerald-400 bg-emerald-500/10",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 19v-6a2 2 0 00-2-2H5"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 19V9a2 2 0 012-2h2"/>
      </svg>
    ),
    gradient: "from-amber-500 to-orange-600",
    glowColor: "rgba(245,158,11,0.18)",
    borderHover: "hover:border-amber-500/40",
    number: "04",
    title: "Progress Dashboard",
    description:
      "Track milestones, velocity, and startup growth with a real-time visual dashboard.",
    badge: "Analytics",
    badgeColor: "text-amber-400 bg-amber-500/10",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 20l-5-2.5V6l5 2m0 12l6-3"/>
      </svg>
    ),
    gradient: "from-rose-500 to-pink-600",
    glowColor: "rgba(244,63,94,0.18)",
    borderHover: "hover:border-rose-500/40",
    number: "05",
    title: "Startup Roadmap",
    description:
      "Visualize your startup journey from idea to launch with an interactive roadmap.",
    badge: "Strategy",
    badgeColor: "text-rose-400 bg-rose-500/10",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    gradient: "from-indigo-500 to-violet-600",
    glowColor: "rgba(99,102,241,0.18)",
    borderHover: "hover:border-indigo-500/40",
    number: "06",
    title: "Founder Productivity",
    description:
      "Stay focused with goal tracking, focus sessions, and smart productivity tools.",
    badge: "Productivity",
    badgeColor: "text-indigo-400 bg-indigo-500/10",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative bg-[#080810] py-28 lg:py-36 overflow-hidden">

      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Sora:wght@600;700;800&display=swap');

      .headline{font-family:'Sora',sans-serif;}
      .body{font-family:'Inter',sans-serif;}

      .card{transition:all .35s ease}
      .card:hover{transform:translateY(-8px)}

      @keyframes fadeUp{
        from{opacity:0;transform:translateY(30px)}
        to{opacity:1;transform:translateY(0)}
      }
      `}</style>

      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-violet-600/10 blur-[120px] rounded-full"/>
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[280px] bg-cyan-600/10 blur-[110px] rounded-full"/>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20" style={{animation:"fadeUp .7s ease both"}}>

          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6 body">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full"/>
            <span className="text-xs text-zinc-400 uppercase tracking-widest">
              Platform Features
            </span>
          </div>

          <h2 className="headline text-4xl sm:text-5xl lg:text-6xl text-white font-extrabold leading-tight mb-5">
            Everything You Need To
            <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Build Your Startup
            </span>
          </h2>

          <p className="body text-lg text-zinc-400 leading-relaxed">
            Six powerful modules in one workspace designed for student founders.
          </p>

        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">

          {features.map((f,i)=>(
            <div
              key={i}
              className={`card relative bg-white/[0.04] border border-white/[0.08] ${f.borderHover} rounded-2xl p-6`}
              style={{boxShadow:"0 8px 40px rgba(0,0,0,.45)"}}
            >

              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white mb-4`}>
                {f.icon}
              </div>

              <h3 className="headline text-lg text-white font-semibold mb-2">
                {f.title}
              </h3>

              <p className="body text-sm text-zinc-400 leading-relaxed mb-4">
                {f.description}
              </p>

              <div className="flex items-center justify-between">

                <span className={`text-[11px] px-2.5 py-1 rounded-full ${f.badgeColor}`}>
                  {f.badge}
                </span>

                <span className="headline text-xs text-zinc-600">
                  {f.number}
                </span>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

