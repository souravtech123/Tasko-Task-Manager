import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* DESKTOP BAR */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between text-white">
          
          {/* BRAND */}
          <div className="text-lg font-medium tracking-tight">
            Tasko
          </div>

          {/* LINKS */}
          <nav className="flex items-center gap-10 text-sm text-white/60">
            <a href="#about" className="hover:text-white transition">
              About
            </a>
            <a href="#features" className="hover:text-white transition">
              Features
            </a>
            <a href="#projects" className="hover:text-white transition">
              Projects
            </a>
          </nav>

          {/* ACTION */}
          <button className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition">
            Enter workspace
          </button>
        </div>
      </div>

      {/* MOBILE BAR */}
      <div className="md:hidden backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="px-4 h-14 flex items-center justify-between text-white">
          
          <span className="font-medium">Tasko</span>

          <button
            onClick={() => setOpen(!open)}
            className="text-white/80 text-sm"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="px-4 pb-6 pt-4 space-y-4 text-sm text-white/70">
            <a href="#about" className="block">
              About
            </a>
            <a href="#features" className="block">
              Features
            </a>
            <a href="#projects" className="block">
              Projects
            </a>

            <button className="mt-4 w-full py-3 rounded-xl bg-white text-black font-medium">
              Enter workspace
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
