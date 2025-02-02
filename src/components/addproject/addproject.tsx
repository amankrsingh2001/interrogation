"use client";

import { useState } from "react";
import InputField from "@/components/ui/input";
import axios from "axios";
import useFormStateStore from "@/zustand/formStore";
import { langUse } from "@/lib/projectLanguse";
import { DateFrmatter } from "@/utils/dateFormatter";
import useProjectStateStore from "@/zustand/projectStore";

interface ProjectDetails {
    name: string;
    description: string;
    createdAt: string;
    repoUrl: string;
    deploymentLink: string;
    languagesUse: string[];
  }

type ProjectState = {
  addProject: boolean;
  setAddProject: React.Dispatch<React.SetStateAction<boolean>>;
};

type GitVal = {
  username: string;
  repoName: string;
};

export default function Addproject({
  addProject,
  setAddProject,
}: ProjectState) {

  const increaseFormState = useFormStateStore(
    (state) => state.increaseFormState
  );

  const [projectval, setProjectVal] = useState<GitVal>({
    username: "",
    repoName: "",
  });

  const onInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setProjectVal({ ...projectval, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get<any, any>(
        `https://api.github.com/repos/${projectval.username}/${projectval.repoName}`
      );
      console.log(response,"This is the response")
      
      const { data } = response
      

      const { name, languages_url, created_at, homepage, clone_url, description } = data;

      

      const projectLang: string[] = await langUse(
        languages_url,
        projectval.username,
        projectval.repoName
      );

      const date = DateFrmatter(created_at);

      const repoDetails: ProjectDetails = {
        name,
        description:description,
        languagesUse: projectLang,
        createdAt: date,
        repoUrl: clone_url,
        deploymentLink: homepage,
      };
      increaseFormState();
       
    const setProject = useProjectStateStore.getState().setProject;
        setProject(repoDetails);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(`Error: ${error.response?.data.message}`);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }

    
  };

  return (
    <div
      className="fixed inset-0 z-[1000] place-items-center overflow-auto bg-[#e1e3e1] bg-opacity-10 backdrop-blur-sm"
      onClick={() => setAddProject(!addProject)}
    >
      <div className="flex h-screen w-full items-center  justify-center">
        <form
          className="border-2 border-black w-[45%] rounded-md shadow-xl flex flex-col justify-center items-center gap-2 py-8"
          onSubmit={onSubmitHandler}
          onClick={(e) => e.stopPropagation()}
        >
          <InputField
            name={"username"}
            placeholder="Github username"
            label={"Github username"}
            type={"text"}
            onchange={onInputChangeHandler}
          />
          <InputField
            name={"repoName"}
            placeholder="Repo name"
            label={"Repo name"}
            type={"text"}
            onchange={onInputChangeHandler}
          />
          <button
            className="bg-black text-white px-3 py-2 mt-4 w-[70%]"
            type="submit"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
