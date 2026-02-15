export default function Features() {
  return (
    <section
      id="features"
      className="relative w-full bg-[#f8fafc] text-gray-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 py-28">

        {/* HEADER */}
        <div className="max-w-2xl mb-20">
          <p className="text-sm text-gray-500 mb-4 tracking-wide">
            Core features
          </p>

          <h2 className="text-3xl sm:text-4xl font-semibold leading-tight">
            Three features.
            <br />
            <span className="text-gray-500">
              Done exceptionally well.
            </span>
          </h2>
        </div>

        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* CARD 1 */}
          <div className="feature-pro group">
            <div className="icon-wrap bg-blue-100 text-blue-600">
              💡
            </div>

            <h3 className="title">
              Project Idea Generator
            </h3>

            <p className="desc">
              Generate practical, real-world project ideas tailored for
              students, developers, and startup builders.
            </p>

            <span className="cta">
              Try idea generator →
            </span>
          </div>

          {/* CARD 2 */}
          <div className="feature-pro group">
            <div className="icon-wrap bg-indigo-100 text-indigo-600">
              📋
            </div>

            <h3 className="title">
              Task & Sprint Management
            </h3>

            <p className="desc">
              Break ideas into actionable tasks.
              Plan sprints, track progress, and stay focused without pressure.
            </p>

            <span className="cta">
              Organize work →
            </span>
          </div>

          {/* CARD 3 */}
          <div className="feature-pro group">
            <div className="icon-wrap bg-emerald-100 text-emerald-600">
              ⭐
            </div>

            <h3 className="title">
              Team Performance Insights
            </h3>

            <p className="desc">
              Understand contribution, momentum, and delivery quality
              with simple, calm performance signals.
            </p>

            <span className="cta">
              View insights →
            </span>
          </div>

        </div>

        {/* FOOTNOTE */}
        <div className="mt-24 max-w-xl">
          <p className="text-sm text-gray-400">
            Tasko focuses on clarity over clutter —
            fewer features, better execution.
          </p>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .feature-pro {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 1.5rem;
          padding: 2.4rem 2rem;
          box-shadow: 0 10px 35px rgba(0,0,0,0.05);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: pointer;
        }

        .feature-pro:hover {
          transform: translateY(-6px);
          box-shadow: 0 25px 60px rgba(0,0,0,0.08);
        }

        .icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          margin-bottom: 1.2rem;
        }

        .title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.6rem;
          color: #111827;
        }

        .desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #6b7280;
        }

        .cta {
          display: inline-block;
          margin-top: 1.4rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: #2563eb;
          opacity: 0;
          transform: translateY(4px);
          transition: all 0.25s ease;
        }

        .feature-pro:hover .cta {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}
