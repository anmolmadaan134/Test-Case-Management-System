import { useState } from "react";
import api from "../../services/api";

export default function CreateProjectModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    version: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/projects", form);
    onCreated();   // refresh list
    onClose();     // close modal
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Create Project</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Project Name"
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

          <input
            name="version"
            placeholder="Version (v1.0)"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <select
            name="status"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1 border rounded"
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
