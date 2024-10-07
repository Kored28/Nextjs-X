import serverAuth from "@/libs/serverAuth"
import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/libs/prismadb"

interface PostRequestProps{
    body: string;
}

//POST Method
export const POST = async (req: NextRequest) => {
    try {
        const { currentUser } = await serverAuth(req)
        const bodyProps: PostRequestProps = await req.json()
        const { body } = bodyProps

        const url = new URL(req.url)
        const searchParams = new URLSearchParams(url.searchParams)

        const postId = searchParams.get("postId")

        if(!postId || typeof postId !== "string"){
            throw new Error("Invalid Post ID")
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        if(post?.userId){
            await prisma.notification.create({
                data: {
                    body: "Someone replied to your post",
                    userId: post.userId
                }
            })

            await prisma.user.update({
                where: {
                    id: post.userId
                },
                data: {
                    hashNotification: true
                }
            })
        }

        const comment = await prisma.comment.create({
            data: {
                body,
                userId: currentUser.id,
                postId
            }
        })

        return NextResponse.json(comment, { status: 200 })

    } catch (error) {
        NextResponse.json({ message: "failed to post comment"}, { status: 500 })
    }
}

