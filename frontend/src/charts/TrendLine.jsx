import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import api from "../services/api";
import { useProject } from "../context/ProjectContext";

export default function TrendLine() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const {currentProjectId:projectId} = useProject()


  useEffect(() => {
    if (!projectId) return;

    const fetchTrend = async () => {
      try {
        const res = await api.get(
          `/api/analytics/trend?projectId=${projectId}`
        );
        setData(res.data);
      } catch (err) {
        console.error("Trend analytics error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrend();
  }, [projectId]); 

  if (!projectId) {
    return (
      <p className="text-gray-500">
        Select a project to view execution trend
      </p>
    );
  }

  if (loading) {
    return <p className="text-gray-500">Loading execution trend...</p>;
  }

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-lg font-semibold mb-4">
        Test Execution Trend
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#16a34a"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
