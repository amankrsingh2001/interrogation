"use client";

import { useState } from "react";
import CrossIcon from './icon/crossIcon';

export default function Inputbox() {
  const [input, setInput] = useState<string>("");
  const [skillInput, setSkillsInput] = useState<string[]>([]);

  const inputChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const addTags = (e: any) => {
    if (e.key == "Enter" || e.key == ",") {
      e.preventDefault();
      if (skillInput.includes(input.trim())) {
        alert("This is already there");
      } else {
        const newSkills = [...skillInput, input.trim()];
        setSkillsInput(newSkills);
        console.log(newSkills,"This is the value")
        setInput('')
      }
    }
    
  };

  const crossHandler = (e:any, index:number) =>{
    console.log(index,"This is the index")
        const newVal = skillInput.filter((_, i) => i !== index);
        setSkillsInput(newVal)
  }

  

  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div className="flex flex-col gap-4 p-4  w-[40%] min-h-44 justify-center bg-gray-900 rounded-xl items-center">
      <form onSubmit={formSubmitHandler} className="flex gap-2 flex-col w-[60%]">
        <label className="font-bold text-xl text-white">Enter your skills</label>
        <input
        value={input}
          className="border-[1px] px-2 py-1 outline-none rounded-md border-gray-800"
          type="text"
          placeholder="Enter your skills here"
          onChange={inputChangeHandler}
          onKeyDown={addTags}
        />
      </form>
    <div className="flex flex-wrap ">
    {skillInput.map((skill, index) => {
        return (
          <div
            key={index}
            className="border-[1px]  relative  px-3 py-2 rounded-md text-black ">
            <p className="text-white">{skill}</p>
            <span className="absolute top-1  border-[1px] text-sm bg-slate-950 text-white  right-[1px] rounded-full cursor-pointer" onClick={(e)=>crossHandler(e, index)}>
               <CrossIcon/>
            </span>
          </div>

        );
      })}
    </div>
      
    </div>
  );
}
