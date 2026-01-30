import { useState, useEffect } from "react";

const ROLES = ["Frontend", "Backend", "AI", "Design", "Lead"];
const STATUSES = ["Planning", "Building", "Review", "Done"];

export default function ProjectSystem() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("tasko-pms");
    return saved ? JSON.parse(saved) : [];
  });

  const [active, setActive] = useState(null);
  const [name, setName] = useState("");
  const [stack, setStack] = useState("");
  const [member, setMember] = useState("");
  const [role, setRole] = useState(ROLES[0]);
  const [milestone, setMilestone] = useState("");

  useEffect(() => {
    localStorage.setItem("tasko-pms", JSON.stringify(projects));
  }, [projects]);

  const createProject = () => {
    if (!name.trim()) return;
    setProjects(p => [
      ...p,
      {
        id: Date.now(),
        name,
        stack,
        team: [],
        milestones: [],
      },
    ]);
    setName("");
    setStack("");
  };

  const deleteProject = (id) => {
    setProjects(p => p.filter(pr => pr.id !== id));
    if (active === id) setActive(null);
  };

  const updateProject = (cb) => {
    setProjects(p =>
      p.map(pr => (pr.id === active ? cb(pr) : pr))
    );
  };

  const addMember = () => {
    if (!member.trim()) return;
    updateProject(pr => ({
      ...pr,
      team: [...pr.team, { id: Date.now(), name: member, role }],
    }));
    setMember("");
  };

  const removeMember = (id) => {
    updateProject(pr => ({
      ...pr,
      team: pr.team.filter(m => m.id !== id),
    }));
  };

  const addMilestone = () => {
    if (!milestone.trim()) return;
    updateProject(pr => ({
      ...pr,
      milestones: [
        ...pr.milestones,
        { id: Date.now(), title: milestone, status: STATUSES[0] },
      ],
    }));
    setMilestone("");
  };

  const removeMilestone = (id) => {
    updateProject(pr => ({
      ...pr,
      milestones: pr.milestones.filter(m => m.id !== id),
    }));
  };

  const activeProject = projects.find(p => p.id === active);

  return (
    <section className="min-h-screen bg-[#07070d] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* HEADER */}
        <header className="mb-16">
          <h1 className="text-3xl font-semibold">Projects</h1>
          <p className="text-white/40 mt-2">
            Minimal project management for focused teams
          </p>
        </header>

        {/* CREATE PROJECT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          <input
            className="bg-white/5 px-4 py-3 rounded-lg outline-none focus:ring-1 focus:ring-white/30"
            placeholder="Project name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="bg-white/5 px-4 py-3 rounded-lg outline-none focus:ring-1 focus:ring-white/30"
            placeholder="Tech stack"
            value={stack}
            onChange={e => setStack(e.target.value)}
          />
          <button
            onClick={createProject}
            className="bg-white text-black rounded-lg py-3 font-medium hover:bg-white/90 transition"
          >
            Create Project
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* PROJECT LIST */}
          <aside className="lg:col-span-4 space-y-4">
            {projects.map(p => (
              <div
                key={p.id}
                className={`p-5 rounded-xl border transition cursor-pointer ${
                  active === p.id
                    ? "border-white/30 bg-white/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div onClick={() => setActive(p.id)}>
                  <h3 className="text-lg font-medium">{p.name}</h3>
                  <p className="text-sm text-white/40">
                    {p.stack || "No stack"}
                  </p>
                </div>

                <button
                  onClick={() => deleteProject(p.id)}
                  className="mt-4 text-xs text-red-400 hover:text-red-300"
                >
                  Delete Project
                </button>
              </div>
            ))}
          </aside>

          {/* WORKSPACE */}
          <main className="lg:col-span-8">
            {!activeProject ? (
              <p className="text-white/40 text-lg">
                Select a project to start working
              </p>
            ) : (
              <div className="space-y-14">

                {/* TITLE */}
                <section>
                  <h2 className="text-2xl font-semibold">
                    {activeProject.name}
                  </h2>
                  <p className="text-white/40 mt-1">
                    {activeProject.stack}
                  </p>
                </section>

                {/* TEAM */}
                <section>
                  <p className="text-sm text-white/40 mb-4">Team</p>

                  <div className="flex flex-wrap gap-3 mb-4">
                    {activeProject.team.map(m => (
                      <div
                        key={m.id}
                        className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{m.name} · {m.role}</span>
                        <button
                          onClick={() => removeMember(m.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    <input
                      className="bg-white/5 px-3 py-2 rounded-lg text-sm"
                      placeholder="Name"
                      value={member}
                      onChange={e => setMember(e.target.value)}
                    />
                    <select
                      className="bg-white/5 px-3 py-2 rounded-lg text-sm"
                      value={role}
                      onChange={e => setRole(e.target.value)}
                    >
                      {ROLES.map(r => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                    <button
                      onClick={addMember}
                      className="px-4 py-2 rounded-lg bg-white text-black text-sm"
                    >
                      Add Member
                    </button>
                  </div>
                </section>

                {/* MILESTONES */}
                <section>
                  <p className="text-sm text-white/40 mb-4">Milestones</p>

                  <div className="space-y-3 mb-4">
                    {activeProject.milestones.map(m => (
                      <div
                        key={m.id}
                        className="flex justify-between items-center bg-white/5 px-4 py-3 rounded-lg"
                      >
                        <span>{m.title}</span>
                        <button
                          onClick={() => removeMilestone(m.id)}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <input
                      className="bg-white/5 px-3 py-2 rounded-lg text-sm"
                      placeholder="New milestone"
                      value={milestone}
                      onChange={e => setMilestone(e.target.value)}
                    />
                    <button
                      onClick={addMilestone}
                      className="px-4 py-2 rounded-lg bg-white text-black text-sm"
                    >
                      Add
                    </button>
                  </div>
                </section>

              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
