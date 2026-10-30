import type { TaskFilterProps, TaskStatus, TaskPriority } from "../../types";

export default function TaskFilter({
  filters,
  onFilterChange,
}: TaskFilterProps) {
  return (
    <section className="mb-8 rounded-xl bg-white p-6 shadow-sm">
      {/* Filter heading */}
      <h2 className="mb-4 text-xl font-semibold text-slate-800">
        Filter Tasks
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search tasks */}
        <div>
          <label htmlFor="search" className="mb-1 block text-sm font-medium">
            Search
          </label>
          <input
            id="search"
            type="text"
            value={filters.search}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
            placeholder="Search tasks..."
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        {/* Filter by status */}
        <div>
          <label htmlFor="filterStatus" className="mb-1 block text-sm font-medium">
            Status
          </label>
          <select
            id="filterStatus"
            value={filters.status}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                status: e.target.value as "All" | TaskStatus,
              })
            }
            className="w-full rounded-lg border border-slate-300 p-3"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Filter by priority */}
        <div>
          <label htmlFor="filterPriority" className="mb-1 block text-sm font-medium">
            Priority
          </label>
          <select
            id="filterPriority"
            value={filters.priority}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                priority: e.target.value as "All" | TaskPriority,
              })
            }
            className="w-full rounded-lg border border-slate-300 p-3"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Sort tasks */}
        <div>
          <label htmlFor="sortBy" className="mb-1 block text-sm font-medium">
            Sort By
          </label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                sortBy: e.target.value as TaskFilterProps["filters"]["sortBy"],
              })
            }
            className="w-full rounded-lg border border-slate-300 p-3"
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Due Date">Due Date</option>
            <option value="Priority">Priority</option>
          </select>
        </div>
      </div>
    </section>
  );
}
