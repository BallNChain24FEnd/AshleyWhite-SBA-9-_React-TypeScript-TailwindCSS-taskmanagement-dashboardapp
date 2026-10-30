import type { TaskItemProps } from "../../types";

export default function TaskItem({ task }: TaskItemProps) {
  return (
    <div className="rounded-lg border border-slate-200 p-4">
      {/* Task title */}
      <h3 className="font-semibold text-slate-800">
        {task.title}
      </h3>

      {/* Task description */}
      <p className="mt-1 text-sm text-slate-600">
        {task.description}
      </p>

      {/* Task details */}
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
  );
}
