import useProjectStateStore from "@/zustand/projectStore";
import { useForm } from "react-hook-form";
import RegisterInput from "../ui/registerInput";
import axios from "axios";
import useFormStateStore from "@/zustand/formStore";
import {useRouter} from "next/navigation"
import BackgroundPatter from "../icon/backgroundpatternsvg";


type Input = {
  name: string;
  description: string;
  repoUrl: string;
  projectUrl: string;
  langUse: string[];
};

export default function ProjectDetails() {

  const router = useRouter()
  const projectDetail = useProjectStateStore((state) => state.projectDetail);
  const initFormState = useFormStateStore((state) => state.initFormState);
  const clearProject = useProjectStateStore((state) => state.clearProject);

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Input>({
    defaultValues: projectDetail || {},
  });

  const SubmitHandler = async (data: any) => {
    console.log(data);
    const addProject = await axios.post("/api/addproject", data);
    if (addProject?.data?.success) {
      clearProject();
      initFormState();
      router.refresh();
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] place-items-center overflow-auto bg-[#C5BAFF] bg-opacity-10 backdrop-blur-sm">
      {/* <iframe src="https://class-notion.vercel.app/" width="WIDTH" height="HEIGHT" ></iframe> */}
      <div className=" relative w-full border-2 border-black h-screen flex justify-center items-center">
       
        <form
         className="flex flex-col relative z-10   overflow-hidden  justify-center items-center w-full max-w-md mx-auto gap-6 py-8 px-6 rounded-lg shadow-xl border border-gray-600"
          onSubmit={handleSubmit(SubmitHandler)}
        >
          
          <div className="absolute w-full h-full z-[-1] ">

          <BackgroundPatter />

          </div>
          <RegisterInput
            errors={errors}
            getValues={getValues}
            register={register}
            placeholder="Project Name"
            label="Project Name"
            name={"name"}
            type={"text"}
          />
          <RegisterInput
          errors={errors}
            getValues={getValues}
            register={register}
            placeholder="Add some more details about your project"
            label="Project Description"
            name={"description"}
            type={"text"}
          />
          <RegisterInput
          errors={errors}
            getValues={getValues}
            register={register}
            placeholder="Repository url"
            label="Repository Url"
            name={"repoUrl"}
            type={"text"}
          />
          <RegisterInput
          errors={errors}
            getValues={getValues}
            register={register}
            placeholder="Project url"
            label="Project Url"
            name={"deploymentLink"}
            type={"text"}
          />
          <RegisterInput
          errors={errors}
            getValues={getValues}
            register={register}
            placeholder="Languages Use"
            label="Languages Use"
            name={"langUse"}
            type={"text"}
          />
          <button className="bg-black rounded-md px-3 py-2 mt-3 text-white w-[70%]" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
