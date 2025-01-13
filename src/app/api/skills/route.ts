import { prisma } from "@/app/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";




export const POST = async(req:NextRequest)=>{
    try {
        const data:string[] = await req.json()
        if(data.length === 0){
            return NextResponse.json({message:"Skills cannot be empty"},{status:404})
        }
        const {userId} = await auth()
        if(!userId){
            return NextResponse.json({message:"userId is not valid"},{status:404})
        }
        const userSkills = await prisma.user.findFirst({
            where:{
                id:userId
            },
            select:{
                skills:true
            }
        })
        const newSkills = data.filter((skills)=>!userSkills?.skills.includes(skills))

        if(newSkills.length===0){
            return NextResponse.json({message:"No new skills added"},{status:404})
        }
        
        await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                skills:{
                    push:newSkills,
                } 
            }
        })
        return NextResponse.json({message:"Skills added successfully"},{status:200})        
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:error},{status:500})        
    }
 
}