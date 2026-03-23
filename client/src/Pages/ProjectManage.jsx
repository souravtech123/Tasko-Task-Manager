import { useState } from "react";
import { Link, useNavigate } from "react-router";

/* ─── SIMPLE ICONS ─── */
const Icon = {
  menu: "☰",
  close: "✕",
  plus: "+",
  rocket: "🚀",
};

/* ─── MAIN APP ─── */
export default function StartupManager() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [startups, setStartups] = useState([]);
  const [activeStartupId, setActiveStartupId] = useState(null);

  const [showStartupForm, setShowStartupForm] = useState(false);

  const [sf, setSf] = useState({
    name: "",
    problem: "",
    solution: "",
  });

  const activeStartup = startups.find(s => s.id === activeStartupId);

  const createStartup = () => {
    if (!sf.name) return;
    const id = crypto.randomUUID();
    setStartups(prev => [...prev, { id, ...sf }]);
    setActiveStartupId(id);
    setSf({ name: "", problem: "", solution: "" });
    setShowStartupForm(false);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-slate-50">

      {/* 🔥 MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between px-4 h-14 bg-white border-b">
        <h1 className="font-bold text-lg">Tasko</h1>
        <button onClick={() => setSidebarOpen(true)}>{Icon.menu}</button>
      </div>

      {/* 🔥 SIDEBAR */}
      <aside className={`
        fixed md:static top-0 left-0 z-50 h-full w-64 bg-white border-r
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:flex flex-col
      `}>

        {/* Mobile Close */}
        <div className="md:hidden flex justify-end p-3">
          <button onClick={() => setSidebarOpen(false)}>{Icon.close}</button>
        </div>

        <div className="p-4 space-y-4">

          <h2 className="text-xl font-bold">Tasko</h2>

          <button
            onClick={() => setShowStartupForm(true)}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg"
          >
            {Icon.plus} New Startup
          </button>

          <div>
            <p className="text-xs text-gray-400 mb-2">Workspaces</p>

            {startups.map(s => (
              <div
                key={s.id}
                onClick={() => {
                  setActiveStartupId(s.id);
                  setSidebarOpen(false);
                }}
                className={`p-2 rounded cursor-pointer ${
                  s.id === activeStartupId
                    ? "bg-indigo-100"
                    : "hover:bg-slate-100"
                }`}
              >
                {s.name}
              </div>
            ))}
          </div>

        </div>
      </aside>

      {/* 🔥 MAIN */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* DESKTOP TOP */}
        <div className="hidden md:flex items-center justify-between px-6 h-14 bg-white border-b">
          <h1 className="font-bold">Dashboard</h1>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">

          {!activeStartup ? (
            <div className="text-center mt-20">
              <h2 className="text-xl font-bold mb-2">Start Your Journey</h2>
              <button
                onClick={() => setShowStartupForm(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                {Icon.rocket} Create Startup
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-4">
                {activeStartup.name}
              </h2>

              {/* STATS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Stat title="Goals" value="0" />
                <Stat title="Tasks" value="0" />
                <Stat title="Done" value="0" />
                <Stat title="Progress" value="0%" />
              </div>

              {/* INFO */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card title="Problem" text={activeStartup.problem} />
                <Card title="Solution" text={activeStartup.solution} />
              </div>
            </>
          )}

        </div>
      </main>

      {/* 🔥 MODAL */}
      {showStartupForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-xl p-4 space-y-3">

            <h2 className="font-bold text-lg">Create Startup</h2>

            <input
              placeholder="Name"
              className="w-full border p-2 rounded"
              value={sf.name}
              onChange={e => setSf({ ...sf, name: e.target.value })}
            />

            <textarea
              placeholder="Problem"
              className="w-full border p-2 rounded"
              value={sf.problem}
              onChange={e => setSf({ ...sf, problem: e.target.value })}
            />

            <textarea
              placeholder="Solution"
              className="w-full border p-2 rounded"
              value={sf.solution}
              onChange={e => setSf({ ...sf, solution: e.target.value })}
            />

            <div className="flex gap-2">
              <button
                onClick={() => setShowStartupForm(false)}
                className="flex-1 border py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={createStartup}
                className="flex-1 bg-indigo-600 text-white py-2 rounded"
              >
                Create
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

/* ─── SMALL COMPONENTS ─── */

function Stat({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl border">
      <p className="text-xs text-gray-400">{title}</p>
      <h2 className="text-lg font-bold">{value}</h2>
    </div>
  );
}

function Card({ title, text }) {
  return (
    <div className="bg-white p-4 rounded-xl border">
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-500">
        {text || "Not defined"}
      </p>
    </div>
  );
}