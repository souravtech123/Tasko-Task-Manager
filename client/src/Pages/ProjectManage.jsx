import { useEffect, useState } from "react";

/* -------------------- Storage Helpers -------------------- */
const getData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export default function ProjectManage() {
  /* -------------------- Core State -------------------- */
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [activeProjectId, setActiveProjectId] = useState(null);

  const [showPremium, setShowPremium] = useState(false);

  /* -------------------- Project Form -------------------- */
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");

  /* -------------------- Member Form -------------------- */
  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState("");
  const [editingMemberId, setEditingMemberId] = useState(null);

  /* -------------------- Task Form -------------------- */
  const [taskTitle, setTaskTitle] = useState("");
  const [taskMember, setTaskMember] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");

  /* -------------------- Load from localStorage -------------------- */
  useEffect(() => {
    setProjects(getData("projects"));
    setMembers(getData("members"));
    setTasks(getData("tasks"));
  }, []);

  /* -------------------- Save to localStorage -------------------- */
  useEffect(() => setData("projects", projects), [projects]);
  useEffect(() => setData("members", members), [members]);
  useEffect(() => setData("tasks", tasks), [tasks]);

  /* -------------------- Restore Active Project -------------------- */
  useEffect(() => {
    if (projects.length > 0 && !activeProjectId) {
      setActiveProjectId(projects[0].id);
    }
  }, [projects, activeProjectId]);

  const activeProject = projects.find(p => p.id === activeProjectId);

  /* -------------------- Project Logic -------------------- */
  const createProject = () => {
    if (!projectName || !projectDeadline) {
      alert("Project name and deadline required");
      return;
    }

    const id = crypto.randomUUID();

    setProjects(prev => [
      ...prev,
      { id, name: projectName, description: projectDesc, deadline: projectDeadline }
    ]);

    setActiveProjectId(id);
    setProjectName("");
    setProjectDesc("");
    setProjectDeadline("");
  };

  const deleteProject = (id) => {
    if (!window.confirm("Delete this project?")) return;
    setProjects(prev => prev.filter(p => p.id !== id));
    setMembers(prev => prev.filter(m => m.projectId !== id));
    setTasks(prev => prev.filter(t => t.projectId !== id));
    setActiveProjectId(null);
  };

  /* -------------------- Members -------------------- */
  const projectMembers = members.filter(m => m.projectId === activeProjectId);

  const saveMember = () => {
    if (!memberName || !memberRole || !activeProject) return;

    if (editingMemberId) {
      setMembers(prev =>
        prev.map(m =>
          m.id === editingMemberId ? { ...m, name: memberName, role: memberRole } : m
        )
      );
      setEditingMemberId(null);
    } else {
      setMembers(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          projectId: activeProject.id,
          name: memberName,
          role: memberRole,
          stars: 0,
          completed: 0
        }
      ]);
    }

    setMemberName("");
    setMemberRole("");
  };

  /* -------------------- Tasks -------------------- */
  const projectTasks = tasks.filter(t => t.projectId === activeProjectId);

  const createTask = () => {
    if (!taskTitle || !taskMember || !taskDeadline || !activeProject) return;

    setTasks(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        projectId: activeProject.id,
        title: taskTitle,
        assignedTo: taskMember,
        deadline: taskDeadline,
        status: "Backlog"
      }
    ]);

    setTaskTitle("");
    setTaskMember("");
    setTaskDeadline("");
  };

  const updateTask = (id, status) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, status } : t))
    );
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-[#f8fafc] px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">
              Tasko <span className="text-blue-600">Pro</span>
            </h1>
            <p className="text-gray-500">Simple project management</p>
          </div>

          <button
            onClick={() => setShowPremium(true)}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
          >
            View Pro Features
          </button>
        </header>

        {/* Create Project */}
        <section className="card">
          <h2 className="section-title">Create Project</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input className="input" placeholder="Project name"
              value={projectName} onChange={e => setProjectName(e.target.value)} />
            <input className="input" placeholder="Description"
              value={projectDesc} onChange={e => setProjectDesc(e.target.value)} />
            <input type="date" className="input"
              value={projectDeadline} onChange={e => setProjectDeadline(e.target.value)} />
          </div>

          <button onClick={createProject} className="btn-primary mt-4">
            Create Project
          </button>
        </section>

        {/* Projects */}
        {projects.map(p => (
          <div key={p.id} className="project-card" onClick={() => setActiveProjectId(p.id)}>
            <div>
              <h3>{p.name}</h3>
              <p className="text-sm text-gray-500">{p.description}</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); deleteProject(p.id); }}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}

        {/* PREMIUM MODAL */}
        {showPremium && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h2 className="text-2xl font-semibold">Tasko Pro</h2>
              <p className="text-gray-500 mt-2">
                Advanced features are on the way 🚀
              </p>

              <ul className="mt-4 text-sm space-y-2">
                <li>✔ Unlimited Projects</li>
                <li>✔ Analytics Dashboard</li>
                <li>✔ Team Performance</li>
                <li>✔ Priority Support</li>
              </ul>

              <div className="mt-6 space-y-3">
                <button
                  disabled
                  className="w-full bg-gray-200 text-gray-500 py-2 rounded-full cursor-not-allowed"
                >
                  Pro Version Coming Soon
                </button>

                <button
                  onClick={() => setShowPremium(false)}
                  className="btn-secondary w-full"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Styles */}
      <style>{`
        .card { background:white; padding:1.5rem; border-radius:1rem }
        .section-title { font-weight:600; margin-bottom:1rem }
        .input { width:100%; padding:0.6rem; border:1px solid #e5e7eb; border-radius:0.5rem }
        .btn-primary { background:#2563eb; color:white; padding:0.6rem 1.2rem; border-radius:999px }
        .btn-secondary { background:#f1f5f9; padding:0.6rem 1.2rem; border-radius:999px }
        .project-card { background:white; padding:1rem; border-radius:1rem; display:flex; justify-content:space-between; margin-top:0.5rem; cursor:pointer }
      `}</style>
    </div>
  );
}
