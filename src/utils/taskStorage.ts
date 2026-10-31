import type { Task } from "../types";

// Download tasks as JSON
export function exportTasks(tasks: Task[]) {
  const json = JSON.stringify(tasks, null, 2);
  const blob = new Blob([json], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "task-dashboard-backup.json";
  link.click();

  URL.revokeObjectURL(url);
}

// Check imported task data
export function isValidTaskData(data: unknown): data is Task[] {
  if (!Array.isArray(data)) {
    return false;
  }

  return data.every((task) => {
    if (typeof task !== "object" || task === null) {
      return false;
    }

    return (
      typeof task.id === "number" &&
      Number.isSafeInteger(task.id) &&
      task.id > 0 &&
      typeof task.title === "string" &&
      task.title.trim().length > 0 &&
      typeof task.description === "string" &&
      ["Pending", "In Progress", "Completed"].includes(task.status) &&
      ["Low", "Medium", "High"].includes(task.priority) &&
      typeof task.dueDate === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(task.dueDate)
    );
  }) && new Set(data.map((task) => task.id)).size === data.length;
}
