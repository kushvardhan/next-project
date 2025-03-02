import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const response = NextResponse.json({ message: "User logged Out", success: true });

        response.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0),
            path: '/',
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
