'use client';

import { useState, useMemo } from "react";
import dynamic from 'next/dynamic'; 
import type { TimeSeriesData } from "../../api/mock-data"; 
import { formatTimestamp } from "@/lib/utils";
import { useDebounce } from "../../hooks/useDebounce"; 

import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { StatusCards } from "./StatusCards";
import { DataGrid } from "./DataGrid";

// Dynamically import MetricsChart
const DynamicMetricsChart = dynamic(() => import('./MetricsChart').then(mod => mod.MetricsChart), {
  loading: () => <p className="text-center text-muted-foreground p-4">Loading chart...</p>,
  ssr: false, // Charts often need browser APIs
});

interface DashboardDisplayProps {
  initialData: TimeSeriesData[];
}

/**
 * Renders the main dashboard layout, including status cards, metrics chart, and data grid.
 * Uses Tabs for navigation (currently only "Overview").
 * Implements debounced filtering for the recent metrics data grid.
 * Dynamically loads the metrics chart for performance.
 *
 * @param {DashboardDisplayProps} props - The component props.
 * @param {TimeSeriesData[]} props.initialData - The initial time series data fetched server-side.
 * @returns {JSX.Element} The rendered dashboard UI.
 */
export function DashboardDisplay({ initialData }: DashboardDisplayProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms debounce

  // Filter the data based on the debounced search term using initialData
  const filteredData = useMemo(() => {
    if (!initialData) return [];
    if (!debouncedSearchTerm) return initialData; // No filter applied

    const lowerCaseSearchTerm = debouncedSearchTerm.toLowerCase();

    return initialData.filter((item) => {
      const formattedTime = formatTimestamp(item.timestamp).toLowerCase();
      return formattedTime.includes(lowerCaseSearchTerm);
    });
  }, [initialData, debouncedSearchTerm]);

  // Extract latest 5 data points for DataGrid after filtering
  const gridDisplayData = useMemo(() => {
    return filteredData?.slice(-5).reverse() || [];
  }, [filteredData]);

  const isLoading = !initialData;
  const isError = false;
  const error = null;

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <StatusCards />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pl-2">
              <DynamicMetricsChart />
            </CardContent>
          </Card>

          <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Recent Metrics</CardTitle> 
                  <CardDescription>
                    Displaying latest {gridDisplayData.length} of {initialData?.length ?? 0} records.
                  </CardDescription>
                </div>
                {/* Search Input */}
                <div className="w-1/2 max-w-xs">
                  <Input
                    placeholder="Filter by timestamp..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <DataGrid
                  data={gridDisplayData}
                  isLoading={isLoading}
                  isError={isError}
                  error={error}
              />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
} 