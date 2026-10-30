import { useState } from "react";
import type {
  TaskFormData,
  TaskFormProps,
  TaskPriority,
} from "../../types";

export default function TaskForm({ onSubmit }: TaskFormProps) {
  // Store form values
  const [form, setForm] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  // Store validation error
  const [error, setError] = useState("");

  // Update form fields
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  // Submit new task
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validate required fields
    if (!form.title.trim() || !form.dueDate) {
      setError("Title and due date are required.");
      return;
    }

    // Validate priority
    const validPriorities: TaskPriority[] = [
      "Low",
      "Medium",
      "High",
    ];

    if (!validPriorities.includes(form.priority)) {
      setError("Please select a valid priority.");
      return;
    }

    // Add task
    onSubmit({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });

    // Reset form
    setForm({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
    });

    setError("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-xl bg-white p-6 shadow-sm"
      noValidate
    >
      <h2 className="mb-4 text-xl font-semibold text-slate-800">
        Add New Task
      </h2>

      {/* Show validation error */}
      {error && (
        <p role="alert" className="mb-4 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Task title */}
      <label htmlFor="title" className="mb-1 block text-sm font-medium">
        Task Title *
      </label>
      <input
        id="title"
        name="title"
        value={form.title}
        onChange={handleChange}
        className="mb-4 w-full rounded-lg border border-slate-300 p-3"
        placeholder="Enter task title"
      />

      {/* Task description */}
      <label
        htmlFor="description"
        className="mb-1 block text-sm font-medium"
      >
        Description
      </label>
      <textarea
        id="description"
        name="description"
        value={form.description}
        onChange={handleChange}
        className="mb-4 w-full rounded-lg border border-slate-300 p-3"
        placeholder="Enter task description"
        rows={3}
      />

      {/* Task priority */}
      <label htmlFor="priority" className="mb-1 block text-sm font-medium">
        Priority
      </label>
      <select
        id="priority"
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="mb-4 w-full rounded-lg border border-slate-300 p-3"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {/* Task due date */}
      <label htmlFor="dueDate" className="mb-1 block text-sm font-medium">
        Due Date *
      </label>
      <input
        id="dueDate"
        name="dueDate"
        type="date"
        value={form.dueDate}
        onChange={handleChange}
        className="mb-4 w-full rounded-lg border border-slate-300 p-3"
      />

      {/* Submit button */}
      <button
        type="submit"
        className="rounded-lg bg-blue-700 px-5 py-3 font-medium text-white transition hover:bg-blue-800"
      >
        Add Task
      </button>
    </form>
  );
}
