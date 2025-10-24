"use client";
import { Card } from "@/components/ui/card";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  PieLabel,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface DeliveryData {
  name: string;
  value: number;
}

const COLORS = {
  Completed: "#75D1A4",
  Pending: "#FCCA80",
};

function DeliveriesDonutChart() {
  const deliveryData: DeliveryData[] = [
    { name: "Completed", value: 75 },
    { name: "Pending", value: 25 },
  ];

  const renderCustomizedLabel: PieLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    // Add null checks for all required values
    if (
      cx === undefined ||
      cy === undefined ||
      midAngle === undefined ||
      innerRadius === undefined ||
      outerRadius === undefined ||
      percent === undefined
    ) {
      return null;
    }

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomLegend = ({
    payload,
  }: {
    payload?: Array<{
      value: string;
      color: string;
      type?: string;
      payload?: DeliveryData;
    }>;
  }) => {
    if (!payload || payload.length === 0) {
      return null;
    }

    return (
      <div className="flex items-center justify-center gap-6 mt-6">
        {payload.map((entry, index: number) => (
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

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      name?: string;
      value?: number;
      payload?: DeliveryData;
    }>;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">
            {payload[0].name}
          </p>
          <p className="text-sm text-gray-600">
            Value: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full p-6 flex flex-col gap-4">
      <h1 className="text-xl font-semibold">
        Pending vs. Completed Deliveries
      </h1>
      <div className="w-full h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={deliveryData}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={130}
              innerRadius={80}
              fill="#8884d8"
              dataKey="value"
              strokeWidth={0}
              startAngle={90}
              endAngle={-270}
              paddingAngle={0}
            >
              {deliveryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.name as keyof typeof COLORS]}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default DeliveriesDonutChart;