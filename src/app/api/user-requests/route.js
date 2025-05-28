import { connectDB } from '../../lib/utils/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    console.log('Session:', session);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectDB();
    const requestsCollection = db.collection('emergency_requests');

    console.log('Querying collection: emergency_requests with userName:', session.user.name);
    const userRequests = await requestsCollection
      .find({ userName: session.user.name })
      .sort({ createdAt: -1 })
      .toArray();
    console.log('Requests:', userRequests);

    return NextResponse.json(userRequests);
  } catch (error) {
    console.error('Error in /api/user-requests:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}