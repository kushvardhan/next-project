import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        console.log("Login Attempt:", reqBody);

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User doesn't exist." }, { status: 400 });
        }
        
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ message: "Incorrect password." }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        const response = NextResponse.json({ message: "User logged in successfully", success: true });

        response.cookies.set('token',token,{
            httpOnly:true
        })
        return response;

    } catch (error: any) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
