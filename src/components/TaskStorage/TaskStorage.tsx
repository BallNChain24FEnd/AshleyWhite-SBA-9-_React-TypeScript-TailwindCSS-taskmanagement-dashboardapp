import { useRef } from "react";

interface TaskStorageProps {
  onExport: () => void;
  onImport: (file: File) => Promise<void>;
  importMessage: string;
}

export default function TaskStorage({
  onExport,
  onImport,
  importMessage,
}: TaskStorageProps) {
  // Get file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Import selected file
  async function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (file) {
      await onImport(file);
    }

    // Allow same file again
    e.target.value = "";
  }

  return (
    <section className="mb-8 rounded-xl bg-white p-6 text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white">
      {/* Storage heading */}
      <h2 className="mb-2 text-xl font-semibold">
        Task Backup
      </h2>

      <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
        Export or import tasks using a JSON file.
      </p>

      {/* Backup buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onExport}
          className="rounded-lg bg-blue-700 px-5 py-3 font-medium text-white hover:bg-blue-800"
        >
          Export Tasks
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-lg bg-teal-700 px-5 py-3 font-medium text-white hover:bg-teal-800"
        >
          Import Tasks
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileChange}
          aria-label="Select task backup JSON file"
          className="hidden"
        />
      </div>

      {/* Import feedback */}
      {importMessage && (
        <p role="status" className="mt-3 text-sm">
          {importMessage}
        </p>
      )}
    </section>
  );
}
