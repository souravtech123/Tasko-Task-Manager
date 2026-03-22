import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { logout as logoutApi } from "../api/auth";

/* ─── Storage Helpers (using in-memory state, no localStorage) ─── */
let _store = { startups: [], goals: [], tasks: [], notes: [] };

/* ─── Icons ─── */
const Icon = {
  rocket: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  plus:   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>,
  check:  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>,
  target: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth={2}/><circle cx="12" cy="12" r="4" strokeWidth={2}/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>,
  task:   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>,
  trash:  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>,
  note:   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>,
  team:   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  star:   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  close:  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>,
  chevron:<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>,
  eye:    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>,
  flag:   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 2H21l-3 6 3 6H9.5l-1-2H5a2 2 0 00-2 2z"/></svg>,
};

const PRIORITY_CONFIG = {
  high:   { label: "High",   color: "text-rose-400",   bg: "bg-rose-500/15",   border: "border-rose-500/30"   },
  medium: { label: "Medium", color: "text-amber-400",  bg: "bg-amber-500/15",  border: "border-amber-500/30"  },
  low:    { label: "Low",    color: "text-emerald-400", bg: "bg-emerald-500/15",border: "border-emerald-500/30"},
};

const STATUS_CONFIG = {
  planning:   { label: "Planning",    color: "text-zinc-400",   bg: "bg-zinc-700/50",       dot: "bg-zinc-400"   },
  active:     { label: "Active",      color: "text-cyan-400",   bg: "bg-cyan-500/15",       dot: "bg-cyan-400"   },
  building:   { label: "Building",    color: "text-violet-400", bg: "bg-violet-500/15",     dot: "bg-violet-400" },
  launched:   { label: "Launched 🚀", color: "text-emerald-400",bg: "bg-emerald-500/15",    dot: "bg-emerald-400"},
};

/* ─── Avatar ─── */
const Avatar = ({ name, size = "sm" }) => {
  const colors = ["from-violet-500 to-purple-600","from-cyan-500 to-blue-600","from-emerald-500 to-teal-600","from-amber-500 to-orange-600","from-rose-500 to-pink-600","from-indigo-500 to-violet-600"];
  const idx = name ? name.charCodeAt(0) % colors.length : 0;
  const sz = size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm";
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br ${colors[idx]} flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {name ? name[0].toUpperCase() : "?"}
    </div>
  );
};

/* ─── Input ─── */
const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.07] transition-all duration-200 ${className}`}
  />
);

/* ─── Select ─── */
const Select = ({ className = "", children, ...props }) => (
  <select
    {...props}
    className={`w-full bg-[#111122] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-violet-500/60 transition-all duration-200 ${className}`}
  >
    {children}
  </select>
);

/* ─── Textarea ─── */
const Textarea = ({ className = "", ...props }) => (
  <textarea
    {...props}
    rows={3}
    className={`w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-violet-500/60 focus:bg-white/[0.07] transition-all duration-200 resize-none ${className}`}
  />
);

/* ─── Button ─── */
const Btn = ({ variant = "primary", className = "", children, ...props }) => {
  const styles = {
    primary: "relative overflow-hidden bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:scale-[1.02] active:scale-[0.98]",
    ghost:   "bg-white/[0.04] border border-white/10 text-zinc-300 hover:bg-white/[0.08] hover:border-white/20 hover:text-white active:scale-[0.98]",
    danger:  "bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500/25 active:scale-[0.98]",
  };
  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

/* ─── Card ─── */
const Card = ({ className = "", children, onClick, glow }) => (
  <div
    onClick={onClick}
    className={`relative bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden transition-all duration-300 ${onClick ? "cursor-pointer hover:border-white/15 hover:bg-white/[0.05]" : ""} ${className}`}
    style={glow ? { boxShadow: `0 0 32px ${glow}` } : undefined}
  >
    {children}
  </div>
);

/* ─── Section Header ─── */
const SectionHeader = ({ icon, title, count, action }) => (
  <div className="flex items-center justify-between mb-5">
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-400">
        {icon}
      </div>
      <h2 className="text-base font-bold text-white" style={{ fontFamily: "'Syne',sans-serif" }}>{title}</h2>
      {count !== undefined && (
        <span className="text-xs text-zinc-600 bg-white/[0.05] border border-white/[0.07] rounded-full px-2 py-0.5">{count}</span>
      )}
    </div>
    {action}
  </div>
);

/* ════════════════════════════════════════════════════
   MAIN APP
════════════════════════════════════════════════════ */
export default function StartupManager() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logoutApi();
    logout();
    navigate("/");
  };

  /* ─── State ─── */
  const [startups, setStartups]           = useState([]);
  const [goals, setGoals]                 = useState([]);
  const [tasks, setTasks]                 = useState([]);
  const [notes, setNotes]                 = useState([]);

  const [activeStartupId, setActiveStartupId] = useState(null);
  const [selectedGoalId,  setSelectedGoalId]  = useState(null);
  const [activeTab, setActiveTab]             = useState("overview"); // overview | goals | tasks | notes | team

  /* ─── Modals ─── */
  const [showStartupForm, setShowStartupForm] = useState(false);
  const [showGoalForm,    setShowGoalForm]    = useState(false);
  const [showTaskForm,    setShowTaskForm]    = useState(false);
  const [showNoteForm,    setShowNoteForm]    = useState(false);

  /* ─── Forms ─── */
  const [sf, setSf] = useState({ name:"", problem:"", solution:"", users:"", founder:"", coFounder:"", status:"planning", stage:"idea" });
  const [gf, setGf] = useState({ title:"", days:"", priority:"medium", description:"" });
  const [tf, setTf] = useState({ title:"", assignedTo:"", priority:"medium", dueDate:"", goalId:"" });
  const [nf, setNf] = useState({ title:"", body:"", tag:"general" });

  /* ─── Computed ─── */
  const activeStartup  = startups.find(s => s.id === activeStartupId);
  const startupGoals   = goals.filter(g => g.startupId === activeStartupId);
  const startupTasks   = tasks.filter(t => startupGoals.some(g => g.id === t.goalId));
  const goalTasks      = tasks.filter(t => t.goalId === selectedGoalId);
  const startupNotes   = notes.filter(n => n.startupId === activeStartupId);

  const completedTasks = startupTasks.filter(t => t.done).length;
  const progress       = startupTasks.length ? Math.round((completedTasks / startupTasks.length) * 100) : 0;

  /* ─── CRUD: Startup ─── */
  const createStartup = () => {
    if (!sf.name || !sf.problem || !sf.solution) return;
    const id = crypto.randomUUID();
    const next = [...startups, { id, ...sf, createdAt: Date.now() }];
    setStartups(next);
    setActiveStartupId(id);
    setActiveTab("overview");
    setSf({ name:"", problem:"", solution:"", users:"", founder:"", coFounder:"", status:"planning", stage:"idea" });
    setShowStartupForm(false);
  };

  const deleteStartup = (id, e) => {
    e.stopPropagation();
    setStartups(prev => prev.filter(s => s.id !== id));
    if (activeStartupId === id) { setActiveStartupId(null); setSelectedGoalId(null); }
  };

  const updateStartupStatus = (id, status) => {
    setStartups(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  /* ─── CRUD: Goal ─── */
  const createGoal = () => {
    if (!gf.title || !gf.days || !activeStartup) return;
    setGoals(prev => [...prev, { id: crypto.randomUUID(), startupId: activeStartupId, ...gf, createdAt: Date.now() }]);
    setGf({ title:"", days:"", priority:"medium", description:"" });
    setShowGoalForm(false);
  };

  const deleteGoal = (id, e) => {
    e.stopPropagation();
    setGoals(prev => prev.filter(g => g.id !== id));
    setTasks(prev => prev.filter(t => t.goalId !== id));
    if (selectedGoalId === id) setSelectedGoalId(null);
  };

  /* ─── CRUD: Task ─── */
  const createTask = () => {
    const gid = tf.goalId || selectedGoalId;
    if (!tf.title || !tf.assignedTo || !gid) return;
    setTasks(prev => [...prev, { id: crypto.randomUUID(), goalId: gid, ...tf, goalId: gid, done: false, createdAt: Date.now() }]);
    setTf({ title:"", assignedTo:"", priority:"medium", dueDate:"", goalId:"" });
    setShowTaskForm(false);
  };

  const toggleTask  = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteTask  = (id, e) => { e.stopPropagation(); setTasks(prev => prev.filter(t => t.id !== id)); };

  /* ─── CRUD: Note ─── */
  const createNote = () => {
    if (!nf.title || !nf.body || !activeStartup) return;
    setNotes(prev => [...prev, { id: crypto.randomUUID(), startupId: activeStartupId, ...nf, createdAt: Date.now() }]);
    setNf({ title:"", body:"", tag:"general" });
    setShowNoteForm(false);
  };
  const deleteNote = (id) => setNotes(prev => prev.filter(n => n.id !== id));

  const NOTE_TAGS = {
    general:  { color:"text-zinc-400",   bg:"bg-zinc-700/50" },
    idea:     { color:"text-violet-400", bg:"bg-violet-500/15" },
    risk:     { color:"text-rose-400",   bg:"bg-rose-500/15" },
    investor: { color:"text-amber-400",  bg:"bg-amber-500/15" },
    market:   { color:"text-cyan-400",   bg:"bg-cyan-500/15" },
  };

  /* ─── Tabs ─── */
  const TABS = [
    { id:"overview", label:"Overview",  icon: Icon.eye    },
    { id:"goals",    label:"Goals",     icon: Icon.target },
    { id:"tasks",    label:"Tasks",     icon: Icon.task   },
    { id:"notes",    label:"Notes",     icon: Icon.note   },
    { id:"team",     label:"Team",      icon: Icon.team   },
  ];

  /* ─────────────────────────── RENDER ─────────────────────────── */
  return (
    <div className="min-h-screen bg-[#080810] text-zinc-200" style={{ fontFamily:"'DM Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        @keyframes fadeUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn  { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
        @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes modalIn  { from{opacity:0;transform:scale(.96) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(1.8);opacity:0} }

        .fade-up   { animation: fadeUp  .4s cubic-bezier(.22,.61,.36,1) both; }
        .slide-in  { animation: slideIn .35s cubic-bezier(.22,.61,.36,1) both; }
        .modal-in  { animation: modalIn .3s cubic-bezier(.22,.61,.36,1) both; }

        .logo-shimmer {
          background: linear-gradient(90deg,#c4b5fd,#67e8f9,#c4b5fd);
          background-size:200% auto;
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
          animation: shimmer 4s linear infinite;
        }
        .progress-bar { transition: width 1s cubic-bezier(.22,.61,.36,1); }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(255,255,255,.1); border-radius:99px; }

        .tab-active {
          background: linear-gradient(135deg,rgba(139,92,246,.2),rgba(34,211,238,.1));
          border-color: rgba(139,92,246,.4);
          color: white;
        }
      `}</style>

      {/* ── Background ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage:"linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)", backgroundSize:"40px 40px" }} />
        <div className="absolute top-0 left-1/3 w-[600px] h-[300px] bg-violet-700/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-cyan-600/8 blur-[100px] rounded-full" />
      </div>

      {/* ══════════════ LAYOUT ══════════════ */}
      <div className="relative z-10 flex h-screen overflow-hidden">

        {/* ── SIDEBAR ── */}
        <aside className="w-64 flex-shrink-0 flex flex-col border-r border-white/[0.06] bg-white/[0.02] overflow-y-auto">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/25 flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 3.5h12M8 3.5v9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="8" cy="12" r="1.5" fill="white"/>
              </svg>
            </div>
            <span className="logo-shimmer text-xl font-extrabold" style={{ fontFamily:"'Syne',sans-serif" }}>tasko</span>
          </Link>

          {/* New Startup Btn */}
          <div className="px-4 py-4">
            <Btn variant="primary" className="w-full" onClick={() => setShowStartupForm(true)}>
              {Icon.plus} New Startup
            </Btn>
          </div>

          {/* Startup list */}
          <div className="px-3 flex-1">
            <p className="text-[10px] font-semibold text-zinc-600 tracking-widest uppercase px-2 mb-2">Your Startups</p>
            <div className="space-y-1">
              {startups.length === 0 && (
                <p className="text-xs text-zinc-600 px-2 py-3 italic">No startups yet.</p>
              )}
              {startups.map(s => {
                const cfg = STATUS_CONFIG[s.status] || STATUS_CONFIG.planning;
                const isActive = s.id === activeStartupId;
                return (
                  <div
                    key={s.id}
                    onClick={() => { setActiveStartupId(s.id); setSelectedGoalId(null); setActiveTab("overview"); }}
                    className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${isActive ? "bg-violet-500/15 border border-violet-500/30" : "hover:bg-white/[0.04] border border-transparent"}`}
                  >
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
                    <span className={`text-sm font-medium flex-1 truncate ${isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"}`}>
                      {s.name}
                    </span>
                    <button
                      onClick={(e) => deleteStartup(s.id, e)}
                      className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-rose-400 transition-all"
                    >{Icon.trash}</button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats footer */}
          {startups.length > 0 && (
            <div className="p-4 border-t border-white/[0.06] mt-2">
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { val: startups.length,  label: "Startups" },
                  { val: goals.filter(g => startups.some(s => s.id === g.startupId)).length, label: "Goals" },
                  { val: tasks.filter(t => t.done).length, label: "Done" },
                ].map((s, i) => (
                  <div key={i} className="bg-white/[0.03] rounded-lg py-1.5">
                    <div className="text-base font-bold text-white" style={{ fontFamily:"'Syne',sans-serif" }}>{s.val}</div>
                    <div className="text-[10px] text-zinc-600">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nav links */}
          <div className="p-4 border-t border-white/[0.06] mt-auto space-y-1">
            <Link
              to="/"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log out
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 flex flex-col overflow-hidden">

          {!activeStartup ? (
            /* ── Empty State ── */
            <div className="flex-1 flex items-center justify-center fade-up">
              <div className="text-center max-w-sm">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600/30 to-cyan-500/30 border border-violet-500/20 flex items-center justify-center mx-auto mb-6 text-4xl">🚀</div>
                <h2 className="text-2xl font-extrabold text-white mb-3" style={{ fontFamily:"'Syne',sans-serif" }}>
                  Build Your First Startup
                </h2>
                <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                  Create a startup to begin organizing your ideas, goals, and tasks in one place.
                </p>
                <Btn variant="primary" onClick={() => setShowStartupForm(true)} className="mx-auto">
                  {Icon.rocket} Launch Your Startup
                </Btn>
              </div>
            </div>
          ) : (
            <>
              {/* ── Top Bar ── */}
              <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-white/[0.01]">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-lg font-extrabold text-white" style={{ fontFamily:"'Syne',sans-serif" }}>{activeStartup.name}</h1>
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${STATUS_CONFIG[activeStartup.status]?.bg} ${STATUS_CONFIG[activeStartup.status]?.color} border-current/20`}>
                        {STATUS_CONFIG[activeStartup.status]?.label}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 mt-0.5">{activeStartup.founder} {activeStartup.coFounder ? `& ${activeStartup.coFounder}` : ""}</p>
                  </div>
                </div>

                {/* Status updater */}
                <div className="flex items-center gap-2">
                  <Select
                    className="!w-auto text-xs py-1.5 px-3"
                    value={activeStartup.status}
                    onChange={e => updateStartupStatus(activeStartup.id, e.target.value)}
                  >
                    {Object.entries(STATUS_CONFIG).map(([k,v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* ── Tabs ── */}
              <div className="flex-shrink-0 flex items-center gap-1 px-6 py-3 border-b border-white/[0.06] overflow-x-auto">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all duration-200 whitespace-nowrap ${activeTab === tab.id ? "tab-active" : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"}`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {/* ── Tab Content ── */}
              <div className="flex-1 overflow-y-auto p-6">

                {/* ════ OVERVIEW ════ */}
                {activeTab === "overview" && (
                  <div className="space-y-6 fade-up">
                    {/* Stats row */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label:"Goals",          val: startupGoals.length,  icon:"🎯", color:"violet" },
                        { label:"Total Tasks",     val: startupTasks.length,  icon:"📋", color:"cyan"   },
                        { label:"Completed",       val: completedTasks,       icon:"✅", color:"emerald" },
                        { label:"Progress",        val: `${progress}%`,       icon:"📈", color:"amber"  },
                      ].map((s, i) => (
                        <Card key={i} className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-lg">{s.icon}</span>
                            <span className={`text-[10px] font-semibold text-${s.color}-400 bg-${s.color}-500/10 px-2 py-0.5 rounded-full`}>{s.label}</span>
                          </div>
                          <div className="text-2xl font-extrabold text-white" style={{ fontFamily:"'Syne',sans-serif" }}>{s.val}</div>
                        </Card>
                      ))}
                    </div>

                    {/* Progress bar */}
                    {startupTasks.length > 0 && (
                      <Card className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-semibold text-zinc-300">Overall Progress</span>
                          <span className="text-sm font-bold text-white">{progress}%</span>
                        </div>
                        <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                          <div className="progress-bar h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full" style={{ width:`${progress}%` }} />
                        </div>
                        <div className="flex justify-between text-xs text-zinc-600 mt-2">
                          <span>{completedTasks} completed</span>
                          <span>{startupTasks.length - completedTasks} remaining</span>
                        </div>
                      </Card>
                    )}

                    {/* Details */}
                    <div className="grid lg:grid-cols-2 gap-4">
                      <Card className="p-5">
                        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Startup Brief</h3>
                        <div className="space-y-3">
                          {[
                            { label:"Problem",  val: activeStartup.problem },
                            { label:"Solution", val: activeStartup.solution },
                            { label:"Users",    val: activeStartup.users || "Not defined" },
                          ].map((r, i) => (
                            <div key={i}>
                              <p className="text-[11px] text-zinc-600 mb-1">{r.label}</p>
                              <p className="text-sm text-zinc-300 leading-relaxed">{r.val}</p>
                            </div>
                          ))}
                        </div>
                      </Card>

                      {/* Recent tasks */}
                      <Card className="p-5">
                        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Recent Tasks</h3>
                        {startupTasks.length === 0 ? (
                          <p className="text-xs text-zinc-600 italic">No tasks yet. Add goals and tasks.</p>
                        ) : (
                          <div className="space-y-2">
                            {startupTasks.slice(-5).reverse().map(t => (
                              <div key={t.id} className="flex items-center gap-2.5">
                                <button
                                  onClick={() => toggleTask(t.id)}
                                  className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${t.done ? "bg-emerald-500 border-emerald-500 text-white" : "border-white/20 hover:border-emerald-400"}`}
                                >
                                  {t.done && Icon.check}
                                </button>
                                <span className={`text-xs flex-1 ${t.done ? "line-through text-zinc-600" : "text-zinc-300"}`}>{t.title}</span>
                                <Avatar name={t.assignedTo} size="sm" />
                              </div>
                            ))}
                          </div>
                        )}
                      </Card>
                    </div>
                  </div>
                )}

                {/* ════ GOALS ════ */}
                {activeTab === "goals" && (
                  <div className="fade-up">
                    <SectionHeader
                      icon={Icon.target} title="Goals" count={startupGoals.length}
                      action={<Btn variant="primary" onClick={() => setShowGoalForm(true)}>{Icon.plus} Add Goal</Btn>}
                    />
                    {startupGoals.length === 0 ? (
                      <Card className="p-10 text-center">
                        <div className="text-3xl mb-3">🎯</div>
                        <p className="text-sm text-zinc-500">No goals yet. Add your first milestone.</p>
                      </Card>
                    ) : (
                      <div className="grid lg:grid-cols-2 gap-4">
                        {startupGoals.map(g => {
                          const gTasks    = tasks.filter(t => t.goalId === g.id);
                          const gDone     = gTasks.filter(t => t.done).length;
                          const gProgress = gTasks.length ? Math.round((gDone / gTasks.length) * 100) : 0;
                          const pcfg      = PRIORITY_CONFIG[g.priority] || PRIORITY_CONFIG.medium;
                          const isSelected = g.id === selectedGoalId;
                          return (
                            <Card
                              key={g.id}
                              className={`p-5 ${isSelected ? "border-violet-500/40" : ""}`}
                              glow={isSelected ? "rgba(139,92,246,0.15)" : undefined}
                              onClick={() => { setSelectedGoalId(g.id); setActiveTab("tasks"); }}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1 pr-2">
                                  <h3 className="font-bold text-white text-sm mb-1">{g.title}</h3>
                                  {g.description && <p className="text-xs text-zinc-500 leading-relaxed">{g.description}</p>}
                                </div>
                                <button onClick={(e) => deleteGoal(g.id, e)} className="text-zinc-700 hover:text-rose-400 transition-colors">{Icon.trash}</button>
                              </div>
                              <div className="flex items-center gap-2 mb-4">
                                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${pcfg.bg} ${pcfg.color} ${pcfg.border}`}>{pcfg.label}</span>
                                <span className="text-[11px] text-zinc-500 bg-white/[0.04] px-2 py-0.5 rounded-full">{g.days} days</span>
                                <span className="text-[11px] text-zinc-500 bg-white/[0.04] px-2 py-0.5 rounded-full">{gTasks.length} tasks</span>
                              </div>
                              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                                <div className="progress-bar h-full bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full" style={{ width:`${gProgress}%` }} />
                              </div>
                              <div className="flex justify-between text-[10px] text-zinc-600 mt-1.5">
                                <span>{gDone}/{gTasks.length} tasks done</span>
                                <span>{gProgress}%</span>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* ════ TASKS ════ */}
                {activeTab === "tasks" && (
                  <div className="fade-up">
                    {/* Goal selector */}
                    <div className="flex items-center gap-3 mb-5 overflow-x-auto pb-1">
                      <span className="text-xs text-zinc-600 flex-shrink-0">Filter by goal:</span>
                      <button
                        onClick={() => setSelectedGoalId(null)}
                        className={`text-xs px-3 py-1.5 rounded-lg border flex-shrink-0 transition-all ${!selectedGoalId ? "tab-active" : "border-white/10 text-zinc-500 hover:text-zinc-300"}`}
                      >All</button>
                      {startupGoals.map(g => (
                        <button
                          key={g.id}
                          onClick={() => setSelectedGoalId(g.id)}
                          className={`text-xs px-3 py-1.5 rounded-lg border flex-shrink-0 transition-all whitespace-nowrap ${selectedGoalId === g.id ? "tab-active" : "border-white/10 text-zinc-500 hover:text-zinc-300"}`}
                        >{g.title}</button>
                      ))}
                    </div>

                    <SectionHeader
                      icon={Icon.task}
                      title="Tasks"
                      count={(selectedGoalId ? goalTasks : startupTasks).length}
                      action={
                        <Btn variant="primary" onClick={() => setShowTaskForm(true)}>
                          {Icon.plus} Add Task
                        </Btn>
                      }
                    />

                    {(selectedGoalId ? goalTasks : startupTasks).length === 0 ? (
                      <Card className="p-10 text-center">
                        <div className="text-3xl mb-3">📋</div>
                        <p className="text-sm text-zinc-500">No tasks yet. Create a goal first, then add tasks.</p>
                      </Card>
                    ) : (
                      <div className="space-y-2">
                        {(selectedGoalId ? goalTasks : startupTasks).map(t => {
                          const pcfg = PRIORITY_CONFIG[t.priority] || PRIORITY_CONFIG.medium;
                          return (
                            <Card key={t.id} className="px-4 py-3.5">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => toggleTask(t.id)}
                                  className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${t.done ? "bg-emerald-500 border-emerald-500 text-white" : "border-white/20 hover:border-emerald-400"}`}
                                >
                                  {t.done && Icon.check}
                                </button>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm font-medium ${t.done ? "line-through text-zinc-600" : "text-zinc-200"}`}>{t.title}</p>
                                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    <div className="flex items-center gap-1.5">
                                      <Avatar name={t.assignedTo} size="sm" />
                                      <span className="text-xs text-zinc-500">{t.assignedTo}</span>
                                    </div>
                                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${pcfg.bg} ${pcfg.color} ${pcfg.border}`}>{pcfg.label}</span>
                                    {t.dueDate && <span className="text-[10px] text-zinc-600">Due {t.dueDate}</span>}
                                  </div>
                                </div>
                                <button onClick={(e) => deleteTask(t.id, e)} className="text-zinc-700 hover:text-rose-400 transition-colors flex-shrink-0">{Icon.trash}</button>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* ════ NOTES ════ */}
                {activeTab === "notes" && (
                  <div className="fade-up">
                    <SectionHeader
                      icon={Icon.note} title="Notes & Ideas" count={startupNotes.length}
                      action={<Btn variant="primary" onClick={() => setShowNoteForm(true)}>{Icon.plus} Add Note</Btn>}
                    />
                    {startupNotes.length === 0 ? (
                      <Card className="p-10 text-center">
                        <div className="text-3xl mb-3">📝</div>
                        <p className="text-sm text-zinc-500">No notes yet. Capture your thoughts and ideas.</p>
                      </Card>
                    ) : (
                      <div className="grid lg:grid-cols-2 gap-4">
                        {startupNotes.map(n => {
                          const tagCfg = NOTE_TAGS[n.tag] || NOTE_TAGS.general;
                          return (
                            <Card key={n.id} className="p-5">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="font-bold text-white text-sm mb-1">{n.title}</h3>
                                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tagCfg.bg} ${tagCfg.color}`}>{n.tag}</span>
                                </div>
                                <button onClick={() => deleteNote(n.id)} className="text-zinc-700 hover:text-rose-400 transition-colors">{Icon.trash}</button>
                              </div>
                              <p className="text-sm text-zinc-400 leading-relaxed">{n.body}</p>
                              <p className="text-[10px] text-zinc-700 mt-3">{new Date(n.createdAt).toLocaleDateString()}</p>
                            </Card>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* ════ TEAM ════ */}
                {activeTab === "team" && (
                  <div className="fade-up">
                    <SectionHeader icon={Icon.team} title="Team" />
                    <div className="grid lg:grid-cols-2 gap-4">
                      {[
                        { name: activeStartup.founder,   role: "Founder",    color:"from-violet-500 to-purple-600" },
                        ...(activeStartup.coFounder ? [{ name: activeStartup.coFounder, role: "Co-Founder", color:"from-cyan-500 to-blue-600" }] : []),
                      ].map((member, i) => {
                        const memberTasks = startupTasks.filter(t => t.assignedTo?.toLowerCase() === member.name?.toLowerCase());
                        const done = memberTasks.filter(t => t.done).length;
                        return (
                          <Card key={i} className="p-5">
                            <div className="flex items-center gap-4 mb-4">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-lg font-bold`}>
                                {member.name?.[0]?.toUpperCase()}
                              </div>
                              <div>
                                <h3 className="font-bold text-white">{member.name}</h3>
                                <p className="text-xs text-zinc-500">{member.role}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center">
                              {[
                                { val: memberTasks.length, label:"Assigned" },
                                { val: done,               label:"Done"     },
                                { val: memberTasks.length - done, label:"Pending" },
                              ].map((s, j) => (
                                <div key={j} className="bg-white/[0.03] rounded-lg py-2">
                                  <div className="text-lg font-bold text-white" style={{ fontFamily:"'Syne',sans-serif" }}>{s.val}</div>
                                  <div className="text-[10px] text-zinc-600">{s.label}</div>
                                </div>
                              ))}
                            </div>
                          </Card>
                        );
                      })}

                      {/* Unique assignees from tasks */}
                      {[...new Set(startupTasks.map(t => t.assignedTo))]
                        .filter(name => name !== activeStartup.founder && name !== activeStartup.coFounder)
                        .map((name, i) => {
                          const memberTasks = startupTasks.filter(t => t.assignedTo === name);
                          const done = memberTasks.filter(t => t.done).length;
                          return (
                            <Card key={`extra-${i}`} className="p-5">
                              <div className="flex items-center gap-4 mb-4">
                                <Avatar name={name} size="lg" />
                                <div>
                                  <h3 className="font-bold text-white">{name}</h3>
                                  <p className="text-xs text-zinc-500">Contributor</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-center">
                                {[
                                  { val: memberTasks.length, label:"Assigned" },
                                  { val: done,               label:"Done"     },
                                  { val: memberTasks.length - done, label:"Pending" },
                                ].map((s, j) => (
                                  <div key={j} className="bg-white/[0.03] rounded-lg py-2">
                                    <div className="text-lg font-bold text-white" style={{ fontFamily:"'Syne',sans-serif" }}>{s.val}</div>
                                    <div className="text-[10px] text-zinc-600">{s.label}</div>
                                  </div>
                                ))}
                              </div>
                            </Card>
                          );
                        })}
                    </div>
                  </div>
                )}

              </div>
            </>
          )}
        </main>
      </div>

      {/* ══════════ MODALS ══════════ */}

      {/* ── New Startup Modal ── */}
      {showStartupForm && (
        <Modal title="Register New Startup" icon="🚀" onClose={() => setShowStartupForm(false)}>
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Startup Name *"    value={sf.name}       onChange={e=>setSf({...sf,name:e.target.value})}       className="col-span-2"/>
            <Input placeholder="Founder Name *"   value={sf.founder}    onChange={e=>setSf({...sf,founder:e.target.value})}    />
            <Input placeholder="Co-Founder"        value={sf.coFounder}  onChange={e=>setSf({...sf,coFounder:e.target.value})}  />
            <Input placeholder="Target Users"      value={sf.users}      onChange={e=>setSf({...sf,users:e.target.value})}      className="col-span-2"/>
            <Textarea placeholder="Problem your startup solves *" value={sf.problem} onChange={e=>setSf({...sf,problem:e.target.value})} className="col-span-2"/>
            <Textarea placeholder="Your solution *"               value={sf.solution} onChange={e=>setSf({...sf,solution:e.target.value})} className="col-span-2"/>
            <Select value={sf.status} onChange={e=>setSf({...sf,status:e.target.value})} className="col-span-2">
              {Object.entries(STATUS_CONFIG).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
            </Select>
          </div>
          <div className="flex gap-3 mt-5">
            <Btn variant="ghost" className="flex-1" onClick={() => setShowStartupForm(false)}>Cancel</Btn>
            <Btn variant="primary" className="flex-1" onClick={createStartup}>{Icon.rocket} Launch</Btn>
          </div>
        </Modal>
      )}

      {/* ── New Goal Modal ── */}
      {showGoalForm && (
        <Modal title="Add New Goal" icon="🎯" onClose={() => setShowGoalForm(false)}>
          <div className="space-y-3">
            <Input placeholder="Goal title *"       value={gf.title}       onChange={e=>setGf({...gf,title:e.target.value})}/>
            <Textarea placeholder="Description (optional)" value={gf.description} onChange={e=>setGf({...gf,description:e.target.value})}/>
            <div className="grid grid-cols-2 gap-3">
              <Input type="number" placeholder="Days to complete *" value={gf.days} onChange={e=>setGf({...gf,days:e.target.value})}/>
              <Select value={gf.priority} onChange={e=>setGf({...gf,priority:e.target.value})}>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </Select>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <Btn variant="ghost" className="flex-1" onClick={() => setShowGoalForm(false)}>Cancel</Btn>
            <Btn variant="primary" className="flex-1" onClick={createGoal}>{Icon.plus} Add Goal</Btn>
          </div>
        </Modal>
      )}

      {/* ── New Task Modal ── */}
      {showTaskForm && (
        <Modal title="Add New Task" icon="📋" onClose={() => setShowTaskForm(false)}>
          <div className="space-y-3">
            <Input placeholder="Task title *"     value={tf.title}      onChange={e=>setTf({...tf,title:e.target.value})}/>
            <Input placeholder="Assign to *"      value={tf.assignedTo} onChange={e=>setTf({...tf,assignedTo:e.target.value})}/>
            <div className="grid grid-cols-2 gap-3">
              <Select value={tf.priority} onChange={e=>setTf({...tf,priority:e.target.value})}>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </Select>
              <Input type="date" value={tf.dueDate} onChange={e=>setTf({...tf,dueDate:e.target.value})}/>
            </div>
            <Select value={tf.goalId || selectedGoalId || ""} onChange={e=>setTf({...tf,goalId:e.target.value})}>
              <option value="">Select Goal *</option>
              {startupGoals.map(g => <option key={g.id} value={g.id}>{g.title}</option>)}
            </Select>
          </div>
          <div className="flex gap-3 mt-5">
            <Btn variant="ghost" className="flex-1" onClick={() => setShowTaskForm(false)}>Cancel</Btn>
            <Btn variant="primary" className="flex-1" onClick={createTask}>{Icon.plus} Add Task</Btn>
          </div>
        </Modal>
      )}

      {/* ── New Note Modal ── */}
      {showNoteForm && (
        <Modal title="Add Note / Idea" icon="📝" onClose={() => setShowNoteForm(false)}>
          <div className="space-y-3">
            <Input placeholder="Note title *" value={nf.title} onChange={e=>setNf({...nf,title:e.target.value})}/>
            <Textarea placeholder="Write your thoughts..." value={nf.body} onChange={e=>setNf({...nf,body:e.target.value})}/>
            <Select value={nf.tag} onChange={e=>setNf({...nf,tag:e.target.value})}>
              <option value="general">General</option>
              <option value="idea">Idea</option>
              <option value="risk">Risk</option>
              <option value="investor">Investor</option>
              <option value="market">Market</option>
            </Select>
          </div>
          <div className="flex gap-3 mt-5">
            <Btn variant="ghost" className="flex-1" onClick={() => setShowNoteForm(false)}>Cancel</Btn>
            <Btn variant="primary" className="flex-1" onClick={createNote}>{Icon.plus} Save Note</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ─── Modal Wrapper ─── */
function Modal({ title, icon, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="modal-in w-full max-w-md bg-[#0f0f20] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">{icon}</span>
            <h3 className="font-bold text-white text-base" style={{ fontFamily:"'Syne',sans-serif" }}>{title}</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-zinc-500 hover:text-white transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}