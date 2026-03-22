/**
 * Dashboard Page
 * Displays logged-in user info, protected route
 */
import { Link, useNavigate } from 'react-router';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = { name: "Guest", email: "guest@tasko.local" };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#080810]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
      `}</style>

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d1a]/80 backdrop-blur-2xl border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 3.5h12M8 3.5v9" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="8" cy="12" r="1.5" fill="white" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                tasko
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-300 border border-white/10 hover:bg-white/5 hover:text-white transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 lg:p-12 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                Hello, {user?.name || 'User'}!
              </h1>
              <p className="text-zinc-400 mt-0.5">Welcome to your dashboard</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
              <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3">Account Information</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-xs text-zinc-500">Name</dt>
                  <dd className="text-white font-medium">{user?.name}</dd>
                </div>
                <div>
                  <dt className="text-xs text-zinc-500">Email</dt>
                  <dd className="text-white font-medium">{user?.email}</dd>
                </div>
                <div>
                  <dt className="text-xs text-zinc-500">Member since</dt>
                  <dd className="text-zinc-400">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : '—'}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/project"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-500 hover:shadow-[0_0_24px_rgba(139,92,246,0.4)] transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Open Projects
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-zinc-300 border border-white/10 hover:bg-white/5 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
