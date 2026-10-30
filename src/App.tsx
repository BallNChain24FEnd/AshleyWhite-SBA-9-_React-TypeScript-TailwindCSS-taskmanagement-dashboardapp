import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import { sampleTasks } from "./utils/taskUtils";
import type {
  Task,
  TaskFormData,
  TaskStatus,
  TaskFilterOptions,
} from "./types";

function App() {
  // Load saved tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("dashboardTasks");

    if (savedTasks) {
      try {
        return JSON.parse(savedTasks) as Task[];
      } catch {
        return sampleTasks;
      }
    }

    return sampleTasks;
  });

  // Store selected task
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Store filter settings
  const [filters, setFilters] = useState<TaskFilterOptions>({
    status: "All",
    priority: "All",
    search: "",
    sortBy: "Newest",
  });

  // Load saved theme
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("dashboardTheme") === "dark";
  });

  // Save tasks when changed
  useEffect(() => {
    localStorage.setItem("dashboardTasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save theme when changed
  useEffect(() => {
    localStorage.setItem(
      "dashboardTheme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  // Toggle theme
  function handleThemeToggle() {
    setDarkMode((prevMode) => !prevMode);
  }

  // Add or edit task
  function handleSubmitTask(form: TaskFormData) {
    if (editingTask) {
      // Update selected task
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...form }
            : task
        )
      );

      setEditingTask(null);
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now(),
        ...form,
        status: "Pending",
      };

      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  }

  // Select task for editing
  function handleEdit(task: Task) {
    setEditingTask(task);
  }

  // Delete task
  function handleDelete(id: number) {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );

    // Clear deleted task from form
    if (editingTask?.id === id) {
      setEditingTask(null);
    }
  }

  // Update task status
  function handleStatusChange(id: number, status: TaskStatus) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  }

  // Cancel editing
  function handleCancel() {
    setEditingTask(null);
  }

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filters.status === "All" || task.status === filters.status;

    const matchesPriority =
      filters.priority === "All" || task.priority === filters.priority;

    const matchesSearch =
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });

  // Sort filtered tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (filters.sortBy === "Oldest") {
      return a.id - b.id;
    }

    if (filters.sortBy === "Due Date") {
      return a.dueDate.localeCompare(b.dueDate);
    }

    if (filters.sortBy === "Priority") {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }

    return b.id - a.id;
  });

  return (
    <>
      {/* Display dashboard */}
      <Dashboard
        tasks={tasks}
        visibleTasks={sortedTasks}
        filters={filters}
        onFilterChange={setFilters}
        onAddTask={handleSubmitTask}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
        editingTask={editingTask}
        onCancel={handleCancel}
        darkMode={darkMode}
        onThemeToggle={handleThemeToggle}
      />
    </>
  );
}

export default App;
