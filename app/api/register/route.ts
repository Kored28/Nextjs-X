import bcrypt from "bcrypt"

import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server";

interface RegisterRequestBody {
    email: string;
    username: string;
    name: string;
    password: string;
}

export const POST = async(req: Request) => {

    try {
        const body: RegisterRequestBody = await req.json();
        const { email, username, name, password } = body

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await prisma?.user.create({
            data: {
                email,
                username,
                name,
                hashedPassword
            }
        })

        return NextResponse.json(user, { status: 201 });
    } catch (error) {
       return NextResponse.json({ message: 'Failed to create account' }, { status: 500 });    
    }
}