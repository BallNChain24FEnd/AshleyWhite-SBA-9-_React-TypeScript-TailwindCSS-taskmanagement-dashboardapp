import TaskFilter from "../TaskFilter/TaskFilter";
import TaskForm from "../TaskForm/TaskForm";
import TaskList from "../TaskList/TaskList";
import type { DashboardProps } from "../../types";

export default function Dashboard({
  tasks,
  visibleTasks,
  filters,
  onFilterChange,
  onAddTask,
  onDelete,
  onEdit,
  onStatusChange,
  editingTask,
  onCancel,
  darkMode,
  onThemeToggle,
}: DashboardProps) {
  // Get task statistics
  const totalTasks = tasks.length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  // Calculate completion rate
  const completionRate =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode
          ? "dark bg-slate-900 text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      {/* Dashboard container */}
      <main className="mx-auto max-w-6xl">
        {/* Dashboard heading */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400">
            Task Management Dashboard
          </h1>

          <p className="mt-2 font-medium text-slate-800 dark:text-slate-200">
            Organize your tasks and track your progress.
          </p>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={onThemeToggle}
            className={`mt-4 rounded-lg px-5 py-3 font-medium ${
              darkMode
                ? "bg-amber-400 text-slate-900 hover:bg-amber-300"
                : "bg-slate-800 text-white hover:bg-slate-700"
            }`}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </header>

        {/* Dashboard statistics */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* Total tasks */}
          <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-800">
            <h2 className="text-slate-700 dark:text-slate-200">
              Total Tasks
            </h2>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {totalTasks}
            </p>
          </div>

          {/* In progress */}
          <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-800">
            <h2 className="text-slate-700 dark:text-slate-200">
              In Progress
            </h2>
            <p className="mt-2 text-3xl font-bold text-amber-600 dark:text-amber-400">
              {inProgressTasks}
            </p>
          </div>

          {/* Completed */}
          <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-800">
            <h2 className="text-slate-700 dark:text-slate-200">
              Completed
            </h2>
            <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
              {completedTasks}
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-800">
            <h2 className="text-slate-700 dark:text-slate-200">
              Pending
            </h2>
            <p className="mt-2 text-3xl font-bold text-purple-600 dark:text-purple-400">
              {pendingTasks}
            </p>
          </div>

          {/* Completion rate */}
          <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-slate-800">
            <h2 className="text-slate-700 dark:text-slate-200">
              Completion Rate
            </h2>
            <p className="mt-2 text-3xl font-bold text-teal-600 dark:text-teal-400">
              {completionRate}%
            </p>
          </div>
        </section>

        {/* Task form */}
        <TaskForm
          key={editingTask?.id ?? "new"}
          editingTask={editingTask}
          onSubmit={onAddTask}
          onCancel={onCancel}
        />

        {/* Task filters */}
        <TaskFilter
          filters={filters}
          onFilterChange={onFilterChange}
        />

        {/* Task list */}
        <TaskList
          tasks={visibleTasks}
          onDelete={onDelete}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
        />
      </main>
    </div>
  );
}
