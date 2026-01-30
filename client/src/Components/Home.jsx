import { useState, useEffect } from "react";

const ROLES = ["Frontend", "Backend", "AI", "Design", "Lead"];

export default function ProjectSystem() {
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("tasko-pms");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeId, setActiveId] = useState(null);

  const [projectName, setProjectName] = useState("");
  const [editingName, setEditingName] = useState(false);

  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState(ROLES[0]);

  const [taskTitle, setTaskTitle] = useState("");
  const [assigneeId, setAssigneeId] = useState("");

  const [goalTitle, setGoalTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("tasko-pms", JSON.stringify(projects));
    if (projects.length && !projects.find(p => p.id === activeId)) {
      setActiveId(projects[0].id);
    }
  }, [projects, activeId]);

  const activeProject = projects.find(p => p.id === activeId);

  /* ---------- PROJECT ---------- */
  const createProject = () => {
    if (!projectName.trim()) return;

    const p = {
      id: Date.now(),
      name: projectName,
      team: [],
      tasks: [],
      goals: [],
    };

    setProjects(prev => [...prev, p]);
    setActiveId(p.id);
    setProjectName("");
  };

  const updateProjectName = () => {
    setProjects(prev =>
      prev.map(p =>
        p.id === activeId ? { ...p, name: projectName } : p
      )
    );
    setEditingName(false);
  };

  /* ---------- TEAM ---------- */
  const addMember = () => {
    if (!memberName.trim()) return;

    setProjects(prev =>
      prev.map(p =>
        p.id === activeId
          ? {
              ...p,
              team: [...p.team, { id: Date.now(), name: memberName, role: memberRole }],
            }
          : p
      )
    );
    setMemberName("");
  };

  /* ---------- TASK ---------- */
  const addTask = () => {
    if (!taskTitle.trim() || !assigneeId) return;

    setProjects(prev =>
      prev.map(p =>
        p.id === activeId
          ? {
              ...p,
              tasks: [
                ...p.tasks,
                { id: Date.now(), title: taskTitle, assigneeId, done: false },
              ],
            }
          : p
      )
    );
    setTaskTitle("");
  };

  const toggleTask = (id) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === activeId
          ? {
              ...p,
              tasks: p.tasks.map(t =>
                t.id === id ? { ...t, done: !t.done } : t
              ),
            }
          : p
      )
    );
  };

  /* ---------- GOALS ---------- */
  const addGoal = () => {
    if (!goalTitle.trim()) return;

    setProjects(prev =>
      prev.map(p =>
        p.id === activeId
          ? {
              ...p,
              goals: [...p.goals, { id: Date.now(), title: goalTitle, done: false }],
            }
          : p
      )
    );
    setGoalTitle("");
  };

  const toggleGoal = (id) => {
    setProjects(prev =>
      prev.map(p =>
        p.id === activeId
          ? {
              ...p,
              goals: p.goals.map(g =>
                g.id === id ? { ...g, done: !g.done } : g
              ),
            }
          : p
      )
    );
  };

  /* ---------- ANALYTICS ---------- */
  const memberStats = (memberId) => {
    const tasks = activeProject.tasks.filter(t => t.assigneeId === memberId);
    const done = tasks.filter(t => t.done).length;
    return {
      total: tasks.length,
      done,
      percent: tasks.length ? Math.round((done / tasks.length) * 100) : 0,
    };
  };

  return (
    <section
    id="project-system"
    className="min-h-screen bg-[#07070d] text-white px-5 py-10"
  >
  
      <div className="max-w-6xl mx-auto space-y-14">

        {/* CREATE PROJECT */}
        <div className="flex gap-3">
          <input
            className="flex-1 bg-white/5 px-4 py-3 rounded-lg"
            placeholder="Project name"
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
          />
          <button onClick={createProject} className="bg-white text-black px-6 rounded-lg">
            Create
          </button>
        </div>

        {/* PROJECT LIST */}
        <div className="flex gap-3 flex-wrap">
          {projects.map(p => (
            <button
              key={p.id}
              onClick={() => setActiveId(p.id)}
              className={`px-4 py-2 rounded-lg ${
                activeId === p.id ? "bg-white text-black" : "bg-white/10"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {activeProject && (
          <>
            {/* PROJECT TITLE EDIT */}
            <div>
              {editingName ? (
                <div className="flex gap-3">
                  <input
                    className="bg-white/10 px-3 py-2 rounded-lg"
                    value={projectName}
                    onChange={e => setProjectName(e.target.value)}
                  />
                  <button onClick={updateProjectName}>Save</button>
                </div>
              ) : (
                <h2
                  className="text-2xl font-semibold cursor-pointer"
                  onClick={() => {
                    setProjectName(activeProject.name);
                    setEditingName(true);
                  }}
                >
                  {activeProject.name} ✏️
                </h2>
              )}
            </div>

            {/* TEAM */}
            <section>
              <h3 className="text-lg mb-3">Team</h3>
              <div className="flex gap-3 mb-3 flex-wrap">
                {activeProject.team.map(m => {
                  const s = memberStats(m.id);
                  return (
                    <div key={m.id} className="bg-white/10 p-3 rounded-lg text-sm">
                      <p>{m.name} · {m.role}</p>
                      <p className="text-white/40">
                        Tasks: {s.done}/{s.total} ({s.percent}%)
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <input
                  className="bg-white/5 px-3 py-2 rounded-lg"
                  placeholder="Member name"
                  value={memberName}
                  onChange={e => setMemberName(e.target.value)}
                />
                <select
                  className="bg-white/5 px-3 py-2 rounded-lg"
                  value={memberRole}
                  onChange={e => setMemberRole(e.target.value)}
                >
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
                <button onClick={addMember}>Add</button>
              </div>
            </section>

            {/* TASKS */}
            <section>
              <h3 className="text-lg mb-3">Tasks</h3>
              {activeProject.tasks.map(t => (
                <label key={t.id} className="flex gap-3 items-center mb-2">
                  <input type="checkbox" checked={t.done} onChange={() => toggleTask(t.id)} />
                  <span className={t.done ? "line-through text-white/40" : ""}>
                    {t.title}
                  </span>
                </label>
              ))}

              <div className="flex gap-3 mt-3">
                <input
                  className="bg-white/5 px-3 py-2 rounded-lg"
                  placeholder="Task"
                  value={taskTitle}
                  onChange={e => setTaskTitle(e.target.value)}
                />
                <select
                  className="bg-white/5 px-3 py-2 rounded-lg"
                  value={assigneeId}
                  onChange={e => setAssigneeId(e.target.value)}
                >
                  <option value="">Assign to</option>
                  {activeProject.team.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
                <button onClick={addTask}>Add</button>
              </div>
            </section>

            {/* GOALS */}
            <section>
              <h3 className="text-lg mb-3">Final Goals</h3>
              {activeProject.goals.map(g => (
                <label key={g.id} className="flex gap-3 items-center mb-2">
                  <input type="checkbox" checked={g.done} onChange={() => toggleGoal(g.id)} />
                  <span className={g.done ? "line-through text-white/40" : ""}>
                    {g.title}
                  </span>
                </label>
              ))}

              <div className="flex gap-3 mt-3">
                <input
                  className="bg-white/5 px-3 py-2 rounded-lg"
                  placeholder="Goal"
                  value={goalTitle}
                  onChange={e => setGoalTitle(e.target.value)}
                />
                <button onClick={addGoal}>Add</button>
              </div>
            </section>
          </>
        )}
      </div>
    </section>
  );
}
