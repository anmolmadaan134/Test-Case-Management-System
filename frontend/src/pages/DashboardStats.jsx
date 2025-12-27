import { useEffect, useState } from "react";
import api from "../services/api";
import { useProject } from "../context/ProjectContext";

export default function DashboardStats() {
  const { currentProjectId } = useProject();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!currentProjectId) return;

    api
      .get(`/api/analytics/dashboard?projectId=${currentProjectId}`)
      .then(res => setStats(res.data))
      .catch(() => setStats(null));
  }, [currentProjectId]);

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard label="Total Tests" value={stats.totalTests} />
      <StatCard label="Pass Rate" value={`${stats.passRate}%`} />
      <StatCard label="Fail Rate" value={`${stats.failRate}%`} />
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
