import * as React from "react"

import { SearchForm } from "../components/search-form"
import { VersionSwitcher } from "../components/version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Requests",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "dashboard",
        },
        {
          title: "Active Requests",
          url: "active",
        },
      ],
    },
    {
      title: "History",
      url: "#",
      items: [
        {
          title: "Weekly",
          url: "weekly",
        },
      ],
    },
  ],
}

export function AppSidebar({ setActiveTab, ...props }) {
  const handleTabClick = (tab) => {
    setActiveTab(tab.toLowerCase());
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className={"flex-row items-center"}>
        <img
          src="/icons/logo.svg"
          alt="Emergency Icon"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
        />
        <span className="text-red-600 font-bold text-sm sm:text-base md:text-lg hidden sm:inline">
          Emergency Response App
        </span>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => handleTabClick(item.url)}
                      isActive={item.url === props.activeTab}
                    >
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}