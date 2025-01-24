"use client";

import AddIcon from "@/components/icon/AddIcon";
import Addproject from "@/components/addproject/addproject";
import ProjectDetails from "@/components/addproject/projectDetails";
import ProjectList from "@/components/addproject/projectList";
import useFormStateStore from "@/zustand/formStore";
import { useState } from "react";
import { FaTeamspeak } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Homeproject() {
  const [addProject, setAddProject] = useState<boolean>(false);
  const formState = useFormStateStore((state) => state.formState);
  const router = useRouter()
  const increaseFormState = useFormStateStore(
    (state) => state.increaseFormState
  );

  console.log(formState);

  const buttonClickHandler = () => {
    increaseFormState();
    console.log(formState);
  };

  const interViewClickHandler = ()=>{
    router.push('/instruction')
  }

  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold font-serif">My Projects</h1>

        <div className="flex items-center gap-4">
        
          <button className="flex text-white text-md font-semibold font-serif py-2 px-3 rounded-md gap-2 bg-black" onClick={buttonClickHandler}>
            {" "}
            <AddIcon />
            Add project
          </button>

         <button className="flex text-white text-md items-center font-semibold font-serif py-2 px-3 rounded-md gap-2 bg-black" onClick={interViewClickHandler}>
            {" "}
            <FaTeamspeak />
          Start Interview
          </button> 
        </div> 

       

      </div>

      {formState === 1 && (
        <Addproject addProject={addProject} setAddProject={setAddProject} />
      )}

      {formState === 2 && <ProjectDetails />}
    </div>
  );
}
