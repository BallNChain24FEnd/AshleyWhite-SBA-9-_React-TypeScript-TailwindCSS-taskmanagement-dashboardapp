import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import { sampleTasks } from "./utils/taskUtils";
import type {
  Task,
  TaskFormData,
  TaskStatus,
} from "./types";

function App() {
  // Store tasks
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);

  // Store selected task
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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

  return (
    <>
      {/* Display dashboard */}
      <Dashboard
        tasks={tasks}
        onAddTask={handleSubmitTask}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onStatusChange={handleStatusChange}
        editingTask={editingTask}
        onCancel={handleCancel}
      />
    </>
  );
}

export default App;
