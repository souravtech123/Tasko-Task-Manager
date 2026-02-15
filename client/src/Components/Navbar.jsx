import { useState } from "react";
import { NavLink } from "react-router";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* DESKTOP NAVBAR */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mt-4 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-xl shadow-sm">
            <div className="h-16 px-6 flex items-center justify-between">

              {/* BRAND */}
              <div className="text-lg font-semibold tracking-tight">
                Tasko<span className="text-blue-600">.v3</span>
              </div>

              {/* LINKS */}
              <nav className="flex items-center gap-10 text-sm text-gray-600">
                <a href="#features" className="hover:text-gray-900 transition">
                  Features
                </a>
                <a href="#projects" className="hover:text-gray-900 transition">
                  Projects
                </a>
                <a href="#pricing" className="hover:text-gray-900 transition">
                  Pricing
                </a>
              </nav>

              {/* ACTIONS */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    document
                      .getElementById("project-system")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-4 py-2 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  💡 Generate Idea
                </button>

                <NavLink
                  to="/project"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium shadow-md hover:shadow-lg hover:scale-[1.03] transition"
                >
                  Start Work
                </NavLink>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* MOBILE NAVBAR */}
      <div className="md:hidden bg-white/90 backdrop-blur-xl border-b border-gray-200">
        <div className="px-4 h-14 flex items-center justify-between">

          {/* BRAND */}
          <span className="font-semibold">
            Tasko<span className="text-blue-600">.v3</span>
          </span>

          {/* TOGGLE */}
          <button
            onClick={() => setOpen(!open)}
            className="text-sm text-gray-700 font-medium"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="px-4 pb-6 pt-4 space-y-4 text-sm text-gray-700">

            <a href="#features" className="block">
              Features
            </a>
            <a href="#projects" className="block">
              Projects
            </a>
            <a href="#pricing" className="block">
              Pricing
            </a>

            <NavLink to={'/idea'}
             
              className="w-full py-3 rounded-xl border border-gray-300 font-medium"
            >
              💡 Generate Idea
            </NavLink>

            <NavLink
              to="/project"
              onClick={() => setOpen(false)}
              className="block text-center w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md"
            >
              Start Work
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}
