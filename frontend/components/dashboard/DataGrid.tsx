'use client'; // Mark as Client Component

import { TimeSeriesData } from "@/api/mock-data";
import { formatTimestamp } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; 

// Define Props interface
interface DataGridProps {
  data: TimeSeriesData[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 * Renders a skeleton loading state for the DataGrid.
 */
function GridLoading() {
  return (
    <div role="status" aria-label="Loading recent metrics">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Timestamp</TableHead>
            <TableHead>Value</TableHead>
            <TableHead className="text-right">Formatted Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-4 w-full" /></TableCell>
              <TableCell><Skeleton className="h-4 w-3/4" /></TableCell>
              <TableCell className="text-right"><Skeleton className="h-4 w-1/2" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/**
 * Renders an error message display for the DataGrid.
 */
function GridError({ message }: { message: string }) {
  return (
    <div className="text-sm text-destructive">
      <p className="font-semibold">Error loading grid data:</p>
      <p>{message}</p>
    </div>
  );
}

/**
 * Renders a message indicating that there is no data to display in the DataGrid.
 */
function EmptyGrid() {
  return (
    <div className="text-sm text-muted-foreground">
      No recent metrics data to display.
    </div>
  );
}

// Keep formatValue
function formatValue(value: number): string {
  return `+$${value.toFixed(2)}`;
}

/**
 * Displays time series data in a tabular format using Shadcn UI Table components.
 * Handles loading, error, and empty states gracefully.
 *
 * @param {DataGridProps} props - The component props.
 * @param {TimeSeriesData[]} props.data - The array of time series data points to display.
 * @param {boolean} props.isLoading - Indicates if the data is currently being loaded.
 * @param {boolean} props.isError - Indicates if an error occurred while fetching data.
 * @param {Error | null} props.error - The error object if an error occurred.
 * @returns {JSX.Element} The rendered data grid table or a corresponding state indicator (loading, error, empty).
 */
export function DataGrid({ data, isLoading, isError, error }: DataGridProps) { // Destructure props
  if (isLoading) {
    return <GridLoading />;
  }

  if (isError && error) { 
    return <GridError message={error.message} />;
  }

  const displayData = data; 

  if (displayData.length === 0 && !isLoading) { // Ensure not to show empty state while loading
    return <EmptyGrid />;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[180px]">Timestamp</TableHead>
          <TableHead>Raw Value</TableHead>
          <TableHead className="text-right">Formatted Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayData.map((item) => (
          <TableRow key={item.timestamp}>
            <TableCell className="font-medium">{formatTimestamp(item.timestamp)}</TableCell>
            <TableCell>{item.value}</TableCell>
            <TableCell className="text-right">{formatValue(item.value)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 