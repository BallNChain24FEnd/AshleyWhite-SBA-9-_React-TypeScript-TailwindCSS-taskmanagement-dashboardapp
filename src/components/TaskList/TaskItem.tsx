import type {
  TaskItemProps,
  TaskStatus,
} from "../../types";

export default function TaskItem({
  task,
  onDelete,
  onEdit,
  onStatusChange,
}: TaskItemProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white">
      {/* Task title */}
      <h3 className="font-semibold text-slate-900 dark:text-white">
        {task.title}
      </h3>

      {/* Task description */}
      <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
        {task.description}
      </p>

      {/* Task details */}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        {/* Priority urgency color */}
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            task.priority === "High"
              ? "bg-red-100 text-red-700"
              : task.priority === "Medium"
                ? "bg-amber-100 text-amber-700"
                : "bg-green-100 text-green-700"
          }`}
        >
          {task.priority} Priority
        </span>

        {/* Due date */}
        <span className="text-slate-600 dark:text-slate-200">
          Due: {task.dueDate}
        </span>
      </div>

      {/* Task status */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <label
          htmlFor={`status-${task.id}`}
          className="text-sm font-medium text-slate-800 dark:text-slate-200"
        >
          Status:
        </label>

        <select
          id={`status-${task.id}`}
          value={task.status}
          onChange={(e) =>
            onStatusChange(
              task.id,
              e.target.value as TaskStatus
            )
          }
          className="rounded-lg border border-slate-300 bg-white p-2 text-sm text-slate-900 dark:border-slate-500 dark:bg-slate-600 dark:text-white"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Task buttons */}
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
