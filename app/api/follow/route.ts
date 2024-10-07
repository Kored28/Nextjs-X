import serverAuth from "@/libs/serverAuth"
import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/libs/prismadb"
import { NextApiRequest } from "next"

interface RequestBodyProps {
    userId: string;
}

// POST method
export const POST = async (req: NextRequest) => {
    try {
        const { currentUser } = await serverAuth(req)

        const body: RequestBodyProps  = await req.json()

        const { userId } = body

        if(!userId || typeof userId !== "string"){
            throw new Error("Invalid ID")
        }
        
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user){
            throw new Error("Invalid ID")
        }

        let updatedFollowingIds = [...(user.followingIds || [])]

        updatedFollowingIds.push(userId)

        if(userId){
            await prisma.notification.create({
                data: {
                    body: "Someone followed you",
                    userId: userId
                }
            })

            await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    hashNotification: true
                }
            })
        }

        const updateUser = await prisma.user.update({
            where: {
                id: currentUser?.id
            },
            data: {
                followingIds: updatedFollowingIds
            }
        })

       return NextResponse.json(updateUser, { status: 200 })

    } catch (error) {
        return NextResponse.json({message: "Failed to post"}, { status: 500 })
    }
}


// DELETE method
export const DELETE = async (req: any) => {
    try {
        const { currentUser } = await serverAuth(req)
        
        const body: RequestBodyProps  = await req.json()

        const { userId } = body

        if(!userId || typeof userId !== "string"){
            throw new Error("Invalid ID")
        }
        
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user){
            throw new Error("Invalid ID")
        }

        let updatedFollowingIds = [...(user.followingIds || [])]

        updatedFollowingIds.filter(followingId => followingId !== userId)

        const updateUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followingIds: updatedFollowingIds
            }
        })

        return NextResponse.json(updateUser, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Failed to post"}, { status: 500 })
    }
}