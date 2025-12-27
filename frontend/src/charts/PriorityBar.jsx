import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import api from "../services/api";
import { useProject } from "../context/ProjectContext";

export default function PriorityBar() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  

  const {currentProjectId:projectId} = useProject()

  useEffect(() => {
    if (!projectId) return;

    const fetchPriorityStats = async () => {
      try {
        const res = await api.get(
          `/analytics/priority?projectId=${projectId}`
        );
        setData(res.data);
      } catch (err) {
        console.error("Priority analytics error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPriorityStats();
  }, [projectId]); 

  if (!projectId) {
    return (
      <p className="text-gray-500">
        Select a project to view priority distribution
      </p>
    );
  }

  if (loading) {
    return <p className="text-gray-500">Loading priority chart...</p>;
  }

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-semibold mb-4">
        Priority-wise Test Distribution
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="priority" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
