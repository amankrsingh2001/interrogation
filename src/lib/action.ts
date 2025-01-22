
import { prisma } from "@/app/lib/prisma";

import { auth } from "@clerk/nextjs/server";


export async function getProjects() {
    // Access database directly here
    const {userId} = await auth()
    
    if(!userId){
        throw new Error("userId isnt valid")
    }
    const projects = await prisma.project.findMany({
        where:{
            userId:userId
        },
        select:{
            name:true,
            description:true,
            createAt:true,
            repoUrl:true,
            liveLink:true,
            langUse:true
        }
    })

    return projects;

  }