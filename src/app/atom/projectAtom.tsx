import { atom } from "recoil";

interface ProjectDetails{
    name:string
    description?:string
    deploymentLink:string
    repoUrl:string
    createdAt:string
    languagesUse:string
}



export const projectAtom = atom<ProjectDetails | {}>({
        key:"projectAtom",
        default:{}
})

export const formStateAtom = atom<number>({
        key:"formStateAtom",
        default:0
})