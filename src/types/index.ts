// Task status options
export type TaskStatus = "Pending" | "In Progress" | "Completed";

// Task priority options
export type TaskPriority = "Low" | "Medium" | "High";

// Task data structure
export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

// Task form data
export interface TaskFormData {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
}

// Task list props
export interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: TaskStatus) => void;
}

// Task item props
export interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: TaskStatus) => void;
}
// Task form props
export interface TaskFormProps {
  onSubmit: (task: TaskFormData) => void;
  editingTask?: Task | null;
}

// Task filter options
export interface TaskFilterOptions {
  status: "All" | TaskStatus;
  priority: "All" | TaskPriority;
  search: string;
}

// Task filter props
export interface TaskFilterProps {
  filters: TaskFilterOptions;
  onFilterChange: (filters: TaskFilterOptions) => void;
}

// Dashboard props
export interface DashboardProps {
  tasks: Task[];
}
