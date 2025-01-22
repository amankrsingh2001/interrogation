
import Homeproject from "@/components/addproject/Homeproject";
import ProjectList from "@/components/addproject/projectList";
import { Suspense } from "react";


export default async function (){
  

  return <div className="flex flex-col">

      <Homeproject/>

      <Suspense fallback={<div>Loading projects...</div>}> 
           <ProjectList /> 
        </Suspense>

  </div>
}