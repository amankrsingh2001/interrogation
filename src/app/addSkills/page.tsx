"use client"

import CrossIcon from "@/components/icon/crossIcon"
import InputField from "@/components/ui/input"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"



export const Colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-yellow-500",
  ];

  interface Skill {
    name:string,
    color:string
  }

export default function AddSkills(){
    const router = useRouter()
    const [skills, setSkills] = useState<string>('')
    const [allSkills , setAllSkills] = useState<Skill[]>([])
    const [loading , setLoading] = useState<Boolean>(false)


    const randomColorPick = ():string =>{
        const num = Math.floor(Math.random()*7)
        return Colors[num]
    }

    const inputChangehandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()
        setSkills(e.target.value)
    }

    const addSkillsHandler = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        
        if(e.key=="Enter" || e.key==','){
            e.preventDefault()
            if(allSkills.some((skill)=>skill.name === skills.trim())){
                alert("New skills daal yrr")
            }else{
                const newSkills = {name:skills.trim(), color:randomColorPick()}
                setAllSkills([...allSkills, newSkills])
                setSkills('')
            }
        }
    }

    const crossHandler = (e:any, index:number) =>{
                const newVal = allSkills.filter((_, i) => i !== index);
                    setAllSkills(newVal)
          }
        
    const formSubmitHandler = async(e:React.FormEvent<HTMLFormElement>)=>{
            e.preventDefault()
            setLoading(true)
            const data :string[]=[]

            allSkills.map((skills)=>{
                if(!data.includes(skills.name)){
                    data.push(skills.name)
                }
            })
            try {
                const res = await axios.post('/api/skills',data)
                if(res.status == 200){
                    router.push('/addProject')
                }
            } catch (error:unknown) {
                console.log(error)
            }
            setLoading(false)
            
        }

    return <div className="flex flex-col w-screen justify-center items-center h-screen">
            <form onSubmit={formSubmitHandler} className="flex  flex-col justify-center items-center bg-slate-300 w-[40%] min-h-56 rounded-lg gap-8">
        <InputField placeholder={"Enter you skills seprated by comma (,)"} type="text" name={"skills"}  label="Enter you skills seprated by"
        value={skills}
        onchange={inputChangehandler}
        onKeyDown={addSkillsHandler}
        />
        <button className="bg-black w-[40%] text-white rounded-md px-3 py-2" type="submit">Next</button>
    </form>

    <div className="flex gap-3 flex-wrap mt-4 w-[40%] p-4 ">
        
    {allSkills.map((skill, index) => {
            return (
              <div
                key={index}
                className={`border-[1px] flex w-fit relative px-4  py-2 rounded-3xl ${skill.color}`}>
                <p className="text-white text-start font-mono font-semibold text-sm px-2">{skill.name}</p>
                <span className=" font-bold  text-white  rounded-full ml-2 cursor-pointer" onClick={(e)=>crossHandler(e, index)}>
                   <CrossIcon/>
                </span>
              </div>
            );
          })}
          </div>
</div>
     
}