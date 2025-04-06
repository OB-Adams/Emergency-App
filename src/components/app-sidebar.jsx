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
          url: "#",
        },
        {
          title: "Active Requests",
          url: "#",
        },
      ],
    },
    {
      title: "History",
      url: "#",
      items: [
        {
          title: "Weekly",
          url: "#",
        },
        {
          title: "Monthly",
          url: "#",
        },
        {
          title: "Yearly",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({
  ...props
}) {
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
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
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
