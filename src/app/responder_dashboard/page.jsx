'use client';

//import Header from "../../components/client/Header";
import React from "react";
import { useState } from "react";
//import { FaBars, FaHome, FaClipboardList, FaHistory, FaCheckCircle, FaFileAlt, FaCog, FaSignOutAlt } from "react-icons/fa";


export default function ResponderDashboard() {
//creating the dasboard
    const Sidebar = () =>{
        const [sidebarOpen, setSidebarOpen] = useState(true);

    }


//approving emergency request
    const handleClick= ()=>{
        <toast className="show">Request approved!</toast>
    }
   
    return(
    //sidebar    
    <>        
        <div className= "h-screen w-64 bg-white text-red fixed top-0 left-0 flex flex-col p-4">
             <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li className="hover:bg-gray-700 p-2 rounded">
          <a href="/requests">Emergency Requests</a>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <a href="/history">Request History</a>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <a href="/reports">Weekly Reports</a>
        </li>
      </ul>
    </div>
  
    //main area    
        <div className="ml space-y-4">
            <h1>Request Details</h1>
            <h6>Request ID </h6>
            <h6>Date of Request</h6>
            <div>
                <button className="text-white bg-green-500 rounded hover:bg-green-600 w-32 h-12 " onClick={handleClick}>Approve request</button>
            </div                       >
        </div>
            
            
    </>
      
    );

    
}