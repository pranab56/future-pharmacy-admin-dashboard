"use client";

import { Card } from "@/components/ui/card";
import { Calendar, IdCard, Users, DollarSign } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  bgColor: string;
  iconBgColor: string;
  iconColor: string;
  textColor: string;
}

function StatCard({
  icon,
  value,
  label,
  bgColor,
  iconBgColor,
  iconColor,
  textColor,
}: StatCardProps) {
  return (
    <Card className={`${bgColor} border-none shadow-sm p-0`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-8">
          <div
            className={`${iconBgColor} w-14 h-14 rounded-full flex items-center justify-center`}
          >
            <div className={iconColor}>{icon}</div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{value}</div>
        </div>
        <div className={`${textColor} text-base font-medium`}>{label}</div>
      </div>
    </Card>
  );
}

function DashboardStats() {
  const stats = [
    {
      icon: <Calendar className="w-6 h-6" />,
      value: 25,
      label: "Incoming Requests",
      bgColor: "bg-[#FFDEE7]",
      iconBgColor: "bg-white",
      iconColor: "text-pink-500",
      textColor: "text-pink-600",
    },
    {
      icon: <IdCard className="w-6 h-6" />,
      value: 15,
      label: "Active Drivers",
      bgColor: "bg-[#D6F2E4]",
      iconBgColor: "bg-white",
      iconColor: "text-emerald-500",
      textColor: "text-emerald-600",
    },
    {
      icon: <Users className="w-6 h-6" />,
      value: 152,
      label: "Active Users",
      bgColor: "bg-[#FFF0D9]",
      iconBgColor: "bg-white",
      iconColor: "text-amber-500",
      textColor: "text-amber-600",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      value: "$1,250",
      label: "Today's Payments",
      bgColor: "bg-[#DEF6F8]",
      iconBgColor: "bg-white",
      iconColor: "text-cyan-500",
      textColor: "text-cyan-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}

export default DashboardStats;