import type { Task } from "../types";

// Sample task data
export const sampleTasks: Task[] = [
  {
    id: 1,
    title: "Complete React Assignment",
    description: "Finish SBA 9 dashboard",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-10-30",
  },
  {
    id: 2,
    title: "Review TypeScript",
    description: "Practice interfaces and props",
    status: "Pending",
    priority: "Medium",
    dueDate: "2026-10-31",
  },
  {
    id: 3,
    title: "Update GitHub",
    description: "Push completed project commits",
    status: "Completed",
    priority: "Low",
    dueDate: "2026-10-29",
  },
];
