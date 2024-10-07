import serverAuth from "@/libs/serverAuth"
import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/libs/prismadb"

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        if(!params.id && typeof params.id !== "string"){
            throw new Error("Invalid ID")
        }

        const post = await prisma.post.findUnique({
            where: {
                id: params.id
            },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        })

        return NextResponse.json(post, { status: 200 })
    } catch (error) {
        return NextResponse.json({message: "Failed to fetch post"}, { status: 500 })
    }
}