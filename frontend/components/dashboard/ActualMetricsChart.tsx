"use client";

import { TimeSeriesData } from "../api/mock-data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatTimestamp } from "@/lib/utils";

interface ActualMetricsChartProps {
  data: TimeSeriesData[];
}

// Simple formatter for the X-axis (e.g., show HH:MM)
const xAxisTickFormatter = (timestamp: string) => {
  return formatTimestamp(timestamp);
};

/**
 * Renders the actual time series data using a LineChart from the Recharts library.
 * Assumes data is already fetched and provided as a prop.
 *
 * @param {ActualMetricsChartProps} props - The component props.
 * @param {TimeSeriesData[]} props.data - The array of time series data points to display.
 * @returns {JSX.Element} The rendered Recharts line chart or a message if no data is available.
 */
export function ActualMetricsChart({ data }: ActualMetricsChartProps) {
  if (!data || data.length === 0) {
    return <div className="text-sm text-muted-foreground">No metrics data to display.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
            dataKey="timestamp" 
            tickFormatter={xAxisTickFormatter} 
            stroke="hsl(var(--muted-foreground))"
            tickLine={false}
            axisLine={false}
        />
        <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
        />
        <Tooltip
          labelFormatter={xAxisTickFormatter}
          formatter={(value: number) => [`$${value.toFixed(2)}`, "Value"]}
          contentStyle={{ 
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              borderRadius: "calc(var(--radius) - 2px)",
              boxShadow: "var(--shadow-md)"
          }} 
          labelStyle={{ 
              color: "hsl(var(--foreground))"
          }}
          itemStyle={{ 
              color: "hsl(var(--foreground))"
          }}
          cursor={{ fill: "hsl(var(--accent))", fillOpacity: 0.1 }}
        />
        <Legend wrapperStyle={{ color: "hsl(var(--muted-foreground))"}} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          activeDot={{ r: 6, strokeWidth: 1, fill: "hsl(var(--primary))" }}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
} 