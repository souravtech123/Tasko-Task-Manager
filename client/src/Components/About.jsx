export default function Features() {
  return (
    <section className="min-h-screen w-full bg-[#08080e] text-white">
      <div className="max-w-7xl mx-auto px-6 py-24">
        
        {/* HEADER */}
        <div className="mb-20 max-w-2xl">
          <p className="text-sm text-white/40 mb-4 tracking-wide">
            What you can do
          </p>

          <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
            Everything you need —
            <br />
            nothing you don’t.
          </h2>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          
          {/* FEATURE */}
          <div>
            <h3 className="text-lg font-medium mb-3">
              Project overview
            </h3>
            <p className="text-white/60 leading-relaxed">
              See your entire project at a glance.
              Progress, structure, and direction —
              without digging through layers.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">
              Team clarity
            </h3>
            <p className="text-white/60 leading-relaxed">
              Know who’s involved and why.
              Roles stay visible, collaboration stays simple.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">
              Calm progress tracking
            </h3>
            <p className="text-white/60 leading-relaxed">
              Progress is shown, not enforced.
              No pressure, no alarms — just awareness.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">
              Mobile-first by design
            </h3>
            <p className="text-white/60 leading-relaxed">
              Built for phones first.
              Desktop expands naturally —
              nothing breaks, nothing stretches.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">
              Visual focus
            </h3>
            <p className="text-white/60 leading-relaxed">
              Fewer controls.
              Clear surfaces.
              Interfaces that stay out of the way.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">
              Flexible by default
            </h3>
            <p className="text-white/60 leading-relaxed">
              No forced workflows.
              Use Tasko the way your project actually works.
            </p>
          </div>

        </div>

        {/* FOOTNOTE */}
        <div className="mt-24 max-w-xl">
          <p className="text-sm text-white/40">
            Tasko is designed to support thinking —
            not to replace it.
          </p>
        </div>
      </div>
    </section>
  );
}
