function App() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Dashboard container */}
      <main className="mx-auto max-w-6xl">
        {/* Dashboard heading */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            Task Management Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            Organize your tasks and track your progress.
          </p>
        </header>

        {/* Dashboard statistics */}
        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h2 className="text-slate-600">Total Tasks</h2>
            <p className="mt-2 text-3xl font-bold">0</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h2 className="text-slate-600">In Progress</h2>
            <p className="mt-2 text-3xl font-bold text-amber-600">
              0
            </p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm">
            <h2 className="text-slate-600">Completed</h2>
            <p className="mt-2 text-3xl font-bold text-green-600">
              0
            </p>
          </div>
        </section>

        {/* Task list preview */}
        <section className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            My Tasks
          </h2>

          <p className="text-slate-500">
            Your tasks will appear here.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
