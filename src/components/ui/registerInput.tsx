import { UseFormRegister } from "react-hook-form"

interface IFormValues {
    name:string,
    description:string,
    repoUrl:string,
    projectUrl:string,
    langUse:string[]
}

type Inputprops = {
    placeholder:string,
    label:string,
    name:string,
    type:string
    value?:string
    font?:string
    onchange?:(e: React.ChangeEvent<HTMLInputElement>)=>void
    onKeyDown?:(e: React.KeyboardEvent<HTMLInputElement>)=>void
    register?:any 
    getValues?:any 
    errors?:any
}

export default function RegisterInput({onchange, onKeyDown ,placeholder, type, value ,name,label, register, getValues, errors}:Inputprops) {
    
    return (
        <div className="flex flex-col gap-3 w-[70%] justify-center">
            <label className="font-semibold font-serif text-md items-start">{label}</label>
                <input  {...register(name,{required:`${name.toUpperCase()} is required`})} className="border-[1px] border-gray-600 rounded-md px-3 py-2   shadow-md outline-none"
                    onChange={onchange}
                    onKeyDown={onKeyDown} 
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    /> 
               {errors[name] && (
        <p style={{ color: "red" }}>{errors[name]?.message}</p>
      )}
           
        </div>
    )
}