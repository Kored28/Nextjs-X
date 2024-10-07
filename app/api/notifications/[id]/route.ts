import serverAuth from "@/libs/serverAuth"
import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/libs/prismadb"

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        if(!params.id || typeof params.id !== "string"){
            throw new Error("Invalid ID")
        }

        const notifications = await prisma.notification.findMany({
            where: {
                userId: params.id
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        await prisma.user.update({
            where: {
                id: params.id,
            },
            data: {
                hashNotification: false,
            }
        })

        return NextResponse.json(notifications, { status: 200 })

    } catch (error) {
        return NextResponse.json({message: "Failed to fetch notifications"}, { status: 500 })
    }
}