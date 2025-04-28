'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '../../components/client/Header';

export default function Requests() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    const fetchUserRequests = async () => {
      try {
        const res = await fetch('/api/user-requests', {
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const userRequests = await res.json();
        console.log('Fetched requests:', userRequests);
        setRequests(userRequests);
      } catch (error) {
        console.error('Error fetching user requests:', error);
        setError('Failed to load requests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchUserRequests();
    } else {
      setLoading(false);
    }
  }, [session, status, router]);

  return (
    <div className="font-[family-name:var(--font-geist-sans)] min-h-screen">
      <Header />
      <main className="bg-white p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col min-h-[calc(100vh-80px)] gap-4 sm:gap-6 md:gap-8 rounded-2xl border border-gray-200 m-2 sm:m-3.5">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Requests</h1>

        {error && <div className="text-red-600 text-center">{error}</div>}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600">Loading...</p>
          </div>
        ) : requests.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">No requests found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <h2 className="text-lg font-semibold text-red-600">{request.emergencyType}</h2>
                <p className="text-gray-700 mt-2">{request.description || 'No description provided.'}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(request.createdAt).toLocaleString()}
                </p>
                {request.status && (
                  <p
                    className={`mt-2 text-sm font-medium ${
                      request.status === 'Resolved' ? 'text-green-600' : 'text-yellow-600'
                    }`}
                  >
                    Status: {request.status}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}