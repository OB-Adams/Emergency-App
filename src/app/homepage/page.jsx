// src/app/homepage/page.jsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import EmergencyType from "../../components/client/EmergencyType";
import Header from "../../components/client/Header";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import EmergencyDesc from "../../components/client/EmergencyDesc";
import { toast } from "sonner";

export default function Homepage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Handle loading state
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // Protect the route: redirect to login if unauthenticated
  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }


  // State and logic (unchanged from your original code)
  const [emergencyType, setEmergencyType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emergencyType || !location) {
      toast.error('Please select an emergency type and location.', {
        duration: 3000,
        className: 'bg-red-600 text-white border border-red-800 rounded-xl shadow-md',
        descriptionClassName: 'text-sm font-medium',
      });
      return;
    }
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emergencyType, description, location }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('SOS request sent successfully!', {
          duration: 3000,
          className: 'bg-green-500 text-white border border-green-700 rounded-xl shadow-md',
          descriptionClassName: 'text-sm font-medium',
        });
      } else {
        toast.error('Failed to send request.', {
          duration: 3000,
          className: 'bg-red-600 text-white border border-red-800 rounded-xl shadow-md',
          descriptionClassName: 'text-sm font-medium',
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        duration: 3000,
        className: 'bg-red-600 text-white border border-red-800 rounded-xl shadow-md',
        descriptionClassName: 'text-sm font-medium',
      });
    }
  };

  const proofClick = async (e) => {
    e.preventDefault();
    toast.error('Feature Coming Soon.', {
      duration: 3000,
      className: 'bg-red-600 text-white border border-red-800 rounded-xl shadow-md',
      descriptionClassName: 'text-sm font-medium',
    });
  };

  // JSX (unchanged from your original code)
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="bg-white p-4 flex min-h-screen gap-14 rounded-2xl border border-gray-200 m-3.5">
        <div className="flex-1/2 m-2">
          <EmergencyType
            value={emergencyType}
            onChange={(newType) => {
              console.log('New emergency type selected:', newType);
              setEmergencyType(newType);
            }}
          />
          {emergencyType === "Other" && (
            <div className="mt-2.5 h-auto border border-red-600 w-full">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-2xl p-2 border-none focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Name the emergency: eg. Stuck in elevator"
              />
            </div>
          )}
          <EmergencyDesc
            value={description}
            onChange={(newDesc) => setDescription(newDesc)}
          />
        </div>
        
        <div className="flex-1/2">
          <div>
            <h2 className="text-lg font-bold">Location</h2>
            <hr className="mt-2.5 mb-4 border-gray-300" />
            <div className="flex w-full items-center">
              <img
                src="/icons/location.svg"
                alt="map pin"
                className="w-6 h-6 mr-2.5"
              />
              <input
                type="text"
                value={location}
                placeholder="Eg. Independence Square"
                className="border-2 border-red-600 rounded-lg w-96 p-2 mr-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                onChange={(e) => {setLocation(e.target.value)}}
              />
              <Button
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-100"
                onClick={() => toast('Open map modal or Google Maps here')}
              >
                Change
              </Button>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Attach proof</h2>
            <hr className="mt-2.5 mb-4 border-gray-300" />
            <div className="border-2 border-red-600 h-50 rounded-lg p-4 flex justify-around items-center">
              <button
                onClick={proofClick}
                className="flex flex-col items-center hover:bg-red-50 p-5 text-center"
              >
                <img
                  src="/icons/camera.png"
                  alt="Camera"
                  className="mb-1 w-16 h-16"
                />
                <span className="text-lg text-red-600">Click Pictures</span>
              </button>
              <button
                onClick={proofClick}
                className="flex flex-col items-center hover:bg-red-50 p-5 text-center"
              >
                <img
                  src="/icons/video.png"
                  alt="Video"
                  className="w-16 h-16 mb-1"
                />
                <span className="text-lg text-red-600">Video Recording</span>
              </button>
              <button
                onClick={proofClick}
                className="flex flex-col items-center hover:bg-red-50 p-5 text-center"
              >
                <img
                  src="/icons/voice.png"
                  alt="Mic"
                  className="w-16 h-16 mb-1"
                />
                <span className="text-lg text-red-600">Voice Recording</span>
              </button>
            </div>
            <p className="text-sm text-gray-500 text-center mt-2">**Coming Soon**</p>
            <Button
              onClick={handleSubmit}
              className="mt-6 bg-red-600 text-white px-6 py-2 rounded-3xl hover:bg-red-700 w-full md:w-auto"
            >
              Submit Emergency
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}