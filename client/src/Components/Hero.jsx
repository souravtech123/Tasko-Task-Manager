export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#05050b] text-white">
      
      {/* BACKGROUND GRADIENTS */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/30 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* LEFT TEXT */}
        <div className="flex-1 text-center lg:text-left">
          
          {/* BADGE */}
          <p className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-white/15 text-sm text-white/70">
            ⚙️ Built for Development Teams
          </p>

          {/* HEADLINE */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
            Ship projects faster. <br />
            <span className="text-white/70">
              Without burnout or chaos.
            </span>
          </h1>

          {/* SUBTEXT */}
          <p className="mt-6 max-w-xl text-base sm:text-lg text-white/60 mx-auto lg:mx-0">
            Tasko helps developers plan sprints, track tasks, and deliver
            real-world software projects with clarity, structure, and flow.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="px-8 py-4 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition">
              Start a dev project
            </button>

            <button className="px-8 py-4 rounded-xl border border-white/20 text-white/80 hover:bg-white/5 transition">
              View workflow
            </button>
          </div>

          {/* TRUST LINE */}
          <p className="mt-6 text-xs text-white/40">
            Designed for web, app & software development teams
          </p>
        </div>

        {/* RIGHT VISUAL */}
        <div className="flex-1 relative w-full max-w-md lg:max-w-lg">
          <div className="relative rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl">
            
            {/* TOP BAR */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-white/70">
                Tasko · Sprint Board
              </span>
              <span className="text-xs text-emerald-400">
                ● Active Sprint
              </span>
            </div>

            {/* FAKE DEV TASKS */}
            <div className="space-y-4">
              <div className="h-10 rounded-xl bg-gradient-to-r from-indigo-500/40 to-purple-500/40" />
              <div className="h-10 rounded-xl bg-white/10" />
              <div className="h-10 rounded-xl bg-white/10" />
              <div className="h-10 rounded-xl bg-white/10" />
            </div>
          </div>

          {/* FLOATING GLOWS */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-[80px]" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/30 rounded-full blur-[80px]" />
        </div>
      </div>
    </section>
  );
}
