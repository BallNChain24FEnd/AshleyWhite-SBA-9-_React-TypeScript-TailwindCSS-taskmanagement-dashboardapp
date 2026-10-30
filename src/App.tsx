import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import { sampleTasks } from "./utils/taskUtils";
import type { Task, TaskFormData } from "./types";

function App() {
  // Store task list
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);

  // Add new task
  function handleAddTask(form: TaskFormData) {
    const newTask: Task = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      priority: form.priority,
      dueDate: form.dueDate,
      status: "Pending",
    };

    // Update task list
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  return (
    <>
      {/* Display dashboard */}
      <Dashboard tasks={tasks} onAddTask={handleAddTask} />
    </>
  );
}

export default App;

