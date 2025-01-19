import { prisma } from "@/app/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({
            success: false,
            message: "User id isn't valid",
            status: 401
        });
    }

    const data = await prisma.project.findMany({
        where: { userId },
        select: {
            name: true,
            description: true,
            repoUrl: true,
            liveLink: true,
            createAt: true,
            langUse: true
        }
    });

    if (!data || data.length === 0) {
        return NextResponse.json({
            success: false,
            message: "No project found",
            status: 404
        });
    }

    return NextResponse.json({
        success: true,
        status: 200,
        data
    });
};
