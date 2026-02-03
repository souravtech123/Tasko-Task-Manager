import { useState, useEffect } from "react";

/* -------------------- Storage Helpers -------------------- */
const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];
const setData = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

export default function ProjectManage() {
  const [projects, setProjects] = useState(getData("projects"));
  const [members, setMembers] = useState(getData("members"));
  const [tasks, setTasks] = useState(getData("tasks"));

  const [activeProjectId, setActiveProjectId] = useState(
    projects[0]?.id || null
  );

  /* Project */
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");

  /* Member */
  const [memberName, setMemberName] = useState("");
  const [memberRole, setMemberRole] = useState("");
  const [editingMemberId, setEditingMemberId] = useState(null);

  /* Task */
  const [taskTitle, setTaskTitle] = useState("");
  const [taskMember, setTaskMember] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");

  const activeProject = projects.find(p => p.id === activeProjectId);

  /* -------------------- Effects -------------------- */
  useEffect(() => setData("projects", projects), [projects]);
  useEffect(() => setData("members", members), [members]);
  useEffect(() => setData("tasks", tasks), [tasks]);

  /* -------------------- Project -------------------- */
  const createProject = () => {
    if (!projectName || !projectDeadline) return;

    const id = Date.now().toString();
    setProjects([
      ...projects,
      { id, name: projectName, description: projectDesc, deadline: projectDeadline }
    ]);
    setActiveProjectId(id);

    setProjectName("");
    setProjectDesc("");
    setProjectDeadline("");
  };

  /* -------------------- Members -------------------- */
  const projectMembers = members.filter(
    m => m.projectId === activeProjectId
  );

  const saveMember = () => {
    if (!memberName || !memberRole || !activeProject) return;

    if (editingMemberId) {
      setMembers(
        members.map(m =>
          m.id === editingMemberId
            ? { ...m, name: memberName, role: memberRole }
            : m
        )
      );
      setEditingMemberId(null);
    } else {
      setMembers([
        ...members,
        {
          id: Date.now().toString(),
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

  const editMember = (m) => {
    setEditingMemberId(m.id);
    setMemberName(m.name);
    setMemberRole(m.role);
  };

  const deleteMember = (id) => {
    if (!window.confirm("Delete this member?")) return;
    setMembers(members.filter(m => m.id !== id));
    setTasks(tasks.filter(t => t.assignedTo !== id));
  };

  /* -------------------- Tasks -------------------- */
  const projectTasks = tasks.filter(
    t => t.projectId === activeProjectId
  );

  const createTask = () => {
    if (!taskTitle || !taskMember || !taskDeadline) return;

    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
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
    const task = tasks.find(t => t.id === id);

    setTasks(
      tasks.map(t =>
        t.id === id ? { ...t, status } : t
      )
    );

    if (status === "Done") {
      const onTime = new Date() <= new Date(task.deadline);

      setMembers(
        members.map(m =>
          m.id === task.assignedTo
            ? {
                ...m,
                completed: m.completed + 1,
                stars: onTime ? m.stars + 1 : m.stars
              }
            : m
        )
      );
    }
  };

  const deleteTask = (id) => {
    if (!window.confirm("Delete this task?")) return;
    setTasks(tasks.filter(t => t.id !== id));
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <header>
          <h1 className="text-3xl font-semibold">Tasko</h1>
          <p className="text-gray-400 mt-1">
            Clean & focused project management
          </p>
        </header>

        {/* Create Project */}
        <section className="bg-[#111827] rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-medium">Create Project</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input className="input" placeholder="Project name" value={projectName} onChange={e => setProjectName(e.target.value)} />
            <input className="input" placeholder="Description" value={projectDesc} onChange={e => setProjectDesc(e.target.value)} />
            <input type="date" className="input" value={projectDeadline} onChange={e => setProjectDeadline(e.target.value)} />
          </div>

          <button onClick={createProject} className="btn-primary">
            Create Project
          </button>
        </section>

        {activeProject && (
          <div className="grid md:grid-cols-2 gap-8">

            {/* Members */}
            <section className="bg-[#111827] rounded-xl p-6 space-y-5">
              <h2 className="text-lg font-medium">Team Members</h2>

              <div className="space-y-3">
                <input className="input" placeholder="Member name" value={memberName} onChange={e => setMemberName(e.target.value)} />
                <input className="input" placeholder="Role (Lead / Dev / QA)" value={memberRole} onChange={e => setMemberRole(e.target.value)} />

                <button onClick={saveMember} className="btn-secondary">
                  {editingMemberId ? "Update Member" : "Add Member"}
                </button>
              </div>

              <ul className="space-y-3">
                {projectMembers.map(m => (
                  <li key={m.id} className="row">
                    <div>
                      <p className="font-medium">{m.name}</p>
                      <p className="text-sm text-gray-400">{m.role}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">⭐ {m.stars}</span>
                      <button onClick={() => editMember(m)} className="link">
                        Edit
                      </button>
                      <button onClick={() => deleteMember(m.id)} className="link text-red-400">
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Tasks */}
            <section className="bg-[#111827] rounded-xl p-6 space-y-5">
              <h2 className="text-lg font-medium">Tasks</h2>

              <div className="space-y-3">
                <input className="input" placeholder="Task title" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} />

                <select className="input" value={taskMember} onChange={e => setTaskMember(e.target.value)}>
                  <option value="">Assign to</option>
                  {projectMembers.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>

                <input type="date" className="input" value={taskDeadline} onChange={e => setTaskDeadline(e.target.value)} />

                <button onClick={createTask} className="btn-primary">
                  Add Task
                </button>
              </div>

              <ul className="space-y-3">
                {projectTasks.map(t => (
                  <li key={t.id} className="row">
                    <div>
                      <p className="font-medium">{t.title}</p>
                      <p className="text-sm text-gray-400">
                        Due {t.deadline}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <select
                        className="input-sm"
                        onChange={e => updateTask(t.id, e.target.value)}
                      >
                        <option>Backlog</option>
                        <option>In Progress</option>
                        <option>Review</option>
                        <option>Done</option>
                      </select>

                      <button
                        onClick={() => deleteTask(t.id)}
                        className="link text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

          </div>
        )}
      </div>

      {/* Utility styles */}
      <style>{`
        .input {
          width: 100%;
          background: #020617;
          border: 1px solid #1f2933;
          padding: 0.75rem;
          border-radius: 0.5rem;
        }
        .input-sm {
          background: #020617;
          border: 1px solid #1f2933;
          padding: 0.4rem;
          border-radius: 0.4rem;
          font-size: 0.85rem;
        }
        .btn-primary {
          background: #2563eb;
          padding: 0.7rem 1.4rem;
          border-radius: 0.5rem;
          font-weight: 500;
        }
        .btn-secondary {
          background: #1f2933;
          padding: 0.7rem;
          border-radius: 0.5rem;
          font-weight: 500;
        }
        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #020617;
          padding: 0.75rem 1rem;
          border-radius: 0.6rem;
        }
        .link {
          font-size: 0.85rem;
          color: #93c5fd;
        }
        .link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
