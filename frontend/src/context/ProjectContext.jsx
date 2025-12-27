// context/ProjectContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [currentProjectName, setCurrentProjectName] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("currentProjectId");
    const name = localStorage.getItem("currentProjectName");
    if (id) {
      setCurrentProjectId(Number(id));
      setCurrentProjectName(name);
    }
  }, []);

  const selectProject = (project) => {
    localStorage.setItem("currentProjectId", project.id);
    localStorage.setItem("currentProjectName", project.name);
    setCurrentProjectId(project.id);
    setCurrentProjectName(project.name);
  };

  return (
    <ProjectContext.Provider
      value={{ currentProjectId, currentProjectName, selectProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
