"use client"


import { useState } from "react"
import InputField from "@/components/ui/input"
import axios from "axios"

interface ProjectDetails{
    title:string
    description?:string
    deploymentLink:string
    repoUrl:string
    fullName:string
    createdAt:string
    updatedAt:string
    languagesUrl:string
}

type GitVal = {
    username:string,
    repoName:string
}

export default function Addproject(){
    const [projectval, setProjectVal] = useState<GitVal>( {
        username:'',
        repoName:''
    })
    const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
        title:'',
        description:'',
        deploymentLink:'',
        repoUrl:'',
        fullName:'',
        createdAt:'',
        updatedAt:'',
        languagesUrl:''

    })

    const onInputChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) =>{
        e.preventDefault()
        setProjectVal({...projectval,[e.target.name]:e.target.value})
    }

    const onSubmitHandler = async(e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault()
            try {
                const data = await axios.get<any, any>(`https://api.github.com/repos/${projectval.username}/${projectval.repoName}`)
                console.log(data?.name,"This is the data")
                
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error(`Error: ${error.response?.data.message}`);
                  } else {
                    console.error("An unexpected error occurred:", error);
                  }
            }

            
    }


    return <div className="flex h-screen items-center justify-center">
            <form className="border-2 border-black w-[60%] flex flex-col justify-center items-center gap-2"  onSubmit={onSubmitHandler}>
                    <InputField name={'username'} placeholder="Github username" label={"Github username"} type={'text'} onchange={onInputChangeHandler}/>
                    <InputField name={'repoName'} placeholder="Repo name" label={"Repo name"} type={'text'} onchange={onInputChangeHandler}/>
                    <button type="submit">Submit</button>
            </form>
    </div>
} 