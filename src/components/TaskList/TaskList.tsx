import TaskItem from "./TaskItem";
import type { TaskListProps } from "../../types";

export default function TaskList({
  tasks,
  onDelete,
  onEdit,
  onStatusChange,
}: TaskListProps) {
  return (
    <section className="rounded-xl bg-white p-6 text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white">
      {/* Task list heading */}
      <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
        My Tasks
      </h2>

      {/* Show tasks or empty message */}
      {tasks.length > 0 ? (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      ) : (
        <p className="text-slate-600 dark:text-slate-300">
          No tasks available.
        </p>
      )}
    </section>
  );
}
