'use client'

import EmergencyType from "@/components/client/EmergencyType";
import Header from "../../components/client/Header";
import { useState } from "react";
import EmergencyDesc from "@/components/client/EmergencyDesc";

export default function Homepage() {
  const [emergencyType, setEmergencyType] = useState('')
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch('/api/requests', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ emergencyType, description, location }),
  //   });
  //   const data = await response.json();
  //   if (data.success) alert('SOS request sent successfully!');
  //   else alert('Failed to send request');
  // };


  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Header/>
      <main className="bg-white p-4 flex min-h-screen rounded-2xl border m-3.5">
        <div className="flex-1/3 m-2">
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
        
        <div className="flex-2/3 bg-black">

        </div>
      
      </main>
    </div>
  );
}