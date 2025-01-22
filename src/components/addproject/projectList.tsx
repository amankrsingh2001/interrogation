

import { getProjects } from "@/lib/action";
import ProjectCard from "../ui/project-Card";



interface ProjectCardProps {
  name: string
  description: string
  liveLink: any
  repoUrl: string
  langUse?: string[]
  createAt: string
}

export default async function ProjectList() {

    const projects:ProjectCardProps[] = await getProjects()


  return (
    <div className="flex flex-wrap gap-4 border-2 min-w-md p-8 border-900-gray">
      {
       ( projects !== undefined && projects.length >0 )? <div className="flex flex-wrap  gap-4">
        {
            projects.map((project, index)=>{
              return <div className="flex" key={index}>
                  <ProjectCard name={project.name} description={project.description}
                    liveLink={project.liveLink} repoUrl = {project.repoUrl} langUse={project.langUse} createAt={project.createAt}

                  />
                </div>

            })    
        }    
       </div>:<div>
        <p>You haven't added any project</p>
       </div> 
      }
    </div>
  );
}