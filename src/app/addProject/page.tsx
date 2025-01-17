"use client"

import AddIcon from "@/components/icon/AddIcon";
import Addproject from "@/components/project";
import ProjectDetails from "@/components/projectDetails";
import useFormStateStore from "@/zustand/projectStore";
import { useState } from "react";




export default function Project(){
    const [addProject, setAddProject] = useState<boolean>(false)
    const formState = useFormStateStore((state) => state.formState)
    const increaseFormState = useFormStateStore((state)=>state.increaseFormState)

    console.log(formState)

    const buttonClickHandler = () =>{
        increaseFormState()
        console.log(formState)
    }

    return <div className="flex flex-col p-4">
        <div className="flex justify-between">
            <h1 className="text-2xl font-bold font-serif">My Projects</h1>
            <div className="flex bg-black text-white text-md font-semibold font-serif py-2 px-3 rounded-md gap-2">
                    <AddIcon/>
                <button className=""  onClick={buttonClickHandler}> Add project</button>
            </div>
        </div>  

        {
              formState === 1  &&  <Addproject addProject={addProject} setAddProject = {setAddProject} /> 
        }

        {
            formState === 2   && <ProjectDetails/>
        }


    </div>
}