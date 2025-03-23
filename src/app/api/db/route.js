import { NextResponse } from 'next/server';
import connectDB from '../../lib/utils/db';

export async function GET() {
    try {
        await connectDB();
        return NextResponse.json({ message: "MongoDB connection successful 🚀" });
    } catch (error) {
        return NextResponse.json({ error: "Database connection error" }, { status: 500 });
    }
}
