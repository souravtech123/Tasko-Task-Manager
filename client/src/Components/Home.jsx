
import { useEffect, useState } from "react";

const STATUSES = ["Todo", "In Progress", "Done"];

export default function Home() {
  /* ================= STATE ================= */
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("tasko-projects");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeProjectId, setActiveProjectId] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  const activeProject = projects.find(
    (p) => p.id === activeProjectId
  );

  /* ================= STORAGE ================= */
  useEffect(() => {
    localStorage.setItem(
      "tasko-projects",
      JSON.stringify(projects)
    );
  }, [projects]);

  /* ================= HELPERS ================= */
  const updateActiveProject = (callback) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === activeProjectId
          ? callback(project)
          : project
      )
    );
  };

  /* ================= PROJECT ================= */
  const createProject = () => {
    if (!projectName.trim()) return;
  
    const newProject = {
      id: Date.now(),
      name: projectName,
      tasks: [],
    };
  
    setProjects((prev) => [...prev, newProject]);
  
    // ✅ AUTO-SELECT NEW PROJECT
    setActiveProjectId(newProject.id);
  
    setProjectName("");
  };

  

  const deleteProject = (projectId) => {
    setProjects((prev) =>
      prev.filter((project) => project.id !== projectId)
    );
  
    // If active project is deleted → reset view
    if (projectId === activeProjectId) {
      setActiveProjectId(null);
    }
  };
  
  /* ================= TASK ================= */
  const createTask = () => {
    if (!taskTitle.trim() || !activeProject) return;
  
    updateActiveProject((project) => ({
      ...project,
      tasks: [
        ...project.tasks,
        {
          id: Date.now(),
          title: taskTitle,
          status: "Todo", // ✅ default status
        },
      ],
    }));
  
    setTaskTitle("");
  };
  

  const changeTaskStatus = (taskId, status) => {
    updateActiveProject((project) => ({
      ...project,
      tasks: project.tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      ),
    }));
  };

  /* ================= PROGRESS ================= */
  const progress = activeProject
    ? activeProject.tasks.length === 0
      ? 0
      : Math.round(
          (activeProject.tasks.filter(
            (t) => t.status === "Done"
          ).length /
            activeProject.tasks.length) *
            100
        )
    : 0;

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-slate-100">
      {/* HEADER */}
      <header className="bg-white border-b px-6 py-4">
        <h1 className="text-xl font-bold">
          🚀 Tasko – Student Project Manager
        </h1>
      </header>

      <div className="flex h-[calc(100vh-72px)]">
        {/* SIDEBAR */}
        <aside className="w-64 bg-white border-r p-4">
          <h2 className="font-semibold mb-4">📂 Projects</h2>

          <div className="flex gap-2 mb-4">
            <input
              placeholder="Project name..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="flex-1 border px-2 py-1 rounded text-sm"
            />
            <button
              onClick={createProject}
              className="bg-indigo-600 text-white px-3 rounded text-sm"
            >
              Add
            </button>
          </div>

          {projects.length === 0 && (
            <p className="text-sm text-gray-400">
              No projects yet 😴
            </p>
          )}

{projects.map((project) => (
  <div
    key={project.id}
    className={`flex items-center justify-between p-2 rounded mb-1 text-sm ${
      project.id === activeProjectId
        ? "bg-indigo-100 text-indigo-700"
        : "hover:bg-gray-100"
    }`}
  >
    {/* Project Name */}
    <span
      onClick={() => setActiveProjectId(project.id)}
      className="cursor-pointer flex-1"
    >
      {project.name}
    </span>

    {/* Delete Button */}
    <button
      onClick={() => deleteProject(project.id)}
      className="text-red-500 hover:text-red-700 text-xs ml-2"
      title="Delete Project"
    >
      ✕
    </button>
  </div>
))}
</aside>  


        {/* MAIN */}
        <main className="flex-1 p-6 overflow-x-auto">
          {!activeProject ? (
            <div className="text-black text-center mt-20 text-xl font-bold">
               Select a project to begin
            </div>
          ) : (
            <>
              {/* PROJECT HEADER */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold">
                  {activeProject.name}
                </h2>

                <div className="mt-3">
                  <p className="text-sm mb-1">
                    Progress: {progress}%
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* ADD TASK */}
              <div className="flex gap-2 mb-6 max-w-md">
  <input
    placeholder="What needs to be done?"
    value={taskTitle}
    onChange={(e) => setTaskTitle(e.target.value)}
    className="flex-1 border px-3 py-2 rounded"
  />
  <button
    onClick={createTask}
    disabled={!taskTitle.trim()}
    className="bg-indigo-600 text-white px-4 rounded disabled:opacity-40"
  >
    Add Task
  </button>
</div>


              {/* KANBAN BOARD */}
              <div className="grid grid-cols-3 gap-4">
                {STATUSES.map((status) => (
                  <div
                    key={status}
                    className="bg-white rounded-xl shadow-sm p-3"
                  >
                    <h3 className="font-semibold mb-3">
                      {status}
                    </h3>

                    <button
                      onClick={() => createTask(status)}
                      disabled={!taskTitle}
                      className="text-sm text-indigo-600 mb-3 disabled:opacity-40"
                    >
                      + Add task
                    </button>

                    {activeProject.tasks
                      .filter((task) => task.status === status)
                      .map((task) => (
                        <div
                          key={task.id}
                          className="border rounded-lg p-3 mb-2 bg-slate-50"
                        >
                          <p className="text-sm font-medium mb-2">
                            {task.title}
                          </p>

                          <select
                            value={task.status}
                            onChange={(e) =>
                              changeTaskStatus(
                                task.id,
                                e.target.value
                              )
                            }
                            className="text-xs border rounded px-2 py-1"
                          >
                            {STATUSES.map((s) => (
                              <option key={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
