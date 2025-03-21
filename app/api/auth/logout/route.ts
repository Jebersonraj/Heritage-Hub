// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const response = NextResponse.json({ message: 'Logout successful' });
    response.cookies.delete('token');
    return response;
}