'use client';

import Header from "../../components/client/Header";
import { toast } from "sonner";
import React from "react";


export default function ResponderDashboard() {
    const handleClick= ()=>{
        <toast className="show">Request approved!</toast>
    }
   
    return(
        <div className="space-y-4">
            <h1>Request Details</h1>
            <h6>Request ID </h6>
            <h6>Date of Request</h6>

            <div>
            <button className="text-white bg-green-500 rounded hover:bg-green-600 w-32 h-12 " onClick={handleClick}>Approve request</button>
            </div>
        </div>
      
    );

    
}