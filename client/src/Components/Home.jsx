import { useState, useEffect } from "react";

const ROLES = ["Frontend", "Backend", "AI", "Design", "Lead"];
const STATUSES = ["Planning", "Building", "Review", "Done"];

export default function ProjectSystem() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("tasko-pms");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeId, setActiveId] = useState(null);

  const [projectName, setProjectName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState(ROLES[0]);
  const [milestone, setMilestone] = useState("");

  useEffect(() => {
    localStorage.setItem("tasko-pms", JSON.stringify(projects));
  }, [projects]);

  const activeProject = projects.find(p => p.id === activeId);

  /* ---------- PROJECT ---------- */
  const createProject = () => {
    if (!projectName.trim()) return;

    setProjects([
      ...projects,
      {
        id: Date.now(),
        name: projectName,
        team: [],
        milestones: [],
      },
    ]);

    setProjectName("");
  };

  /* ---------- TEAM ---------- */
  const addMember = () => {
    if (!memberName.trim()) return;

    setProjects(projects.map(p =>
      p.id === activeId
        ? {
            ...p,
            team: [...p.team, { id: Date.now(), name: memberName, role: memberRole }],
          }
        : p
    ));

    setMemberName("");
  };

  const removeMember = (id) => {
    setProjects(projects.map(p =>
      p.id === activeId
        ? { ...p, team: p.team.filter(m => m.id !== id) }
        : p
    ));
  };

  /* ---------- MILESTONE ---------- */
  const addMilestone = () => {
    if (!milestone.trim()) return;

    setProjects(projects.map(p =>
      p.id === activeId
        ? {
            ...p,
            milestones: [
              ...p.milestones,
              { id: Date.now(), title: milestone, status: STATUSES[0] },
            ],
          }
        : p
    ));

    setMilestone("");
  };

  const removeMilestone = (id) => {
    setProjects(projects.map(p =>
      p.id === activeId
        ? { ...p, milestones: p.milestones.filter(m => m.id !== id) }
        : p
    ));
  };

  return (
    <section className="min-h-screen bg-[#07070d] text-white px-5 py-10">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <header className="mb-10">
          <h1 className="text-3xl font-semibold">Tasko Projects</h1>
          <p className="text-white/40 mt-1">
            Simple project management for developers
          </p>
        </header>

        {/* CREATE PROJECT */}
        <div className="flex gap-3 mb-12">
          <input
            className="flex-1 bg-white/5 px-4 py-3 rounded-lg outline-none"
            placeholder="Project name"
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
          />
          <button
            onClick={createProject}
            className="px-6 py-3 rounded-lg bg-white text-black font-medium"
          >
            Create
          </button>
        </div>

        {/* PROJECT LIST */}
        <div className="space-y-3 mb-12">
          {projects.map(p => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={`w-full text-left px-5 py-4 rounded-lg transition ${
                activeId === p.id
                  ? "bg-white text-black"
                  : "bg-white/5 hover:bg-white/10"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* EMPTY STATE */}
        {!activeProject && projects.length > 0 && (
          <p className="text-white/40">
            Select a project to manage it 👆
          </p>
        )}

        {/* PROJECT DETAILS */}
        {activeProject && (
          <div className="space-y-14">

            {/* PROJECT TITLE */}
            <div>
              <h2 className="text-2xl font-semibold">{activeProject.name}</h2>
              <p className="text-white/40 text-sm">
                Manage team & milestones
              </p>
            </div>

            {/* TEAM */}
            <section>
              <h3 className="text-lg font-medium mb-3">Team</h3>

              <div className="flex flex-wrap gap-3 mb-4">
                {activeProject.team.map(m => (
                  <div
                    key={m.id}
                    className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm"
                  >
                    <span>{m.name} · {m.role}</span>
                    <button
                      onClick={() => removeMember(m.id)}
                      className="text-red-400"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <input
                  className="bg-white/5 px-3 py-2 rounded-lg text-sm"
                  placeholder="Member name"
                  value={memberName}
                  onChange={e => setMemberName(e.target.value)}
                />
                <select
                  className="bg-white/5 px-3 py-2 rounded-lg text-sm"
                  value={memberRole}
                  onChange={e => setMemberRole(e.target.value)}
                >
                  {ROLES.map(r => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
                <button
                  onClick={addMember}
                  className="px-4 py-2 rounded-lg bg-white text-black text-sm"
                >
                  Add
                </button>
              </div>
            </section>

            {/* MILESTONES */}
            <section>
              <h3 className="text-lg font-medium mb-3">Milestones</h3>

              <div className="space-y-3 mb-4">
                {activeProject.milestones.map(m => (
                  <div
                    key={m.id}
                    className="flex justify-between items-center bg-white/5 px-4 py-3 rounded-lg"
                  >
                    <span>{m.title}</span>
                    <button
                      onClick={() => removeMilestone(m.id)}
                      className="text-xs text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <input
                  className="bg-white/5 px-3 py-2 rounded-lg text-sm flex-1"
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

      </div>
    </section>
  );
}
