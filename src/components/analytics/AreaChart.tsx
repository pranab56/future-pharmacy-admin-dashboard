"use client";

import { Card } from "@/components/ui/card";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface ActivityData {
  day: string;
  successful: number;
  failed: number;
}

function SystemActivityChart() {
  const activityData: ActivityData[] = [
    { day: "Mon", successful: 65, failed: 55 },
    { day: "Tue", successful: 58, failed: 68 },
    { day: "Wed", successful: 45, failed: 42 },
    { day: "Thu", successful: 90, failed: 38 },
    { day: "Fri", successful: 88, failed: 55 },
    { day: "Sat", successful: 70, failed: 58 },
    { day: "Sun", successful: 48, failed: 38 },
  ];

  const CustomDot = (props: any) => {
    const { cx, cy, stroke, payload, dataKey, index } = props;

    // Only show dot on Thursday for successful deliveries
    if (dataKey === "successful" && payload.day === "Thu") {
      return (
        <g>
          <circle
            cx={cx}
            cy={cy}
            r={6}
            fill="#fff"
            stroke={stroke}
            strokeWidth={3}
          />
          <circle cx={cx} cy={cy} r={3} fill={stroke} />
        </g>
      );
    }
    return null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex items-center justify-center gap-6 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium text-gray-700">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="p-6 h-full">
      <h1 className="text-xl font-semibold mb-6">Overall System Activity</h1>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={activityData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="0"
              stroke="#f0f0f0"
              vertical={true}
              horizontal={true}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "12px" }}
              tick={{ fill: "#9ca3af" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "12px" }}
              tick={{ fill: "#9ca3af" }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#e5e7eb", strokeWidth: 1, strokeDasharray: "5 5" }}
            />
            <Legend content={renderLegend} />
            <Line
              type="monotone"
              dataKey="successful"
              stroke="#7DD3C0"
              strokeWidth={2.5}
              dot={<CustomDot />}
              activeDot={{ r: 6 }}
              name="Successful Deliveries"
            />
            <Line
              type="monotone"
              dataKey="failed"
              stroke="#F893B8"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6 }}
              name="Failed Deliveries"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default SystemActivityChart;

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    dataKey: string;
    color: string;
    payload: ActivityData;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="relative flex flex-col gap-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg text-sm min-w-[180px]">
        <div className="font-semibold text-gray-800 mb-1">{label}</div>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-700 text-xs">
                {entry.name === "Successful Deliveries" ? "Successful" : "Failed"}:
              </span>
            </div>
            <span className="font-medium text-gray-900">${entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};