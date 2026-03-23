import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";

/* ══════════════════════════════════════════
   ICONS
══════════════════════════════════════════ */
const Icons = {
  logo: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 4.5h10M8 4.5v7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="8" cy="11" r="1.5" fill="white"/>
    </svg>
  ),
  arrow: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
    </svg>
  ),
  check: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
    </svg>
  ),
  target: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" strokeWidth={2}/><circle cx="12" cy="12" r="4" strokeWidth={2}/>
      <circle cx="12" cy="12" r="1" fill="currentColor"/>
    </svg>
  ),
  task: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
    </svg>
  ),
  team: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  ),
  chart: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
    </svg>
  ),
  note: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
    </svg>
  ),
  zap: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>
  ),
  shield: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
    </svg>
  ),
  star: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  menu: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
  ),
  x: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
    </svg>
  ),
};

/* ══════════════════════════════════════════
   HOOK: Intersection Observer for scroll animations
══════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ══════════════════════════════════════════
   MOCK DASHBOARD PREVIEW
══════════════════════════════════════════ */
const DashboardPreview = () => (
  <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-900/10 bg-white">
    {/* Window chrome */}
    <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-50 border-b border-slate-200">
      <span className="w-3 h-3 rounded-full bg-red-400"/>
      <span className="w-3 h-3 rounded-full bg-amber-400"/>
      <span className="w-3 h-3 rounded-full bg-green-400"/>
      <span className="ml-3 flex-1 bg-white border border-slate-200 rounded-md px-3 py-1 text-[10px] text-slate-400 font-mono max-w-[200px]">app.tasko.io/dashboard</span>
    </div>

    <div className="flex h-[340px] overflow-hidden">
      {/* Sidebar */}
      <div className="w-44 flex-shrink-0 border-r border-slate-100 bg-white px-3 py-3">
        <div className="flex items-center gap-2 px-2 mb-4">
          <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path d="M3 4.5h10M8 4.5v7" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="8" cy="11" r="1.5" fill="white"/>
            </svg>
          </div>
          <span className="text-xs font-extrabold text-slate-800">tasko</span>
          <span className="ml-auto text-[8px] font-bold text-indigo-600 bg-indigo-50 px-1 rounded">BETA</span>
        </div>
        <div className="space-y-0.5 mb-4">
          {[
            { label:"Acme AI", active: true },
            { label:"GrowthOS", active: false },
            { label:"ShipFast", active: false },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer ${item.active ? "bg-indigo-50 text-indigo-700" : "text-slate-500 hover:bg-slate-50"}`}>
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.active ? "bg-indigo-500" : "bg-slate-300"}`}/>
              <span className="text-[11px] font-semibold truncate">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="px-2">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Global</p>
          <div className="grid grid-cols-3 gap-1 text-center">
            {[{ v:3,l:"Startups"},{v:12,l:"Goals"},{v:8,l:"Done"}].map((s,i)=>(
              <div key={i} className="bg-slate-50 border border-slate-200 rounded py-1">
                <div className="text-[11px] font-extrabold text-slate-700">{s.v}</div>
                <div className="text-[8px] text-slate-400">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden bg-slate-50 p-4">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-slate-800">Acme AI</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"/>Active
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {["Overview","Goals","Tasks","Notes"].map((t,i) => (
              <span key={i} className={`text-[10px] font-semibold px-2.5 py-1 rounded-md cursor-pointer transition-all ${i===0 ? "text-indigo-700 border-b-2 border-indigo-600" : "text-slate-500"}`}>{t}</span>
            ))}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[
            { label:"Goals",    val:"6",   color:"text-indigo-700", bg:"bg-indigo-100" },
            { label:"Tasks",    val:"24",  color:"text-teal-700",   bg:"bg-teal-100"   },
            { label:"Done",     val:"18",  color:"text-green-700",  bg:"bg-green-100"  },
            { label:"Progress", val:"75%", color:"text-amber-700",  bg:"bg-amber-100"  },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-3">
              <div className={`text-[9px] font-bold uppercase tracking-wider ${s.color} mb-1`}>{s.label}</div>
              <div className={`text-lg font-extrabold ${s.color}`}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 mb-3">
          <div className="flex justify-between mb-1.5">
            <span className="text-[10px] font-bold text-slate-600">Overall Progress</span>
            <span className="text-[10px] font-bold text-indigo-700">75%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-teal-400 rounded-full" style={{ width:"75%" }}/>
          </div>
        </div>

        {/* Tasks list */}
        <div className="bg-white border border-slate-200 rounded-xl p-3">
          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">Recent Tasks</p>
          <div className="space-y-1.5">
            {[
              { title:"Set up CI/CD pipeline",     done:true,  who:"Aryan"  },
              { title:"Design onboarding flow",    done:true,  who:"Priya"  },
              { title:"Integrate payment gateway", done:false, who:"Rahul"  },
              { title:"Write API documentation",   done:false, who:"Aryan"  },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-3.5 h-3.5 rounded border-[1.5px] flex items-center justify-center flex-shrink-0 ${t.done ? "bg-green-500 border-green-500" : "border-slate-300"}`}>
                  {t.done && <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span className={`text-[10px] flex-1 font-medium ${t.done ? "line-through text-slate-400" : "text-slate-700"}`}>{t.title}</span>
                <div className={`w-4 h-4 rounded-full text-[8px] font-bold flex items-center justify-center text-white flex-shrink-0 ${["bg-indigo-500","bg-teal-500","bg-amber-500","bg-rose-500"][i]}`}>{t.who[0]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════ */
const Counter = ({ to, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.5);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

/* ══════════════════════════════════════════
   FEATURE CARD
══════════════════════════════════════════ */
const FeatureCard = ({ icon, title, desc, accent, delay }) => {
  const [ref, inView] = useInView();
  const accents = {
    indigo: "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
    teal:   "bg-teal-100   text-teal-600   group-hover:bg-teal-600   group-hover:text-white",
    amber:  "bg-amber-100  text-amber-600  group-hover:bg-amber-600  group-hover:text-white",
    violet: "bg-violet-100 text-violet-600 group-hover:bg-violet-600 group-hover:text-white",
    rose:   "bg-rose-100   text-rose-600   group-hover:bg-rose-600   group-hover:text-white",
    green:  "bg-green-100  text-green-600  group-hover:bg-green-600  group-hover:text-white",
  };
  return (
    <div
      ref={ref}
      className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/40 transition-all duration-300 cursor-default"
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `opacity .5s ease ${delay}ms, transform .5s cubic-bezier(.22,.61,.36,1) ${delay}ms` }}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${accents[accent]}`}>
        {icon}
      </div>
      <h3 className="font-extrabold text-slate-800 mb-2 text-base" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
};

/* ══════════════════════════════════════════
   TESTIMONIAL
══════════════════════════════════════════ */
const TestimonialCard = ({ quote, name, role, company, avatar, delay }) => {
  const [ref, inView] = useInView();
  const colors = ["bg-indigo-500","bg-teal-500","bg-amber-500","bg-rose-500","bg-violet-500"];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div
      ref={ref}
      className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-slate-300 transition-all duration-300"
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `opacity .5s ease ${delay}ms, transform .5s cubic-bezier(.22,.61,.36,1) ${delay}ms` }}
    >
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_,i) => <span key={i} className="text-amber-400">{Icons.star}</span>)}
      </div>
      <p className="text-sm text-slate-600 leading-relaxed mb-5 italic">"{quote}"</p>
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full ${colors[idx]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>{name[0]}</div>
        <div>
          <p className="text-sm font-bold text-slate-800">{name}</p>
          <p className="text-xs text-slate-400">{role} · {company}</p>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   STEP CARD
══════════════════════════════════════════ */
const StepCard = ({ num, title, desc, delay }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className="flex gap-5"
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `opacity .5s ease ${delay}ms, transform .5s cubic-bezier(.22,.61,.36,1) ${delay}ms` }}
    >
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-indigo-200" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>{num}</div>
        {num < 4 && <div className="w-px flex-1 mt-2 bg-gradient-to-b from-indigo-200 to-transparent min-h-[40px]"/>}
      </div>
      <div className="pb-8">
        <h3 className="font-extrabold text-slate-800 mb-1.5 text-base" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [heroRef, heroInView] = useInView(0.1);

  return (
    <div className="min-h-screen bg-white text-slate-800 overflow-x-hidden" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Bricolage+Grotesque:wght@700;800&display=swap');

        @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes floatUp  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes slideDown{ from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:.5} }

        .anim-fade-up  { animation: fadeUp  .6s cubic-bezier(.22,.61,.36,1) both; }
        .anim-fade-in  { animation: fadeIn  .8s ease both; }
        .anim-float    { animation: floatUp 4s ease-in-out infinite; }
        .anim-slide-down { animation: slideDown .25s ease both; }

        .hero-headline {
          background: linear-gradient(135deg, #1e293b 0%, #1e293b 40%, #4f46e5 70%, #0d9488 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-border {
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(135deg, #6366f1, #14b8a6) border-box;
          border: 1.5px solid transparent;
        }

        .badge-pill {
          background: linear-gradient(135deg, #eef2ff, #f0fdfa);
          border: 1px solid #c7d2fe;
        }

        .hero-glow {
          background: radial-gradient(ellipse 800px 400px at 50% 0%, rgba(99,102,241,0.07) 0%, transparent 70%);
        }

        .dot-pattern {
          background-image: radial-gradient(circle, #cbd5e1 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .cta-btn-primary {
          background: #4f46e5;
          box-shadow: 0 4px 16px rgba(79,70,229,0.35), 0 1px 3px rgba(0,0,0,0.1);
          transition: all .2s ease;
        }
        .cta-btn-primary:hover {
          background: #4338ca;
          box-shadow: 0 6px 24px rgba(79,70,229,0.45), 0 2px 6px rgba(0,0,0,0.1);
          transform: translateY(-1px);
        }

        .nav-glass {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; }

        @media (min-width: 1024px) {
          .feature-grid { grid-template-columns: repeat(3, 1fr); }
        }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #f8fafc; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; }
      `}</style>

      {/* ══ NAVBAR ══ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-glass border-b border-slate-200/80 shadow-sm shadow-slate-900/5" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-300/40">
              {Icons.logo}
            </div>
            <span className="text-lg font-extrabold text-slate-800 tracking-tight" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>tasko</span>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded hidden sm:inline">BETA</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {["Features","How it works","Testimonials"].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-3.5 py-2 text-sm font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-150"
              >{item}</a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-800 px-3.5 py-2 rounded-lg hover:bg-slate-100 transition-all">
              Log in
            </Link>
            <Link
              to="/project"
              className="cta-btn-primary text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-1.5"
            >
              Get started free {Icons.arrow}
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? Icons.x : Icons.menu}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden anim-slide-down bg-white border-b border-slate-200 px-6 py-4 space-y-2">
            {["Features","How it works","Testimonials"].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
              >{item}</a>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link to="/login" className="block px-3 py-2.5 text-sm font-semibold text-slate-600 text-center border border-slate-200 rounded-lg">Log in</Link>
              <Link to="/app" className="block px-3 py-2.5 text-sm font-bold text-white text-center bg-indigo-600 rounded-lg">Get started free</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ══ HERO ══ */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 hero-glow pointer-events-none"/>
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none"/>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-teal-50/80 to-transparent pointer-events-none rounded-full blur-3xl"/>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-50/60 to-transparent pointer-events-none rounded-full blur-3xl"/>

        <div className="relative max-w-6xl mx-auto" ref={heroRef}>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 badge-pill px-4 py-2 rounded-full text-sm font-semibold text-indigo-700 mb-8 mx-auto block w-fit"
            style={{ opacity: heroInView ? 1 : 0, animation: heroInView ? "fadeUp .5s ease both" : "none" }}
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse inline-block"/>
            Built for founders who move fast
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-center leading-[1.08] tracking-tight mb-6 hero-headline max-w-4xl mx-auto"
            style={{ fontFamily:"'Bricolage Grotesque',sans-serif", opacity: heroInView ? 1 : 0, animation: heroInView ? "fadeUp .6s .1s ease both" : "none" }}
          >
            Run your startup.<br/>
            <span>Not your tools.</span>
          </h1>

          {/* Sub */}
          <p
            className="text-lg md:text-xl text-slate-500 text-center max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ opacity: heroInView ? 1 : 0, animation: heroInView ? "fadeUp .6s .2s ease both" : "none" }}
          >
            tasko gives every early-stage team a single workspace to define goals, ship tasks, and stay in sync — without the complexity of enterprise tools.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14"
            style={{ opacity: heroInView ? 1 : 0, animation: heroInView ? "fadeUp .6s .3s ease both" : "none" }}
          >
            <Link
              to="/project"
              className="cta-btn-primary text-white font-bold px-7 py-3.5 rounded-xl flex items-center gap-2 text-base w-full sm:w-auto justify-center"
            >
              Start for free {Icons.arrow}
            </Link>
            <Link
              to="/project"
              className="gradient-border bg-white text-slate-700 font-bold px-7 py-3.5 rounded-xl flex items-center gap-2 text-base hover:bg-slate-50 transition-all w-full sm:w-auto justify-center"
            >
              Watch demo
              <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </Link>
          </div>

          {/* Social proof bar */}
          <div
            className="flex items-center justify-center gap-6 flex-wrap mb-14"
            style={{ opacity: heroInView ? 1 : 0, animation: heroInView ? "fadeUp .6s .4s ease both" : "none" }}
          >
            <div className="flex items-center gap-1">
              {["A","P","R","K","S"].map((l,i) => (
                <div key={i} className={`w-7 h-7 rounded-full border-2 border-white text-[11px] font-bold text-white flex items-center justify-center -ml-1.5 first:ml-0 ${["bg-indigo-500","bg-teal-500","bg-amber-500","bg-rose-500","bg-violet-500"][i]}`}>{l}</div>
              ))}
              <span className="ml-2 text-sm text-slate-500 font-semibold">+2,400 founders</span>
            </div>
            <span className="w-px h-4 bg-slate-200 hidden sm:block"/>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_,i) => <span key={i} className="text-amber-400 text-sm">{Icons.star}</span>)}
            </div>
            <span className="text-sm font-semibold text-slate-500">4.9/5 from 180+ reviews</span>
            <span className="w-px h-4 bg-slate-200 hidden sm:block"/>
            <span className="text-sm text-slate-500 font-semibold">No credit card needed</span>
          </div>

          {/* Dashboard preview */}
          <div
            className="anim-float max-w-4xl mx-auto"
            style={{ opacity: heroInView ? 1 : 0, animation: heroInView ? "fadeUp .7s .5s ease both, floatUp 4s 1s ease-in-out infinite" : "none" }}
          >
            <DashboardPreview />
            {/* Glow under preview */}
            <div className="h-16 bg-gradient-to-b from-slate-900/8 to-transparent blur-2xl -mt-4 mx-8 rounded-full"/>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="py-16 border-y border-slate-100 bg-slate-50/70">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val:2400, suffix:"+", label:"Founders using tasko",   color:"text-indigo-700" },
              { val:18000, suffix:"+",label:"Tasks completed",         color:"text-teal-700"   },
              { val:99,   suffix:"%", label:"Uptime guaranteed",       color:"text-green-700"  },
              { val:4,    suffix:"x", label:"Faster than spreadsheets",color:"text-amber-700"  },
            ].map((s, i) => (
              <div key={i}>
                <div className={`text-4xl font-extrabold mb-1 ${s.color}`} style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>
                  <Counter to={s.val} suffix={s.suffix}/>
                </div>
                <p className="text-sm text-slate-500 font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-4 py-1.5 rounded-full mb-4">
              ⚡ Everything you need
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>
              From idea to launch,<br/>we've got you covered
            </h2>
            <p className="text-base text-slate-500 leading-relaxed">
              tasko replaces the chaos of scattered docs, Notion pages, and Trello boards with one opinionated workspace built for startup velocity.
            </p>
          </div>

          <div className="feature-grid">
            {[
              { icon: Icons.zap,    title:"Goal Tracking",      desc:"Break your vision into 30/60/90-day goals with priority levels, timelines, and live progress tracking.", accent:"indigo", delay:0   },
              { icon: Icons.task,   title:"Task Management",    desc:"Assign tasks to team members with due dates, priorities, and goal-linked context. No more lost to-dos.", accent:"teal",   delay:75  },
              { icon: Icons.team,   title:"Team Overview",      desc:"See every team member's workload, completion rate, and pending items at a glance. No micromanagement needed.", accent:"amber",  delay:150 },
              { icon: Icons.note,   title:"Notes & Ideas",      desc:"Capture ideas, risks, investor notes, and market insights in context — tagged and linked to your startup.", accent:"violet", delay:0   },
              { icon: Icons.chart,  title:"Progress Analytics", desc:"Visual dashboards show real-time progress across all goals and tasks so you always know where you stand.", accent:"green",  delay:75  },
              { icon: Icons.shield, title:"Focused Workspace",  desc:"One workspace per startup. Laser-focused, no noise. Built for teams of 1–15 who need speed over complexity.", accent:"rose",   delay:150 },
            ].map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="how-it-works" className="py-24 px-6 bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-teal-600 bg-teal-50 border border-teal-200 px-4 py-1.5 rounded-full mb-6">
                🗺️ How it works
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 leading-tight" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>
                Up and running<br/>in minutes
              </h2>
              <p className="text-base text-slate-500 mb-10 leading-relaxed">
                No onboarding calls, no 50-page docs. Create your workspace, define your goals, and start shipping.
              </p>
              <div>
                <StepCard num={1} title="Create your startup workspace" desc="Register your startup with a name, problem statement, solution, and team. Takes under 2 minutes." delay={0}/>
                <StepCard num={2} title="Define milestones as Goals" desc="Break your roadmap into focused goals with clear timelines, priorities, and success criteria." delay={100}/>
                <StepCard num={3} title="Add tasks and assign owners" desc="Attach specific tasks to each goal, assign them to teammates, and set due dates." delay={200}/>
                <StepCard num={4} title="Ship and track progress" desc="Check off tasks, watch progress bars fill up, and get a bird's-eye view of your entire startup." delay={300}/>
              </div>
            </div>

            {/* Right side: mini feature tiles */}
            <div className="space-y-4">
              {[
                {
                  icon:"🎯", title:"Goal: Launch MVP",
                  tags:["High Priority","30 days"], progress:72,
                  tasks:[
                    { t:"Build auth system",    done:true  },
                    { t:"Design dashboard UI",  done:true  },
                    { t:"Integrate Stripe",     done:false },
                    { t:"Write onboarding copy",done:false },
                  ]
                },
                {
                  icon:"📢", title:"Goal: First 100 Users",
                  tags:["Medium Priority","60 days"], progress:30,
                  tasks:[
                    { t:"Launch Product Hunt",    done:true  },
                    { t:"Set up drip campaign",   done:false },
                    { t:"Cold email 50 prospects",done:false },
                  ]
                }
              ].map((goal, gi) => {
                const [ref, inView] = useInView();
                return (
                  <div
                    key={gi}
                    ref={ref}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300"
                    style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(20px)", transition: `opacity .5s ease ${gi * 150}ms, transform .5s cubic-bezier(.22,.61,.36,1) ${gi * 150}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{goal.icon}</span>
                        <span className="font-extrabold text-slate-800 text-sm" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>{goal.title}</span>
                      </div>
                      <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">{goal.progress}%</span>
                    </div>
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {goal.tags.map((tag, ti) => (
                        <span key={ti} className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full mb-3">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-teal-400 rounded-full transition-all duration-1000" style={{ width:`${goal.progress}%` }}/>
                    </div>
                    <div className="space-y-1.5">
                      {goal.tasks.map((task, ti) => (
                        <div key={ti} className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded border-[1.5px] flex items-center justify-center flex-shrink-0 ${task.done ? "bg-green-500 border-green-500" : "border-slate-300"}`}>
                            {task.done && <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                          </div>
                          <span className={`text-xs font-medium ${task.done ? "line-through text-slate-400" : "text-slate-600"}`}>{task.t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 bg-amber-50 border border-amber-200 px-4 py-1.5 rounded-full mb-4">
              ⭐ Loved by founders
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>
              What founders are saying
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { quote:"We ditched Jira and Notion for tasko. Everything is exactly where it needs to be. Our velocity doubled in the first month.", name:"Aryan Mehta", role:"CEO & Co-founder", company:"Acme AI", delay:0 },
              { quote:"Finally a tool that thinks like a startup founder. No bloat, no setup time. We were shipping tasks on day one.", name:"Priya Sharma", role:"Founder", company:"GrowthOS", delay:100 },
              { quote:"The goal + task linking is genius. I can always trace any task back to why we're building it. Total clarity.", name:"Rahul Verma", role:"CTO", company:"ShipFast", delay:200 },
              { quote:"tasko replaced our entire ops stack. Monday boards, Notion docs, sticky notes — all gone. We live in tasko now.", name:"Kavya Nair", role:"Product Lead", company:"Loopify", delay:0 },
              { quote:"The team dashboard is incredible. I know every morning exactly what everyone is working on without a standup call.", name:"Sameer Patel", role:"Co-founder", company:"PitchDeck AI", delay:100 },
              { quote:"I've tried Linear, Asana, Basecamp. tasko is the first tool that actually fits the early-stage mindset. Highly recommend.", name:"Nisha Roy", role:"Solo founder", company:"Mintly", delay:200 },
            ].map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ COMPARISON ══ */}
      <section className="py-20 px-6 bg-slate-50/80 border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>
              Why startups choose tasko
            </h2>
            <p className="text-slate-500 mt-3 text-base">vs. generic project management tools</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-bold text-slate-600 w-1/3">Feature</th>
                  <th className="py-3 px-4 font-extrabold text-indigo-700 text-center w-1/4">
                    <div className="inline-flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center">
                        {Icons.logo}
                      </div>
                      tasko
                    </div>
                  </th>
                  <th className="py-3 px-4 font-semibold text-slate-400 text-center w-1/4">Jira</th>
                  <th className="py-3 px-4 font-semibold text-slate-400 text-center w-1/4">Notion</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Built for startups",       true,  false, false],
                  ["Goal-to-task linking",      true,  false, false],
                  ["Setup in minutes",          true,  false, true ],
                  ["Team workload overview",    true,  true,  false],
                  ["Progress tracking",         true,  true,  false],
                  ["Free for early teams",      true,  false, true ],
                  ["No enterprise complexity",  true,  false, true ],
                ].map(([feat, t, j, n], i) => (
                  <tr key={i} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
                    <td className="py-3 px-4 font-semibold text-slate-700">{feat}</td>
                    {[t, j, n].map((val, vi) => (
                      <td key={vi} className="py-3 px-4 text-center">
                        {val
                          ? <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600">{Icons.check}</span>
                          : <span className="inline-block w-4 h-0.5 bg-slate-300 rounded mx-auto"/>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══ CTA SECTION ══ */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-teal-700 pointer-events-none"/>
        <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none"/>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl pointer-events-none"/>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-400/20 rounded-full blur-3xl pointer-events-none"/>

        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-indigo-200 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-6">
            🚀 Free forever for small teams
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>
            Ready to build<br/>your next big thing?
          </h2>
          <p className="text-lg text-indigo-200 mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands of founders who replaced their messy tools with tasko. Free to start, simple to scale.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/project"
              className="bg-white text-indigo-700 font-extrabold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-all flex items-center gap-2 text-base w-full sm:w-auto justify-center shadow-xl shadow-black/20 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] duration-200"
              style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}
            >
              Create free workspace {Icons.arrow}
            </Link>
            <Link
              to="/login"
              className="border-2 border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-base w-full sm:w-auto justify-center flex items-center gap-2 duration-200"
            >
              Already have an account?
            </Link>
          </div>
          {/* Trust signals */}
          <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
            {["No credit card needed","Free for teams up to 5","Cancel anytime"].map((t, i) => (
              <div key={i} className="flex items-center gap-1.5 text-sm text-indigo-200 font-semibold">
                <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-white flex-shrink-0">{Icons.check}</span>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  {Icons.logo}
                </div>
                <span className="text-base font-extrabold text-white" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>tasko</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                The startup workspace built for founders who move fast.
              </p>
              <div className="flex gap-2">
                {["twitter","linkedin","github"].map(s => (
                  <a key={s} href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-white transition-all capitalize text-xs font-bold">
                    {s[0].toUpperCase()}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title:"Product", links:["Features","Changelog","Roadmap","Pricing"] },
              { title:"Company", links:["About","Blog","Careers","Press"] },
              { title:"Legal",   links:["Privacy","Terms","Security","Cookies"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(l => (
                    <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-slate-600">© {new Date().getFullYear()} tasko. Made with ❤️ for startup founders.</p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
              <span className="text-xs text-slate-500 font-semibold">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}