import { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import { useAuth } from "../context/Authcontext";
import CreateTestCaseModal from "../components/testcases/CreateTestCaseModal";

export default function TestCases() {
  const { user } = useAuth();
  const projectId = localStorage.getItem("currentProjectId");
  const projectName = localStorage.getItem("currentProjectName");

  const [testCases, setTestCases] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchTestCases = useCallback(async () => {
    const res = await api.get(`/testcases?projectId=${projectId}`);
    setTestCases(res.data);
  }, [projectId]);

  useEffect(() => {
    if (projectId) fetchTestCases();
  }, [fetchTestCases, projectId]);

  if (!projectId) {
    return <div>Select a project first.</div>;
  }

  const handleExport = () => {
  if (!projectId) {
    alert("Select a project first");
    return;
  }

  const token = localStorage.getItem("token");

  fetch(
    `http://localhost:5000/api/testcases/export?projectId=${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error("Export failed");
      return res.blob();
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `testcases_project_${projectId}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to export CSV");
    });
};

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Test Cases</h1>
          <p className="text-gray-500 text-sm">
            Project: {projectName}
          </p>
        </div>

        {["admin", "test-lead"].includes(user.role) && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Create Test Case
          </button>
          
        )}

          <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>
      </div>

      {testCases.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-gray-500">
          No test cases yet. Create your first test case.
        </div>
      ) : (
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Type</th>
              </tr>
            </thead>
            <tbody>
              {testCases.map(tc => (
                <tr key={tc.id} className="border-t">
                  <td className="p-3">{tc.title}</td>
                  <td className="p-3 text-center">{tc.priority}</td>
                  <td className="p-3 text-center">{tc.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <CreateTestCaseModal
          projectId={projectId}
          onClose={() => setShowModal(false)}
          onCreated={fetchTestCases}
        />
      )}
    </>
  );
}
