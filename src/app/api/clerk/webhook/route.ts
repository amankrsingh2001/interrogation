import { prisma } from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export const POST = async(req:NextRequest)=>{
    const {data} = await req.json()
    const email = data.email_addresses[0].email_address
    const firstName = data.first_name
    const lastName = data.last_name
    const imageUrl = data.image_url
    await prisma.user.create({
        data:{
            email:email,
            firstName:firstName,
            lastName:lastName,
            imageUrl:imageUrl
        }
    })
        
    return new Response("webhook working", {status:200})
}