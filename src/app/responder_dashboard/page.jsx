'use client';

import Header from "../../components/client/Header";
import { toast } from "sonner";
import React from "react";
import { AppSidebar } from "../../components/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "../../components/ui/sidebar";
import { Separator } from "../../components/ui/separator";


export default function ResponderDashboard() {
    const handleClick = () => {
        toast.success("Request Approved")
    }
   
    return(
        <SidebarProvider className={"flex"}>
            <AppSidebar className={"flex-1/6"}/>
            <SidebarInset className={"flex-5/6"}>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-muted/50" />
                    <div className="aspect-video rounded-xl bg-muted/50" />
                    <div className="aspect-video rounded-xl bg-muted/50" />
                </div>
                <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
                </div>
            </SidebarInset>
        </SidebarProvider>

      
    );

    
}