type Inputprops = {
    placeholder:string,
    label:string,
    name:string,
    type:string
    value?:string
    font?:string
    onchange:(e: React.ChangeEvent<HTMLInputElement>)=>void
    onKeyDown?:(e: React.KeyboardEvent<HTMLInputElement>)=>void
}

export default function InputField({onchange,onKeyDown ,placeholder, type, value,name,label}:Inputprops) {
    return (
        <div className="flex flex-col gap-3 w-[70%] justify-center  px-3 ">
            <label className="font-semibold font-serif text-xl items-start">{label}</label>
            <input className="border-[1px] border-gray-600 rounded-md px-3 py-3 outline-none"
                onChange={onchange}
                onKeyDown={onKeyDown} 
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}/>
        </div>
    )
}