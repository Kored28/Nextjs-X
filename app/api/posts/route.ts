import serverAuth from "@/libs/serverAuth"
import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/libs/prismadb"

interface PostRequestProps{
    body: string;
}

// POST method
export const POST = async( req: Request ) => {
    try {
        const { currentUser } = await serverAuth(req)
        const postBody: PostRequestProps = await req.json()
        const { body } = postBody

        const post = await prisma.post.create({
            data: {
                body,
                userId: currentUser.id
            }
        })

        return NextResponse.json(post, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Failed to post"}, { status: 500 })
    }
}

// GET Method
export const GET = async( 
    req: NextRequest,
) => {
    try {
        const url = new URL(req.url)
        const searchParams = new URLSearchParams(url.searchParams)

        const userId = searchParams.get("userId")        
        let posts;

        if(userId && typeof userId === "string"){
            posts = await prisma.post.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    user: true,
                    comments: true,
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
        } else {
            posts = await prisma.post.findMany({
                include: {
                    user: true,
                    comments: true,
                },
                orderBy: {
                    createdAt: "desc"
                }
            })
        }

        return NextResponse.json(posts, { status: 200 })

    } catch (error) {
        return NextResponse.json({message: "Failed fetch posts"}, { status: 500 })
    }
}
