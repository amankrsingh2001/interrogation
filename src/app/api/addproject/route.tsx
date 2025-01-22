import { prisma } from "@/app/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export const POST = async(req:NextRequest)=>{

        const {name, description, createdAt, repoUrl, deploymentLink, languagesUse} = await req.json()
        
        const {userId} = await auth()
       
        if(!userId){
            return NextResponse.json({
                success:false,
                message:"User Id isn't valid"
            })
        }
            const createproject = await prisma.project.create({
                data:{
                    name:name,
                    description:description,
                    langUse:languagesUse,
                    userId:userId,
                    createAt:createdAt,
                    liveLink:deploymentLink,
                    repoUrl:repoUrl
                }
            })
        if(!createproject){
            return NextResponse.json({
                message:"Something went wrong"
            })
        }
        return NextResponse.json({
            success:true,
            message:"Project Added Successfully",
            
        })
}