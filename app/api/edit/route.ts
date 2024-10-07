import serverAuth from "@/libs/serverAuth"
import { NextResponse } from "next/server"
import prisma from "@/libs/prismadb"

interface RequestProps {
    name: string;
    username: string;
    bio: string;
    profileImage: string;
    coverImage: string;
}

export const PATCH = async(req: Request ) => {
    try {
        const { currentUser } = await serverAuth(req)

        if(!currentUser){
            throw new Error("current user not found")
        }

        const body: RequestProps = await req.json()
        const { name, username, bio, profileImage, coverImage } = body

        if(!name || !username){
            throw new Error("Missing Fields")
        }

        const updateUser = await prisma.user.update({
            where: {
                id: currentUser.id
            }, 
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage,
            }
        })

        return NextResponse.json(updateUser, { status: 200 })

    } catch (error) {
        return NextResponse.json({message: "update not found"}, { status: 500 })
    }
}