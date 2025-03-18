'use client'

import EmergencyType from "@/components/client/EmergencyType";
import Header from "../../components/client/Header";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import EmergencyDesc from "@/components/client/EmergencyDesc";

export default function Homepage() {
  const [emergencyType, setEmergencyType] = useState('');
  const [location, setLocation] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emergencyType, description, location }),
    });
    const data = await response.json();
    if (data.success) alert('SOS request sent successfully!');
    else alert('Failed to send request');
  };


  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Header/>
      <main className="bg-white p-4 flex min-h-screen gap-14 rounded-2xl border m-3.5">
        <div className="flex-1/2 m-2">
        <EmergencyType
          value={emergencyType}
          onChange={(newType) => {
            console.log('New emergency type selected:', newType); // Debug log
            setEmergencyType(newType);
          }}
        />
        {emergencyType === "Other" && (
          <div className="mt-2.5 h-auto border-red-600 w-full">
            <textarea className="w-full rounded-2xl p-2" name="" id="" placeholder="Name the emergency: eg. Stuck in elevator"></textarea>
          </div>
          )}
          <EmergencyDesc 
          value={null}
          onChange={null}
        />
        </div>
        
        <div className="flex-1/2">
          <div>
          <h2 className="text-lg font-bold">Location</h2>
          <hr />
          <Button
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-100"
              >
                Change
              </Button>
          </div>
          <div>
            <h2 className="text-lg font-bold mt-6 mb-2">Attach proof</h2>
            <hr className="mt-2.5 mb-4"/>
            <div className="border-2 border-red-600 h-50 rounded-lg p-4 flex justify-around items-center">
              <button
                disabled
                className="flex flex-col items-center hover:bg-red-50 p-5 "
              >
                <img
                  src="/icons/camera.png"
                  alt="Camera"
                  className="mb-1 w-16 h-16"
                />
                <span className="text-lg text-red-600">Click Pictures</span>
              </button>
              <button
                disabled
                className="flex flex-col items-center hover:bg-red-50 p-5 "
              >
                <img
                  src="/icons/video.png"
                  alt="Video"
                  className="w-16 h-16 mb-1"
                />
                <span className="text-lg text-red-600">Video Recording</span>
              </button>
              <button
                disabled
                className="flex flex-col items-center hover:bg-red-50 p-5  "
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
          className="mt-6 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 w-full md:w-auto"
        >
          Submit Emergency
        </Button>
          </div>
        </div>
      
      </main>
    </div>
  );
}