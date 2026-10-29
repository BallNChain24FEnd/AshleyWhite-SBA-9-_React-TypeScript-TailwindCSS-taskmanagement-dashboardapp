
import { sampleTasks } from "./utils/taskUtils";

function App() {
  // Get task statistics
  const totalTasks = sampleTasks.length;

  const inProgressTasks = sampleTasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = sampleTasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Dashboard container */}
      <main className="mx-auto max-w-6xl">
        {/* Dashboard heading */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            Task Management Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            Organize your tasks and track your progress.
          </p>
        </header>

        {/* Dashboard statistics */}
        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h2 className="text-slate-600">Total Tasks</h2>
            <p className="mt-2 text-3xl font-bold">
              {totalTasks}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h2 className="text-slate-600">In Progress</h2>
            <p className="mt-2 text-3xl font-bold text-amber-600">
              {inProgressTasks}
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h2 className="text-slate-600">Completed</h2>
            <p className="mt-2 text-3xl font-bold text-green-600">
              {completedTasks}
            </p>
          </div>
        </section>

        {/* Task list */}
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            My Tasks
          </h2>

          <div className="space-y-4">
            {sampleTasks.map((task) => (
              <div
                key={task.id}
                className="rounded-lg border border-slate-200 p-4"
              >
                <h3 className="font-semibold text-slate-800">
                  {task.title}
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  {task.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-3 text-sm">
                  <span className="text-blue-600">
                    {task.status}
                  </span>

                  <span className="text-purple-600">
                    {task.priority} Priority
                  </span>

                  <span className="text-slate-500">
                    Due: {task.dueDate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
