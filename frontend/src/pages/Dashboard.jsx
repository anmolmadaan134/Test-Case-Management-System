import StatusPie from "../charts/StatusPie";
import TrendLine from "../charts/TrendLine";
import PriorityBar from "../charts/PriorityBar";
import { useProject } from "../context/ProjectContext";
import DashboardStats from "./DashboardStats";

export default function Dashboard() {

  const {currentProjectId} = useProject()

  

  if (!currentProjectId) {
  return (
    <div className="p-6 text-gray-500">
      Please select a project to view dashboard.
    </div>
  );
}

  return (
    
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <DashboardStats/>

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Execution Status</h3>
          <StatusPie />
        </div>

        <div className="bg-white p-4 rounded shadow col-span-2">
          <h3 className="font-semibold mb-2">Execution Trend</h3>
          <TrendLine />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Priority Distribution</h3>
        <PriorityBar />
      </div>
    </div>
  );
}
