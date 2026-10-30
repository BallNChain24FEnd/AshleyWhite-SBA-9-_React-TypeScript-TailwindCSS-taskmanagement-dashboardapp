import { useState } from "react";
import type {
  TaskFormData,
  TaskFormProps,
  TaskPriority,
} from "../../types";

export default function TaskForm({
  onSubmit,
  editingTask,
  onCancel,
}: TaskFormProps) {
  // Store form values
  const [form, setForm] = useState<TaskFormData>({
    title: editingTask?.title || "",
    description: editingTask?.description || "",
    priority: editingTask?.priority || "Medium",
    dueDate: editingTask?.dueDate || "",
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

  // Submit task
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

    // Save task
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
      noValidate
      className="mb-8 rounded-xl bg-white p-6 text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
    >
      {/* Form heading */}
      <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>

      {/* Validation error */}
      {error && (
        <p role="alert" className="mb-4 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {/* Task title */}
      <label
        htmlFor="title"
        className="mb-1 block text-sm font-medium text-slate-800 dark:text-slate-200"
      >
        Task Title *
      </label>

      <input
        id="title"
        name="title"
        type="text"
        value={form.title}
        onChange={handleChange}
        placeholder="Enter task title"
        className="mb-4 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-300"
      />

      {/* Task description */}
      <label
        htmlFor="description"
        className="mb-1 block text-sm font-medium text-slate-800 dark:text-slate-200"
      >
        Description
      </label>

      <textarea
        id="description"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Enter task description"
        rows={3}
        className="mb-4 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-300"
      />

      {/* Task priority */}
      <label
        htmlFor="priority"
        className="mb-1 block text-sm font-medium text-slate-800 dark:text-slate-200"
      >
        Priority
      </label>

      <select
        id="priority"
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="mb-4 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {/* Due date */}
      <label
        htmlFor="dueDate"
        className="mb-1 block text-sm font-medium text-slate-800 dark:text-slate-200"
      >
        Due Date *
      </label>

      <input
        id="dueDate"
        name="dueDate"
        type="date"
        value={form.dueDate}
        onChange={handleChange}
        className="mb-4 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:[color-scheme:dark]"
      />

      {/* Form buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-blue-700 px-5 py-3 font-medium text-white hover:bg-blue-800"
        >
          {editingTask ? "Save Changes" : "Add Task"}
        </button>

        {/* Cancel editing */}
        {editingTask && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-slate-500 px-5 py-3 font-medium text-white hover:bg-slate-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
