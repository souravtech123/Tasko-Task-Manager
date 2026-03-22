
import { useState, useEffect } from "react";
import { Link } from "react-router";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
];

export default function TaskoNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .nav-link{
          position:relative;
          font-family:'DM Sans',sans-serif;
          font-size:0.9rem;
          font-weight:500;
          color:#a1a1aa;
          transition:color .2s ease;
        }

        .nav-link:hover{
          color:white;
        }

        .nav-link::after{
          content:'';
          position:absolute;
          bottom:-6px;
          left:0;
          width:0;
          height:2px;
          background:linear-gradient(90deg,#8b5cf6,#22d3ee);
          border-radius:20px;
          transition:width .25s ease;
        }

        .nav-link:hover::after{
          width:100%;
        }

        @keyframes menuFade {
          from{opacity:0; transform:translateY(-10px)}
          to{opacity:1; transform:translateY(0)}
        }

        .mobile-menu{
          animation:menuFade .25s ease forwards;
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-5">

          {/* NAVBAR */}
          <nav
            className={`
              flex items-center justify-between
              px-6 py-3.5 rounded-2xl
              transition-all duration-300
              ${
                scrolled
                  ? "bg-[#0d0d1a]/80 backdrop-blur-xl border border-white/10 shadow-xl"
                  : "bg-white/[0.03] backdrop-blur-md border border-white/[0.05]"
              }
            `}
          >

            {/* LOGO ICON ONLY */}
            <Link to="/" className="group flex items-center">

              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:scale-105 transition">

                {/* geometric logo */}
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M4 6h16M4 12h10M4 18h7"
                  />
                </svg>

                {/* glow */}
                <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition"></div>

              </div>

            </Link>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex items-center gap-8">

              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}

            </div>

            {/* ACTION BUTTONS */}
            <div className="hidden md:flex items-center gap-3">

                <>
                  <Link
                    to="/dashboard"
                    className="text-sm text-zinc-400 hover:text-white transition"
                  >
                    Profile
                  </Link>

                  <Link
                    to="/project"
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:scale-105 transition shadow-lg"
                  >
                    Projects
                  </Link>
                </>

            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden flex flex-col gap-1.5"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="w-5 h-[2px] bg-white"></span>
              <span className="w-5 h-[2px] bg-white"></span>
              <span className="w-5 h-[2px] bg-white"></span>
            </button>

          </nav>

          {/* MOBILE MENU */}
          {menuOpen && (
            <div className="md:hidden mt-2 mobile-menu">

              <div className="bg-[#0d0d1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">

                <div className="px-4 py-4 space-y-3">

                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="block text-sm text-zinc-400 hover:text-white transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}

                </div>

                <div className="border-t border-white/10 px-4 py-4 space-y-3">

                    <>
                      <Link
                        to="/dashboard"
                        className="block text-center py-2.5 rounded-xl text-sm text-zinc-300 border border-white/10"
                      >
                        Profile
                      </Link>

                      <Link
                        to="/project"
                        className="block text-center py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500"
                      >
                        Projects
                      </Link>
                    </>

                </div>

              </div>

            </div>
          )}

        </div>
      </header>
    </>
  );
}
