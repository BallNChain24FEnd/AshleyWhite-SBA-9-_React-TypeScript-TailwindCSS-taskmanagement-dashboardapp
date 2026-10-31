import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import { sampleTasks } from "./utils/taskUtils";
import {
  exportTasks,
  isValidTaskData,
} from "./utils/taskStorage";
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
        const parsedTasks: unknown = JSON.parse(savedTasks);

        return isValidTaskData(parsedTasks)
          ? parsedTasks
          : sampleTasks;
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

  // Store import feedback
  const [importMessage, setImportMessage] = useState("");

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

  // Move task up
  function handleMoveUp(id: number) {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const index = updatedTasks.findIndex(
        (task) => task.id === id
      );

      if (index <= 0) {
        return prevTasks;
      }

      // Swap with previous task
      [updatedTasks[index - 1], updatedTasks[index]] = [
        updatedTasks[index],
        updatedTasks[index - 1],
      ];

      return updatedTasks;
    });
  }

  // Move task down
  function handleMoveDown(id: number) {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      const index = updatedTasks.findIndex(
        (task) => task.id === id
      );

      if (index < 0 || index >= updatedTasks.length - 1) {
        return prevTasks;
      }

      // Swap with next task
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];

      return updatedTasks;
    });
  }

  // Export task backup
  function handleExport() {
    exportTasks(tasks);
  }

  // Import task backup
  async function handleImport(file: File): Promise<void> {
    try {
      // Read JSON file
      const fileText = await file.text();
      const importedData: unknown = JSON.parse(fileText);

      // Validate imported tasks
      if (!isValidTaskData(importedData)) {
        setImportMessage("Invalid task backup file.");
        return;
      }

      // Confirm replacement
      const confirmed = window.confirm(
        "Importing will replace your current tasks. Continue?"
      );

      if (!confirmed) {
        setImportMessage("Import cancelled.");
        return;
      }

      // Restore imported tasks
      setTasks(importedData);
      setEditingTask(null);
      setImportMessage("Tasks imported successfully.");

      // Show imported order
      setFilters({
        status: "All",
        priority: "All",
        search: "",
        sortBy: "Manual",
      });
    } catch {
      setImportMessage("Could not read task backup file.");
    }
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
    if (filters.sortBy === "Manual") {
      return 0;
    }

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

  // Allow reordering in manual view
  const canReorder =
    filters.sortBy === "Manual" &&
    filters.status === "All" &&
    filters.priority === "All" &&
    filters.search.trim() === "";

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
        onMoveUp={handleMoveUp}
        onMoveDown={handleMoveDown}
        canReorder={canReorder}
        onExport={handleExport}
        onImport={handleImport}
        importMessage={importMessage}
      />
    </>
  );
}

export default App;
