import useProjectStateStore from "@/zustand/projectStore";
import { useForm } from "react-hook-form";
import RegisterInput from "../ui/registerInput";
import axios from "axios";
import useFormStateStore from "@/zustand/formStore";

type Input = {
  name: string;
  description: string;
  repoUrl: string;
  projectUrl: string;
  langUse: string[];
};

export default function ProjectDetails() {
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
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] place-items-center overflow-auto bg-[#e1e3e1] bg-opacity-10 backdrop-blur-sm">
      {/* <iframe src="https://class-notion.vercel.app/" width="WIDTH" height="HEIGHT" ></iframe> */}
      <div className="w-full border-2 border-black h-screen flex justify-center items-center">
        <form
          className="flex flex-col justify-center items-center border-[1px] border-gray-500 w-[45%] gap-4 py-12 rounded-md  shadow-lg"
          onSubmit={handleSubmit(SubmitHandler)}
        >
          <RegisterInput
            getValues={getValues}
            register={register}
            placeholder="Project Name"
            label="Project Name"
            name={"name"}
            type={"text"}
          />
          <RegisterInput
            getValues={getValues}
            register={register}
            placeholder="Add some more details about your project"
            label="Project Description"
            name={"description"}
            type={"text"}
          />
          <RegisterInput
            getValues={getValues}
            register={register}
            placeholder="Repository url"
            label="Repository Url"
            name={"repoUrl"}
            type={"text"}
          />
          <RegisterInput
            getValues={getValues}
            register={register}
            placeholder="Project url"
            label="Project Url"
            name={"deploymentLink"}
            type={"text"}
          />
          <RegisterInput
            getValues={getValues}
            register={register}
            placeholder="Languages Use"
            label="Languages Use"
            name={"langUse"}
            type={"text"}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
