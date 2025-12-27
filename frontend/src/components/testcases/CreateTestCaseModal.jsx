import { useState } from "react";
import api from "../../services/api";

export default function CreateTestCaseModal({ projectId, onClose, onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    type: "Functional",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/testcases", {
      ...form,
      projectId,
    });
    onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded shadow p-6">
        <h2 className="font-semibold mb-4">Create Test Case</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            placeholder="Title"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <select
            name="priority"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          <select
            name="type"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option>Functional</option>
            <option>Regression</option>
            <option>Smoke</option>
            <option>API</option>
            <option>UI</option>
          </select>

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
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
