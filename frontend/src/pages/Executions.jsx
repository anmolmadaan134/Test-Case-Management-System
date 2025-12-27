import { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import ExecuteTestModal from "../components/executions/ExecuteTestModal";

export default function Executions() {
  const { user } = useAuth();
  const projectId = localStorage.getItem("currentProjectId");
  const projectName = localStorage.getItem("currentProjectName");

  const [testCases, setTestCases] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);

  const fetchTestCases = useCallback(async () => {
    const res = await api.get(`/api/testcases?projectId=${projectId}`);
    setTestCases(res.data);
  }, [projectId]);

  useEffect(() => {
    if (projectId) fetchTestCases();
  }, [fetchTestCases, projectId]);

  if (!projectId) {
    return <div>Select a project first.</div>;
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Test Executions</h1>
        <p className="text-sm text-gray-500">
          Project: {projectName}
        </p>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Test Case</th>
              <th className="p-3">Priority</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {testCases.map(tc => (
              <tr key={tc.id} className="border-t">
                <td className="p-3">{tc.title}</td>
                <td className="p-3 text-center">{tc.priority}</td>
                <td className="p-3 text-center">
                  {user.role !== "read-only" ? (
                    <button
                      onClick={() => setSelectedTest(tc)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Execute
                    </button>
                  ) : (
                    <span className="text-gray-400 text-xs">
                      No Access
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTest && (
        <ExecuteTestModal
          testCase={selectedTest}
          onClose={() => setSelectedTest(null)}
        />
      )}
    </>
  );
}
