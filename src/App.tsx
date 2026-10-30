import Dashboard from "./components/Dashboard/Dashboard";
import { sampleTasks } from "./utils/taskUtils";

function App() {
  return (
    <>
      {/* Display dashboard */}
      <Dashboard tasks={sampleTasks} />
    </>
  );
}

export default App;
