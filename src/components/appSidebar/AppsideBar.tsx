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
  Info as AboutIcon,
  ArrowRightLeft,
  BarChart3,
  Bell,
  Calendar,
  Car,
  ChevronDown,
  ChevronRight,
  CreditCard,
  FileText,
  LayoutDashboard,
  Shield as PrivacyIcon,
  RefreshCw,
  Settings,
  FileText as TermsIcon,
  Users,
} from "lucide-react";
import Image from 'next/image';
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

type SidebarItem = {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: { name: string; path: string; icon: React.ComponentType<{ className?: string }> }[];
};

const sidebars: SidebarItem[] = [
  { name: "Overview", path: "/", icon: LayoutDashboard },
  { name: "Users", path: "/users", icon: Users },
  { name: "Prescription Req...", path: "/prescription-requests", icon: FileText },
  // { name: "Pharmacy Request", path: "/pharmacy-request", icon: FileText },
  { name: "Drivers", path: "/drivers", icon: Car },
  { name: "Refill a Prescription", path: "/refill-prescription", icon: RefreshCw },
  { name: "Transfer a Prescr...", path: "/transfer-prescription", icon: ArrowRightLeft },
  { name: "Schedule Essential", path: "/schedule-essential", icon: Calendar },
  { name: "Business", path: "/business", icon: Calendar },
  { name: "Payments", path: "/payments", icon: CreditCard },
  { name: "Create Blogs", path: "/blogs", icon: CreditCard },
  { name: "Notifications", path: "/notifications", icon: Bell },
  { name: "Reports", path: "/reports", icon: BarChart3 },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
    subItems: [
      { name: "Terms & Conditions", path: "/settings/terms", icon: TermsIcon },
      { name: "Privacy Policy", path: "/settings/privacy", icon: PrivacyIcon },
      { name: "About", path: "/settings/about", icon: AboutIcon },
    ]
  },
];

export default function OptimusSidebar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const isSettingsActive = () => {
    return pathname.startsWith("/settings");
  };

  return (
    <Sidebar className="border-none">
      <SidebarContent className="bg-[#9c4a8f] text-white relative">
        {/* Custom scrollbar container */}
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 scrollbar-thumb-rounded-full hover:scrollbar-thumb-white/30">
          <SidebarGroup>
            {/* Logo Section */}
            <div className="flex flex-col items-center justify-center px-6 pt-8 pb-6 sticky top-0 bg-[#9c4a8f] z-10">
              <Image src={"/icons/logo.png"} height={1000} width={1000} alt='dashboard logo' className='w-full h-full' />
            </div>

            {/* Navigation Menu */}
            <SidebarGroupContent className="px-3 pt-4 pb-8">
              <SidebarMenu className="space-y-1">
                {sidebars.map((item) => {
                  const hasSubItems = item.subItems && item.subItems.length > 0;
                  const isItemActive = isActive(item.path) || (hasSubItems && isSettingsActive());

                  return (
                    <React.Fragment key={item.name}>
                      <SidebarMenuItem>
                        {hasSubItems ? (
                          <button
                            onClick={() => toggleDropdown(item.name)}
                            className={`w-full h-11 px-4 rounded-lg transition-colors flex items-center justify-between ${isItemActive
                              ? "bg-white text-[#9c4a8f] hover:bg-white hover:text-[#9c4a8f]"
                              : "text-white hover:bg-white/10"
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              <item.icon className="h-5 w-5 shrink-0" />
                              <span className="text-[15px] font-medium">{item.name}</span>
                            </div>
                            {openDropdown === item.name ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </button>
                        ) : (
                          <SidebarMenuButton
                            asChild
                            className={`h-11 px-4 rounded-lg transition-colors ${isItemActive
                              ? "bg-white text-[#9c4a8f] hover:bg-white hover:text-[#9c4a8f] cursor-pointer"
                              : "text-white hover:bg-white/10 cursor-pointer"
                              }`}
                          >
                            <Link href={item.path} className="flex items-center gap-3 cursor-pointer">
                              <item.icon className="h-5 w-5 shrink-0 cursor-pointer" />
                              <span className="text-[15px] font-medium cursor-pointer">{item.name}</span>
                            </Link>
                          </SidebarMenuButton>
                        )}
                      </SidebarMenuItem>

                      {/* Dropdown Sub-items */}
                      {hasSubItems && openDropdown === item.name && (
                        <div className="ml-8 space-y-1 mt-1 mb-2">
                          {item.subItems?.map((subItem) => {
                            const isSubItemActive = isActive(subItem.path);
                            return (
                              <SidebarMenuItem key={subItem.path}>
                                <SidebarMenuButton
                                  asChild
                                  className={`h-10 px-4 rounded-lg transition-colors cursor-pointer ${isSubItemActive
                                    ? "bg-white/20 text-white hover:bg-white/30 cursor-pointer"
                                    : "text-white/80 hover:bg-white/10 cursor-pointer"
                                    }`}
                                >
                                  <Link href={subItem.path} className="flex items-center gap-3 cursor-pointer">
                                    <subItem.icon className="h-4 w-4 shrink-0 cursor-pointer" />
                                    <span className="text-[14px] font-medium cursor-pointer">{subItem.name}</span>
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            );
                          })}
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>

      {/* Add custom scrollbar styles to global styles */}
      <style jsx global>{`
        /* For Webkit browsers (Chrome, Safari, Edge) */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        
        /* For Firefox */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
        
        /* Smooth scrolling */
        .scrollbar-thin {
          scroll-behavior: smooth;
        }
      `}</style>
    </Sidebar>
  );
}