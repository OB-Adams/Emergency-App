import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route'; 
import { connectDB } from '../../lib/utils/db'; 

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { emergencyType, description, location, coordinates } = await req.json();

    if (!emergencyType || !location || !coordinates) {
      return NextResponse.json({ success: false, error: 'Missing fields' }, { status: 400 });
    }

    const { db } = await connectDB();
    const emergencyRequests = db.collection('emergency_requests'); 

    const result = await emergencyRequests.insertOne({
      userName: session.user.name || 'Guest',
      contact: session.user.mobilePhone || '', 
      emergencyType,
      description: description || '',
      location,
      coordinates,
      status: 'pending',
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('❌ Emergency request error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.isAdmin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectDB();
    const emergencyRequests = db.collection('emergency_requests');

    const rawRequests = await emergencyRequests.find().sort({ createdAt: -1 }).toArray();
    
    const transformedRequests = rawRequests.map((doc) => ({
      id: doc._id.toString(),
      type: doc.emergencyType || 'N/A',
      fullname: doc.userName || 'Unknown',
      contact: doc.contact || 'Not provided', 
      time: new Date(doc.createdAt).toLocaleTimeString(),
      location: doc.location || 'Not specified',
      coordinates: doc.coordinates || 'Not available',
      description: doc.description || '',
      status: doc.status || 'pending',
      createdAt: doc.createdAt || new Date(),
    }));

    return NextResponse.json({ success: true, data: transformedRequests }, { status: 200 });
  } catch (error) {
    console.error('❌ Failed to fetch emergency requests:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}