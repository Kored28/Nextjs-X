import { NextRequest, NextResponse } from "next/server"
import prisma from "@/libs/prismadb"

interface UserIdBody {
    userId: string
}

export const GET = async(
    req: NextRequest,
    { params }: { params : { id: string } }
) => {
    try {
        if(!params.id || typeof params.id !== "string" ){
            throw new Error("Invalid user")
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                id: params.id
            }
        })

        const followersCount = await prisma.user.count({
            where: {
                followingIds: {
                    has: params.id
                }
            }
        })
        return NextResponse.json({ ...existingUser, followersCount }, { status: 200 })
    } catch (error) {
       return NextResponse.json({message: "userId is not found"}, { status: 500 })
    }
}