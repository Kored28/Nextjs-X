import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const GET = async (req: Request ) => {
    
    try {
        const { currentUser } = await serverAuth(req)

        return NextResponse.json(currentUser, {status: 200})
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch user' }, { status: 500 });    
    }
}