import serverAuth from "@/libs/serverAuth"
import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/libs/prismadb"

interface RequestProps {
    postId: string;
}

//POST Method
export const POST = async(req: NextRequest ) => {
    try {
        const { currentUser } = await serverAuth(req)

        const body: RequestProps = await req.json()
        const { postId } = body

        if(!postId || typeof postId !== "string" ){
            throw new Error("Invalid ID")
        }

        const post =  await prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        if(!post){
            throw new Error("Invalid ID")
        }

        let updatedLikedIds = [...(post.likedIds || [])]

        updatedLikedIds.push(currentUser.id)

        if(post?.userId){
            await prisma.notification.create({
                data: {
                    body: "Someone liked your post",
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
        
        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        })

        return NextResponse.json(updatedPost, { status: 200 })

    } catch (error) {
        return NextResponse.json({message: "Failed to like"}, { status: 500 })
    }
}

// DELETE Method
export const DELETE = async(req: NextRequest ) => {
    try {
        const { currentUser } = await serverAuth(req)

        const body: RequestProps = await req.json()
        const { postId } = body

        if(!postId || typeof postId !== "string" ){
            throw new Error("Invalid ID")
        }

        const post =  await prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        if(!post){
            throw new Error("Invalid ID")
        }

        let updatedLikedIds = [...(post.likedIds || [])]

        updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser.id)

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        })

        return NextResponse.json(updatedPost, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Failed to delete like"}, { status: 500 })
    }
}