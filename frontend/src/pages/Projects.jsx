import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/Authcontext";
import { useProject } from "../context/ProjectContext";
import CreateProjectModal from "../components/projects/CreateProjectModal";

export default function Projects() {
  const { user } = useAuth();
  const { selectProject } = useProject();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to load projects", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleProjectSelect = (project) => {
    selectProject(project);
    navigate("/testcases");
  };

  return (
    <>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>

        {["admin", "test-lead"].includes(user.role) && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Create Project
          </button>
        )}
      </div>

      
      {loading && (
        <div className="text-gray-500 bg-white p-6 rounded shadow">
          Loading projects...
        </div>
      )}

      
      {!loading && projects.length === 0 && (
        <div className="bg-white p-6 rounded shadow text-gray-500">
          No projects yet. Create your first project to start testing.
        </div>
      )}

      
      {!loading && projects.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectSelect(project)}
              className="cursor-pointer bg-white p-5 rounded-xl shadow hover:shadow-lg transition border border-transparent hover:border-blue-500"
            >
              <h2 className="font-semibold text-lg mb-1">
                {project.name}
              </h2>

              {project.description && (
                <p className="text-sm text-gray-600 mb-2">
                  {project.description}
                </p>
              )}

              <div className="flex justify-between mt-4 text-xs text-gray-500">
                Version: {project.version || "N/A"} • Status:{" "}
                <span className="font-medium text-green-500">
                  {project.status || "Active"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      
      {showModal && (
        <CreateProjectModal
          onClose={() => setShowModal(false)}
          onCreated={fetchProjects}
        />
      )}
    </>
  );
}
