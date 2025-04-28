'use client'; // Mark as Client Component

import { useQuery } from "@tanstack/react-query";
import { fetchMetrics, TimeSeriesData } from "@/api/mock-data"; // Use alias
import { ActualMetricsChart } from "./ActualMetricsChart";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

/**
 * Renders a skeleton loading placeholder for the metrics chart.
 */
function ChartLoading() {
  return (
    // Add role for accessibility
    <div role="status" aria-label="Loading chart data" className="p-4 h-[300px] flex items-center justify-center border rounded-lg">
      <Skeleton className="h-full w-full" />
    </div>
  );
}

/**
 * Renders an error message display for the metrics chart.
 */
function ChartError({ message }: { message: string }) {
  return (
    <div className="p-4 h-[300px] flex items-center justify-center bg-red-100 border border-red-300 text-red-700 rounded">
      <div>
        <p className="font-semibold">Error loading chart data:</p>
        <p>{message}</p>
      </div>
    </div>
  );
}

/**
 * Renders a message indicating no data is available for the metrics chart.
 * Note: The actual display might be handled within ActualMetricsChart.
 */
function EmptyChart() {
  return (
    <div className="p-4 h-[300px] flex items-center justify-center bg-gray-100 text-gray-600 rounded">
      No metrics data available.
    </div>
  );
}

const METRICS_QUERY_KEY = ['metrics', 'day']; 

/**
 * Fetches time series metrics data using React Query and renders the chart.
 * Delegates the actual chart rendering to the `ActualMetricsChart` component.
 * Handles loading and error states before rendering the chart.
 *
 * @returns {JSX.Element} The chart component (`ActualMetricsChart`) or a loading/error state indicator.
 */
export function MetricsChart() {
  const {
    data: metricsData,
    isLoading,
    isError,
    error,
  } = useQuery<TimeSeriesData[], Error>({
    queryKey: METRICS_QUERY_KEY,
    queryFn: () => fetchMetrics('day'), 
  });

  if (isLoading) {
    return <ChartLoading />;
  }

  if (isError) {
    return <ChartError message={error.message} />;
  }

  return <ActualMetricsChart data={metricsData || []} />;
} 