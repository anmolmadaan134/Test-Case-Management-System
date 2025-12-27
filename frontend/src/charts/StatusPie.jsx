import { Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useProject } from "../context/ProjectContext";

export default function StatusPie() {
  const { currentProjectId: projectId } = useProject();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    if (!projectId) return;

    api
      .get(`/api/analytics/summary?projectId=${projectId}`)
      .then(res => setStats(res.data))
      .catch(() => setStats([]));
  }, [projectId]);

  if (!stats.length) {
    return <p className="text-gray-400">No execution data</p>;
  }

  return (
    <Pie
      data={{
        labels: stats.map(s => s.status),
        datasets: [
          {
            data: stats.map(s => s.count),
            backgroundColor: ["#22c55e", "#ef4444", "#eab308", "#94a3b8"]
          }
        ]
      }}
    />
  );
}
