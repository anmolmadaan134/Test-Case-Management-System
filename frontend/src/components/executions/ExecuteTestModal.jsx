import { useState } from "react";
import api from "../../services/api";

export default function ExecuteTestModal({ testCase, onClose }) {
  const [status, setStatus] = useState("Pass");
  const [comments, setComments] = useState("");

  const projectId = localStorage.getItem("currentProjectId");
  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/executions", {
      test_case_id: testCase.id,
      projectId,
      status,
      comments,
    });

    onClose();

    window.location.href = "/dashboard";
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded shadow p-6">
        <h2 className="font-semibold mb-2">Execute Test</h2>
        <p className="text-sm text-gray-500 mb-4">
          {testCase.title}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <select
            className="w-full border p-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Pass</option>
            <option>Fail</option>
            <option>Blocked</option>
            <option>Skipped</option>
          </select>

          <textarea
            placeholder="Comments"
            className="w-full border p-2 rounded"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-1 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
