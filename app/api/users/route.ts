import { NextResponse } from "next/server"
import prisma from "@/libs/prismadb"

export const GET = async(req: Request) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(users, { status: 200 })
    } catch (error) {
       return NextResponse.json({message: "user is not found"}, { status: 500 })
    }
}