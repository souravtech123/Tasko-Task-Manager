import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
            T
          </div>
          <span className="text-xl font-extrabold text-gray-800">
            Tasko
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-5 font-semibold text-gray-700">
          {[
            { name: "Home", emoji: "🏠" },
            { name: "Projects", emoji: "📂" },
            { name: "Tasks", emoji: "✅" },
            { name: "Timeline", emoji: "⏳" },
           
          ].map((item) => (
            <li
              key={item.name}
              className="flex items-center gap-1 cursor-pointer hover:text-indigo-600 transition"
            >
              <span>{item.emoji}</span>
              {item.name}
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition">
            👤 Profile
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          😄
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white px-5 pb-5 space-y-3">
          {[
            "🏠 Home",
            "📂 Projects",
            "✅ Tasks",
            "⏳ Timeline",
            "📤 Submit",
            "👤 Profile",
          ].map((item) => (
            <p
              key={item}
              className="font-semibold text-gray-700 hover:text-indigo-600"
            >
              {item}
            </p>
          ))}
        </div>
      )}
    </nav>
  );
}
