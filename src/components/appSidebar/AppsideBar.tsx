"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ArrowRightLeft,
  BarChart3,
  Bell,
  Calendar,
  Car,
  CreditCard,
  FileText,
  LayoutDashboard,
  RefreshCw,
  Settings,
  Users
} from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type SidebarItem = {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
};

const sidebars: SidebarItem[] = [
  { name: "Overview", path: "/", icon: LayoutDashboard },
  { name: "Users", path: "/users", icon: Users },
  { name: "Prescription Req...", path: "/prescription-requests", icon: FileText },
  { name: "Drivers", path: "/drivers", icon: Car },
  { name: "Refill a Prescription", path: "/refill-prescription", icon: RefreshCw },
  { name: "Transfer a Prescr...", path: "/transfer-prescription", icon: ArrowRightLeft },
  { name: "Schedule Essential", path: "/schedule-essential", icon: Calendar },
  { name: "Business", path: "/business", icon: Calendar },
  { name: "Payments", path: "/payments", icon: CreditCard },
  { name: "Notifications", path: "/notifications", icon: Bell },
  { name: "Reports", path: "/reports", icon: BarChart3 },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function OptimusSidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <Sidebar className="border-none">
      <SidebarContent className="bg-[#9c4a8f] text-white">
        <SidebarGroup>
          {/* Logo Section */}
          <div className="flex flex-col items-center justify-center px-6 pt-8 pb-6">
            <Image src={"/icons/logo.png"} height={1000} width={1000} alt='dashboard logo' className='w-full h-full' />
          </div>

          {/* Navigation Menu */}
          <SidebarGroupContent className="px-3 pt-8">
            <SidebarMenu className="space-y-1">
              {sidebars.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    className={`h-11 px-4 rounded-lg transition-colors ${isActive(item.path)
                      ? "bg-white text-[#9c4a8f] hover:bg-white hover:text-[#9c4a8f]"
                      : "text-white hover:bg-white/10"
                      }`}>
                    <Link href={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="text-[15px] font-medium">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}