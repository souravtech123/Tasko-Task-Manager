import { useState } from "react";
import { Link, useNavigate } from "react-router";

/* ─── Icons ─── */
const Icon = {
  rocket: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>,
  plus:   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>,
  check:  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>,
  target: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" strokeWidth={2}/><circle cx="12" cy="12" r="4" strokeWidth={2}/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>,
  task:   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>,
  trash:  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>,
  note:   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>,
  team:   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
  close:  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>,
  eye:    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>,
  home:   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>,
  logout: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>,
  user:   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>,
  chevron:<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>,
  grid:   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>,
};

const PRIORITY_CONFIG = {
  high:   { label: "High",   textClass: "text-red-700",    bgClass: "bg-red-50",    borderClass: "border-red-200",   dot: "bg-red-500"   },
  medium: { label: "Medium", textClass: "text-amber-700",  bgClass: "bg-amber-50",  borderClass: "border-amber-200", dot: "bg-amber-500" },
  low:    { label: "Low",    textClass: "text-green-700",  bgClass: "bg-green-50",  borderClass: "border-green-200", dot: "bg-green-500" },
};

const STATUS_CONFIG = {
  planning: { label: "Planning",    textClass: "text-slate-600",  bgClass: "bg-slate-100",   dot: "bg-slate-400"  },
  active:   { label: "Active",      textClass: "text-blue-700",   bgClass: "bg-blue-50",     dot: "bg-blue-500"   },
  building: { label: "Building",    textClass: "text-violet-700", bgClass: "bg-violet-50",   dot: "bg-violet-500" },
  launched: { label: "Launched 🚀", textClass: "text-emerald-700",bgClass: "bg-emerald-50",  dot: "bg-emerald-500"},
};

/* ─── Avatar ─── */
const Avatar = ({ name, size = "sm" }) => {
  const palettes = [
    "bg-indigo-500","bg-teal-500","bg-amber-500","bg-rose-500","bg-violet-500","bg-cyan-500","bg-orange-500"
  ];
  const idx = name ? name.charCodeAt(0) % palettes.length : 0;
  const sz = size === "sm" ? "w-6 h-6 text-[10px]" : "w-9 h-9 text-sm";
  return (
    <div className={`${sz} rounded-full ${palettes[idx]} flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {name ? name[0].toUpperCase() : "?"}
    </div>
  );
};

/* ─── Form Controls ─── */
const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-150 ${className}`}
  />
);
const Select = ({ className = "", children, ...props }) => (
  <select
    {...props}
    className={`w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-150 ${className}`}
  >
    {children}
  </select>
);
const Textarea = ({ className = "", ...props }) => (
  <textarea
    {...props}
    rows={3}
    className={`w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-150 resize-none ${className}`}
  />
);

/* ─── Button ─── */
const Btn = ({ variant = "primary", className = "", children, ...props }) => {
  const styles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200 active:scale-[0.98]",
    ghost:   "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800 active:scale-[0.98]",
    danger:  "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 active:scale-[0.98]",
    subtle:  "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 active:scale-[0.98]",
  };
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

/* ─── Card ─── */
const Card = ({ className = "", children, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white border border-slate-200 rounded-xl transition-all duration-200 ${onClick ? "cursor-pointer hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-100/50" : ""} ${className}`}
  >
    {children}
  </div>
);

/* ─── Stat Card ─── */
const StatCard = ({ icon, label, value, accent }) => {
  const accents = {
    indigo: { icon: "bg-indigo-100 text-indigo-600", val: "text-indigo-700" },
    teal:   { icon: "bg-teal-100 text-teal-600",     val: "text-teal-700"   },
    green:  { icon: "bg-green-100 text-green-600",   val: "text-green-700"  },
    amber:  { icon: "bg-amber-100 text-amber-600",   val: "text-amber-700"  },
  };
  const a = accents[accent] || accents.indigo;
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
          <p className={`text-2xl font-extrabold ${a.val}`} style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>{value}</p>
        </div>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${a.icon}`}>{icon}</div>
      </div>
    </Card>
  );
};

/* ─── Section Header ─── */
const SectionHeader = ({ icon, title, count, action }) => (
  <div className="flex items-center justify-between mb-5">
    <div className="flex items-center gap-2.5">
      <span className="text-slate-500">{icon}</span>
      <h2 className="text-base font-bold text-slate-800" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>{title}</h2>
      {count !== undefined && (
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded-full px-2.5 py-0.5">{count}</span>
      )}
    </div>
    {action}
  </div>
);

/* ─── Label ─── */
const Label = ({ children, className = "" }) => (
  <label className={`block text-xs font-semibold text-slate-600 mb-1.5 ${className}`}>{children}</label>
);

/* ════════════════════════════════════════════════════
   MAIN APP
════════════════════════════════════════════════════ */
export default function StartupManager() {
  const navigate = useNavigate();

  const [startups, setStartups]             = useState([]);
  const [goals, setGoals]                   = useState([]);
  const [tasks, setTasks]                   = useState([]);
  const [notes, setNotes]                   = useState([]);
  const [activeStartupId, setActiveStartupId] = useState(null);
  const [selectedGoalId, setSelectedGoalId]   = useState(null);
  const [activeTab, setActiveTab]             = useState("overview");
  const [showStartupForm, setShowStartupForm] = useState(false);
  const [showGoalForm, setShowGoalForm]       = useState(false);
  const [showTaskForm, setShowTaskForm]       = useState(false);
  const [showNoteForm, setShowNoteForm]       = useState(false);

  const [sf, setSf] = useState({ name:"", problem:"", solution:"", users:"", founder:"", coFounder:"", status:"planning" });
  const [gf, setGf] = useState({ title:"", days:"", priority:"medium", description:"" });
  const [tf, setTf] = useState({ title:"", assignedTo:"", priority:"medium", dueDate:"", goalId:"" });
  const [nf, setNf] = useState({ title:"", body:"", tag:"general" });

  const activeStartup  = startups.find(s => s.id === activeStartupId);
  const startupGoals   = goals.filter(g => g.startupId === activeStartupId);
  const startupTasks   = tasks.filter(t => startupGoals.some(g => g.id === t.goalId));
  const goalTasks      = tasks.filter(t => t.goalId === selectedGoalId);
  const startupNotes   = notes.filter(n => n.startupId === activeStartupId);
  const completedTasks = startupTasks.filter(t => t.done).length;
  const progress       = startupTasks.length ? Math.round((completedTasks / startupTasks.length) * 100) : 0;

  /* ─── CRUD ─── */
  const createStartup = () => {
    if (!sf.name || !sf.problem || !sf.solution) return;
    const id = crypto.randomUUID();
    setStartups(prev => [...prev, { id, ...sf, createdAt: Date.now() }]);
    setActiveStartupId(id); setActiveTab("overview");
    setSf({ name:"", problem:"", solution:"", users:"", founder:"", coFounder:"", status:"planning" });
    setShowStartupForm(false);
  };
  const deleteStartup = (id, e) => {
    e.stopPropagation();
    setStartups(prev => prev.filter(s => s.id !== id));
    if (activeStartupId === id) { setActiveStartupId(null); setSelectedGoalId(null); }
  };
  const updateStartupStatus = (id, status) => setStartups(prev => prev.map(s => s.id === id ? { ...s, status } : s));

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

  const createTask = () => {
    const gid = tf.goalId || selectedGoalId;
    if (!tf.title || !tf.assignedTo || !gid) return;
    setTasks(prev => [...prev, { id: crypto.randomUUID(), goalId: gid, ...tf, done: false, createdAt: Date.now() }]);
    setTf({ title:"", assignedTo:"", priority:"medium", dueDate:"", goalId:"" });
    setShowTaskForm(false);
  };
  const toggleTask = (id) => setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const deleteTask = (id, e) => { e.stopPropagation(); setTasks(prev => prev.filter(t => t.id !== id)); };

  const createNote = () => {
    if (!nf.title || !nf.body || !activeStartup) return;
    setNotes(prev => [...prev, { id: crypto.randomUUID(), startupId: activeStartupId, ...nf, createdAt: Date.now() }]);
    setNf({ title:"", body:"", tag:"general" });
    setShowNoteForm(false);
  };
  const deleteNote = (id) => setNotes(prev => prev.filter(n => n.id !== id));

  const NOTE_TAGS = {
    general:  { text:"text-slate-600",  bg:"bg-slate-100"   },
    idea:     { text:"text-violet-700", bg:"bg-violet-50"   },
    risk:     { text:"text-red-700",    bg:"bg-red-50"      },
    investor: { text:"text-amber-700",  bg:"bg-amber-50"    },
    market:   { text:"text-teal-700",   bg:"bg-teal-50"     },
  };

  const TABS = [
    { id:"overview", label:"Overview", icon: Icon.grid   },
    { id:"goals",    label:"Goals",    icon: Icon.target },
    { id:"tasks",    label:"Tasks",    icon: Icon.task   },
    { id:"notes",    label:"Notes",    icon: Icon.note   },
    { id:"team",     label:"Team",     icon: Icon.team   },
  ];

  /* ─────────────────────────── RENDER ─────────────────────────── */
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Bricolage+Grotesque:wght@700;800&display=swap');

        @keyframes fadeUp  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }
        @keyframes modalIn { from{opacity:0;transform:scale(.97) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes spin    { to{transform:rotate(360deg)} }

        .fade-up  { animation: fadeUp  .35s cubic-bezier(.22,.61,.36,1) both; }
        .slide-in { animation: slideIn .3s  cubic-bezier(.22,.61,.36,1) both; }
        .modal-in { animation: modalIn .25s cubic-bezier(.22,.61,.36,1) both; }

        .progress-fill { transition: width .8s cubic-bezier(.22,.61,.36,1); }

        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

        .sidebar-item-active { background:#EEF2FF; color:#4338CA; font-weight:600; }
        .sidebar-item-active .dot-indicator { background:#4F46E5; }
      `}</style>

      <div className="flex h-screen overflow-hidden">

        {/* ══ SIDEBAR ══ */}
        <aside className="w-64 flex-shrink-0 flex flex-col bg-white border-r border-slate-200 overflow-y-auto">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 px-5 h-14 border-b border-slate-100 hover:bg-slate-50 transition-colors flex-shrink-0">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 4.5h10M8 4.5v7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="8" cy="11" r="1.5" fill="white"/>
              </svg>
            </div>
            <span className="text-base font-extrabold text-slate-800 tracking-tight" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>tasko</span>
            <span className="ml-auto text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">BETA</span>
          </Link>

          {/* New Startup */}
          <div className="px-4 py-3 border-b border-slate-100">
            <Btn variant="primary" className="w-full" onClick={() => setShowStartupForm(true)}>
              {Icon.plus} New Startup
            </Btn>
          </div>

          {/* Startup List */}
          <div className="px-3 py-3 flex-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Workspaces</p>
            <div className="space-y-0.5">
              {startups.length === 0 && (
                <p className="text-xs text-slate-400 px-2 py-2 italic">No startups yet.</p>
              )}
              {startups.map(s => {
                const cfg = STATUS_CONFIG[s.status] || STATUS_CONFIG.planning;
                const isActive = s.id === activeStartupId;
                return (
                  <div
                    key={s.id}
                    onClick={() => { setActiveStartupId(s.id); setSelectedGoalId(null); setActiveTab("overview"); }}
                    className={`group flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer transition-all duration-150 ${isActive ? "sidebar-item-active" : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"}`}
                  >
                    <span className={`dot-indicator w-2 h-2 rounded-full flex-shrink-0 ${isActive ? "" : cfg.dot}`} />
                    <span className="text-sm flex-1 truncate font-medium">{s.name}</span>
                    <button
                      onClick={(e) => deleteStartup(s.id, e)}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all p-0.5"
                    >{Icon.trash}</button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Global stats */}
          {startups.length > 0 && (
            <div className="px-4 py-3 border-t border-slate-100">
              <div className="grid grid-cols-3 gap-1.5 text-center">
                {[
                  { val: startups.length, label:"Startups" },
                  { val: goals.filter(g => startups.some(s => s.id === g.startupId)).length, label:"Goals" },
                  { val: tasks.filter(t => t.done).length, label:"Done" },
                ].map((s, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg py-2">
                    <div className="text-sm font-extrabold text-slate-800" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>{s.val}</div>
                    <div className="text-[10px] text-slate-400 font-semibold">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nav footer */}
          <div className="px-3 py-3 border-t border-slate-100 space-y-0.5">
            {[
              { to:"/",          label:"Home",    icon: Icon.home   },
              { to:"/dashboard", label:"Profile", icon: Icon.user   },
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors font-medium"
              >
                {link.icon} {link.label}
              </Link>
            ))}
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
            >
              {Icon.logout} Log out
            </button>
          </div>
        </aside>

        {/* ══ MAIN ══ */}
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">

          {!activeStartup ? (
            <div className="flex-1 flex items-center justify-center fade-up">
              <div className="text-center max-w-sm px-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-inner">🚀</div>
                <h2 className="text-2xl font-extrabold text-slate-800 mb-3" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>
                  Start Your Journey
                </h2>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  Create a workspace for your startup and organize everything — from goals to team tasks, all in one place.
                </p>
                <Btn variant="primary" onClick={() => setShowStartupForm(true)} className="mx-auto px-5 py-2.5">
                  {Icon.rocket} Create Workspace
                </Btn>
              </div>
            </div>
          ) : (
            <>
              {/* ── Top Bar ── */}
              <div className="flex-shrink-0 flex items-center justify-between px-6 h-14 border-b border-slate-200 bg-white">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <h1 className="text-base font-extrabold text-slate-800" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>{activeStartup.name}</h1>
                    {(() => {
                      const cfg = STATUS_CONFIG[activeStartup.status];
                      return (
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg?.bgClass} ${cfg?.textClass}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cfg?.dot}`} />
                          {cfg?.label}
                        </span>
                      );
                    })()}
                  </div>
                  {activeStartup.founder && (
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      by {activeStartup.founder}{activeStartup.coFounder ? ` & ${activeStartup.coFounder}` : ""}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    className="!w-auto text-xs py-1.5 !px-3"
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
              <div className="flex-shrink-0 flex items-center gap-0.5 px-6 bg-white border-b border-slate-200 overflow-x-auto">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-3.5 text-xs font-semibold border-b-2 transition-all duration-150 whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-indigo-600 text-indigo-700"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {/* ── Content ── */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 max-w-5xl">

                  {/* ════ OVERVIEW ════ */}
                  {activeTab === "overview" && (
                    <div className="space-y-6 fade-up">
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard label="Goals"      value={startupGoals.length}  icon={Icon.target}  accent="indigo" />
                        <StatCard label="Total Tasks" value={startupTasks.length}  icon={Icon.task}    accent="teal"   />
                        <StatCard label="Completed"   value={completedTasks}       icon={Icon.check}   accent="green"  />
                        <StatCard label="Progress"    value={`${progress}%`}       icon={Icon.eye}     accent="amber"  />
                      </div>

                      {startupTasks.length > 0 && (
                        <Card className="p-5">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-bold text-slate-700">Overall Progress</span>
                            <span className="text-sm font-extrabold text-indigo-700" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>{progress}%</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="progress-fill h-full bg-gradient-to-r from-indigo-500 to-teal-400 rounded-full" style={{ width:`${progress}%` }} />
                          </div>
                          <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                            <span>{completedTasks} completed</span>
                            <span>{startupTasks.length - completedTasks} remaining</span>
                          </div>
                        </Card>
                      )}

                      <div className="grid lg:grid-cols-2 gap-4">
                        <Card className="p-5">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Startup Brief</h3>
                          <div className="space-y-4">
                            {[
                              { label:"Problem",  val: activeStartup.problem  },
                              { label:"Solution", val: activeStartup.solution },
                              { label:"Target Users", val: activeStartup.users || "Not defined" },
                            ].map((r, i) => (
                              <div key={i}>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{r.label}</p>
                                <p className="text-sm text-slate-700 leading-relaxed">{r.val}</p>
                              </div>
                            ))}
                          </div>
                        </Card>

                        <Card className="p-5">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recent Tasks</h3>
                          {startupTasks.length === 0 ? (
                            <div className="py-4 text-center">
                              <p className="text-xs text-slate-400 italic">No tasks yet. Add goals and tasks to get started.</p>
                            </div>
                          ) : (
                            <div className="space-y-2.5">
                              {startupTasks.slice(-5).reverse().map(t => (
                                <div key={t.id} className="flex items-center gap-2.5">
                                  <button
                                    onClick={() => toggleTask(t.id)}
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150 ${t.done ? "bg-green-500 border-green-500 text-white" : "border-slate-300 hover:border-green-400"}`}
                                  >
                                    {t.done && Icon.check}
                                  </button>
                                  <span className={`text-sm flex-1 font-medium ${t.done ? "line-through text-slate-400" : "text-slate-700"}`}>{t.title}</span>
                                  <div className="flex items-center gap-1">
                                    <Avatar name={t.assignedTo} size="sm" />
                                  </div>
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
                          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-2xl">🎯</div>
                          <p className="text-sm text-slate-500 font-medium">No goals yet. Define your first milestone.</p>
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
                                className={`p-5 ${isSelected ? "border-indigo-400 ring-2 ring-indigo-100" : ""}`}
                                onClick={() => { setSelectedGoalId(g.id); setActiveTab("tasks"); }}
                              >
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1 pr-2">
                                    <h3 className="font-bold text-slate-800 text-sm mb-1">{g.title}</h3>
                                    {g.description && <p className="text-xs text-slate-500 leading-relaxed">{g.description}</p>}
                                  </div>
                                  <button onClick={(e) => deleteGoal(g.id, e)} className="text-slate-300 hover:text-red-500 transition-colors p-0.5">{Icon.trash}</button>
                                </div>
                                <div className="flex items-center gap-2 mb-4 flex-wrap">
                                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${pcfg.bgClass} ${pcfg.textClass} ${pcfg.borderClass}`}>{pcfg.label}</span>
                                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{g.days} days</span>
                                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{gTasks.length} tasks</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div className="progress-fill h-full bg-gradient-to-r from-indigo-500 to-teal-400 rounded-full" style={{ width:`${gProgress}%` }} />
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-400 mt-1.5 font-semibold">
                                  <span>{gDone}/{gTasks.length} done</span>
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
                      {/* Goal filter chips */}
                      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 flex-wrap">
                        <span className="text-xs font-semibold text-slate-400 flex-shrink-0">Filter:</span>
                        <button
                          onClick={() => setSelectedGoalId(null)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all flex-shrink-0 ${!selectedGoalId ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"}`}
                        >All Tasks</button>
                        {startupGoals.map(g => (
                          <button
                            key={g.id}
                            onClick={() => setSelectedGoalId(g.id)}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all flex-shrink-0 whitespace-nowrap ${selectedGoalId === g.id ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"}`}
                          >{g.title}</button>
                        ))}
                      </div>

                      <SectionHeader
                        icon={Icon.task}
                        title="Tasks"
                        count={(selectedGoalId ? goalTasks : startupTasks).length}
                        action={<Btn variant="primary" onClick={() => setShowTaskForm(true)}>{Icon.plus} Add Task</Btn>}
                      />

                      {(selectedGoalId ? goalTasks : startupTasks).length === 0 ? (
                        <Card className="p-10 text-center">
                          <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-2xl">📋</div>
                          <p className="text-sm text-slate-500 font-medium">No tasks yet. Create a goal first, then add tasks.</p>
                        </Card>
                      ) : (
                        <div className="space-y-2">
                          {(selectedGoalId ? goalTasks : startupTasks).map(t => {
                            const pcfg = PRIORITY_CONFIG[t.priority] || PRIORITY_CONFIG.medium;
                            return (
                              <Card key={t.id} className={`px-4 py-3 ${t.done ? "opacity-70" : ""}`}>
                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => toggleTask(t.id)}
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150 ${t.done ? "bg-green-500 border-green-500 text-white" : "border-slate-300 hover:border-green-400"}`}
                                  >
                                    {t.done && Icon.check}
                                  </button>
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-semibold ${t.done ? "line-through text-slate-400" : "text-slate-800"}`}>{t.title}</p>
                                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                                      <div className="flex items-center gap-1">
                                        <Avatar name={t.assignedTo} size="sm" />
                                        <span className="text-xs text-slate-400 font-medium">{t.assignedTo}</span>
                                      </div>
                                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${pcfg.bgClass} ${pcfg.textClass} ${pcfg.borderClass}`}>{pcfg.label}</span>
                                      {t.dueDate && <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Due {t.dueDate}</span>}
                                    </div>
                                  </div>
                                  <button onClick={(e) => deleteTask(t.id, e)} className="text-slate-300 hover:text-red-500 transition-colors p-0.5 flex-shrink-0">{Icon.trash}</button>
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
                          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-2xl">📝</div>
                          <p className="text-sm text-slate-500 font-medium">No notes yet. Capture your ideas.</p>
                        </Card>
                      ) : (
                        <div className="grid lg:grid-cols-2 gap-4">
                          {startupNotes.map(n => {
                            const tagCfg = NOTE_TAGS[n.tag] || NOTE_TAGS.general;
                            return (
                              <Card key={n.id} className="p-5">
                                <div className="flex items-start justify-between mb-2.5">
                                  <div>
                                    <h3 className="font-bold text-slate-800 text-sm mb-1.5">{n.title}</h3>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${tagCfg.bg} ${tagCfg.text}`}>{n.tag}</span>
                                  </div>
                                  <button onClick={() => deleteNote(n.id)} className="text-slate-300 hover:text-red-500 transition-colors p-0.5">{Icon.trash}</button>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed mt-3">{n.body}</p>
                                <p className="text-[10px] text-slate-400 font-medium mt-3 pt-3 border-t border-slate-100">{new Date(n.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</p>
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
                      <SectionHeader icon={Icon.team} title="Team Members" />
                      <div className="grid lg:grid-cols-2 gap-4">
                        {[
                          { name: activeStartup.founder,   role:"Founder",    gradient:"from-indigo-500 to-violet-500" },
                          ...(activeStartup.coFounder ? [{ name: activeStartup.coFounder, role:"Co-Founder", gradient:"from-teal-500 to-cyan-500" }] : []),
                        ].map((member, i) => {
                          const memberTasks = startupTasks.filter(t => t.assignedTo?.toLowerCase() === member.name?.toLowerCase());
                          const done = memberTasks.filter(t => t.done).length;
                          return (
                            <Card key={i} className="p-5">
                              <div className="flex items-center gap-4 mb-5">
                                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-base font-extrabold shadow-md`}>
                                  {member.name?.[0]?.toUpperCase()}
                                </div>
                                <div>
                                  <h3 className="font-extrabold text-slate-800" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>{member.name}</h3>
                                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">{member.role}</span>
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-center">
                                {[
                                  { val: memberTasks.length, label:"Assigned" },
                                  { val: done,               label:"Done"     },
                                  { val: memberTasks.length - done, label:"Pending" },
                                ].map((s, j) => (
                                  <div key={j} className="bg-slate-50 border border-slate-200 rounded-lg py-2.5">
                                    <div className="text-lg font-extrabold text-slate-800" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>{s.val}</div>
                                    <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{s.label}</div>
                                  </div>
                                ))}
                              </div>
                            </Card>
                          );
                        })}
                        {[...new Set(startupTasks.map(t => t.assignedTo))]
                          .filter(name => name !== activeStartup.founder && name !== activeStartup.coFounder)
                          .map((name, i) => {
                            const memberTasks = startupTasks.filter(t => t.assignedTo === name);
                            const done = memberTasks.filter(t => t.done).length;
                            return (
                              <Card key={`extra-${i}`} className="p-5">
                                <div className="flex items-center gap-4 mb-5">
                                  <Avatar name={name} size="lg" />
                                  <div>
                                    <h3 className="font-extrabold text-slate-800" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>{name}</h3>
                                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">Contributor</span>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-center">
                                  {[
                                    { val: memberTasks.length, label:"Assigned" },
                                    { val: done,               label:"Done"     },
                                    { val: memberTasks.length - done, label:"Pending" },
                                  ].map((s, j) => (
                                    <div key={j} className="bg-slate-50 border border-slate-200 rounded-lg py-2.5">
                                      <div className="text-lg font-extrabold text-slate-800" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>{s.val}</div>
                                      <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">{s.label}</div>
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
              </div>
            </>
          )}
        </main>
      </div>

      {/* ══ MODALS ══ */}

      {showStartupForm && (
        <Modal title="New Workspace" icon="🚀" onClose={() => setShowStartupForm(false)}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Startup Name *</Label>
              <Input placeholder="e.g. Acme Inc." value={sf.name} onChange={e=>setSf({...sf,name:e.target.value})}/>
            </div>
            <div>
              <Label>Founder Name *</Label>
              <Input placeholder="Your name" value={sf.founder} onChange={e=>setSf({...sf,founder:e.target.value})}/>
            </div>
            <div>
              <Label>Co-Founder</Label>
              <Input placeholder="Optional" value={sf.coFounder} onChange={e=>setSf({...sf,coFounder:e.target.value})}/>
            </div>
            <div className="col-span-2">
              <Label>Target Users</Label>
              <Input placeholder="Who are your customers?" value={sf.users} onChange={e=>setSf({...sf,users:e.target.value})}/>
            </div>
            <div className="col-span-2">
              <Label>Problem you're solving *</Label>
              <Textarea placeholder="Describe the pain point clearly…" value={sf.problem} onChange={e=>setSf({...sf,problem:e.target.value})}/>
            </div>
            <div className="col-span-2">
              <Label>Your solution *</Label>
              <Textarea placeholder="How do you solve it?" value={sf.solution} onChange={e=>setSf({...sf,solution:e.target.value})}/>
            </div>
            <div className="col-span-2">
              <Label>Current Status</Label>
              <Select value={sf.status} onChange={e=>setSf({...sf,status:e.target.value})}>
                {Object.entries(STATUS_CONFIG).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
              </Select>
            </div>
          </div>
          <div className="flex gap-3 mt-5 pt-5 border-t border-slate-100">
            <Btn variant="ghost" className="flex-1" onClick={() => setShowStartupForm(false)}>Cancel</Btn>
            <Btn variant="primary" className="flex-1" onClick={createStartup}>{Icon.rocket} Create Workspace</Btn>
          </div>
        </Modal>
      )}

      {showGoalForm && (
        <Modal title="Add Goal" icon="🎯" onClose={() => setShowGoalForm(false)}>
          <div className="space-y-4">
            <div>
              <Label>Goal Title *</Label>
              <Input placeholder="e.g. Launch MVP by Q2" value={gf.title} onChange={e=>setGf({...gf,title:e.target.value})}/>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea placeholder="What does success look like?" value={gf.description} onChange={e=>setGf({...gf,description:e.target.value})}/>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Timeline (days) *</Label>
                <Input type="number" placeholder="30" value={gf.days} onChange={e=>setGf({...gf,days:e.target.value})}/>
              </div>
              <div>
                <Label>Priority</Label>
                <Select value={gf.priority} onChange={e=>setGf({...gf,priority:e.target.value})}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-5 pt-5 border-t border-slate-100">
            <Btn variant="ghost" className="flex-1" onClick={() => setShowGoalForm(false)}>Cancel</Btn>
            <Btn variant="primary" className="flex-1" onClick={createGoal}>{Icon.plus} Add Goal</Btn>
          </div>
        </Modal>
      )}

      {showTaskForm && (
        <Modal title="Add Task" icon="📋" onClose={() => setShowTaskForm(false)}>
          <div className="space-y-4">
            <div>
              <Label>Task Title *</Label>
              <Input placeholder="e.g. Set up authentication" value={tf.title} onChange={e=>setTf({...tf,title:e.target.value})}/>
            </div>
            <div>
              <Label>Assign To *</Label>
              <Input placeholder="Team member name" value={tf.assignedTo} onChange={e=>setTf({...tf,assignedTo:e.target.value})}/>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Priority</Label>
                <Select value={tf.priority} onChange={e=>setTf({...tf,priority:e.target.value})}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </div>
              <div>
                <Label>Due Date</Label>
                <Input type="date" value={tf.dueDate} onChange={e=>setTf({...tf,dueDate:e.target.value})}/>
              </div>
            </div>
            <div>
              <Label>Goal *</Label>
              <Select value={tf.goalId || selectedGoalId || ""} onChange={e=>setTf({...tf,goalId:e.target.value})}>
                <option value="">Select a goal…</option>
                {startupGoals.map(g => <option key={g.id} value={g.id}>{g.title}</option>)}
              </Select>
            </div>
          </div>
          <div className="flex gap-3 mt-5 pt-5 border-t border-slate-100">
            <Btn variant="ghost" className="flex-1" onClick={() => setShowTaskForm(false)}>Cancel</Btn>
            <Btn variant="primary" className="flex-1" onClick={createTask}>{Icon.plus} Add Task</Btn>
          </div>
        </Modal>
      )}

      {showNoteForm && (
        <Modal title="Add Note" icon="📝" onClose={() => setShowNoteForm(false)}>
          <div className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input placeholder="Note heading" value={nf.title} onChange={e=>setNf({...nf,title:e.target.value})}/>
            </div>
            <div>
              <Label>Content *</Label>
              <Textarea placeholder="Write your thoughts, ideas, risks…" value={nf.body} onChange={e=>setNf({...nf,body:e.target.value})}/>
            </div>
            <div>
              <Label>Category</Label>
              <Select value={nf.tag} onChange={e=>setNf({...nf,tag:e.target.value})}>
                <option value="general">General</option>
                <option value="idea">Idea</option>
                <option value="risk">Risk</option>
                <option value="investor">Investor</option>
                <option value="market">Market</option>
              </Select>
            </div>
          </div>
          <div className="flex gap-3 mt-5 pt-5 border-t border-slate-100">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="modal-in w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-900/15 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{icon}</span>
            <h3 className="font-extrabold text-slate-800 text-base" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}