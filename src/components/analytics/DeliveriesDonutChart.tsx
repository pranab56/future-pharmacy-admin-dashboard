"use client";
import { Card } from "@/components/ui/card";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { PieLabel } from "recharts/types/polar/Pie";
import { useDashboardTopCardQuery } from '../../features/overview/overviewApi';

interface DeliveryData {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface COLORS_TYPE {
  [key: string]: string;
}

const COLORS: COLORS_TYPE = {
  Completed: "#75D1A4",
  Pending: "#FCCA80",
};

interface CustomLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}

interface LegendPayloadItem {
  value: string;
  color: string;
  type?: string;
  payload?: DeliveryData;
}

interface TooltipPayloadItem {
  name?: string;
  value?: number;
  payload?: DeliveryData;
}

function DeliveriesDonutChart() {
  const { data, isLoading } = useDashboardTopCardQuery({});

  const LoadingFc = () => {
    return (
      <div className="w-8 h-8 border-4 border-[#8E4484] border-t-transparent rounded-full animate-spin"></div>
    );
  };

  // Extract data from API response with fallback to 0
  const pending = data?.data?.orderPending || 0;
  const completed = data?.data?.orderComplete || 0;

  // Create delivery data from API response
  const deliveryData: DeliveryData[] = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  const renderCustomizedLabel: PieLabel = (props: CustomLabelProps) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

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
    payload?: LegendPayloadItem[];
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
    payload?: TooltipPayloadItem[];
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-800">
            {payload[0].name}
          </p>
          <p className="text-sm text-gray-600">
            Orders: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <Card className="h-full p-6 flex flex-col gap-4">
        <h1 className="text-xl font-semibold">
          Pending vs. Completed Deliveries
        </h1>
        <div className="w-full h-[500px] flex items-center justify-center">
          <LoadingFc />
        </div>
      </Card>
    );
  }

  // Check if there's any data to display
  const totalOrders = pending + completed;
  const hasData = totalOrders > 0;

  return (
    <Card className="h-full p-6 flex flex-col gap-4">
      <h1 className="text-xl font-semibold">
        Pending vs. Completed Deliveries
      </h1>
      <div className="w-full h-[500px]">
        {hasData ? (
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
                    fill={COLORS[entry.name]}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="text-gray-500 text-lg mb-4">No delivery data available</p>
            <p className="text-gray-400 text-sm">Add orders to see pending vs. completed deliveries</p>
          </div>
        )}
      </div>
    </Card>
  );
}

export default DeliveriesDonutChart;