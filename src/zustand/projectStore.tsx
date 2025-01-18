import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"

interface ProjectDetails {
  name: string;
  description: string;
  createdAt: string;
  repoUrl: string;
  deploymentLink: string;
  languagesUse: string[];
}

type ProjectVal = {
  projectDetail: ProjectDetails | null; 
  setProject: (project: ProjectDetails) => void;
  clearProject: () => void;
};


const useProjectStateStore = create<ProjectVal>()(
  devtools(
    persist(
      (set) => ({
        projectDetail: null, 
        setProject: (project) => set({ projectDetail: project }),
        clearProject: () => set({ projectDetail: null }),
      }),
      {
        name: "project-state", 
      }
    )
  )
);

export default useProjectStateStore;