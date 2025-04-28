'use client'; // Mark as Client Component

import { useQuery } from "@tanstack/react-query";
import { fetchStatus, StatusUpdate } from "@/api/mock-data"; // Use alias
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon, 
} from "@radix-ui/react-icons"; 

/**
 * Selects and renders an appropriate icon based on the provided status string.
 *
 * @param {object} props - Component props.
 * @param {StatusUpdate["status"]} props.status - The status string ('healthy', 'warning', 'error', etc.).
 * @returns {JSX.Element} The corresponding status icon component.
 */
function StatusIcon({ status }: { status: StatusUpdate["status"] }) {
  const className = "h-4 w-4 text-muted-foreground";
  switch (status) {
    case "healthy":
      return <CheckCircledIcon className={className} />;
    case "warning":
      return <ExclamationTriangleIcon className={className} />;
    case "error":
      return <CrossCircledIcon className={className} />; 
    default:
      return <QuestionMarkCircledIcon className={className} />; 
  }
}

/**
 * Renders a grid of skeleton loading cards for the status section.
 */
function StatusLoading() {
  return (
    <div role="status" aria-label="Loading status updates" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <Skeleton className="h-4 w-2/5" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-7 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/**
 * Renders a card displaying an error message when status updates fail to load.
 */
function StatusError({ message }: { message: string }) {
  return (
    <Card className="md:col-span-2 lg:col-span-4 bg-destructive/10 border-destructive">
      <CardHeader>
        <CardTitle className="text-destructive">Error Loading Status</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{message}</p>
      </CardContent>
    </Card>
  );
}

/**
 * Renders a card indicating that no status updates are available.
 */
function EmptyStatus() {
  return (
    <Card className="md:col-span-2 lg:col-span-4">
      <CardHeader>
        <CardTitle>No Status Updates</CardTitle>
      </CardHeader>
      <CardContent>
        <p>No current status updates available.</p>
      </CardContent>
    </Card>
  );
}

const STATUS_QUERY_KEY = ['statusUpdates'];

/**
 * Fetches and displays status updates as a grid of KPI-style cards.
 * Uses React Query for data fetching and handles loading, error, and empty states.
 *
 * @returns {JSX.Element} A grid of status cards or a corresponding state indicator.
 */
export function StatusCards() {
  const {
    data: statusUpdates,
    isLoading,
    isError,
    error,
  } = useQuery<StatusUpdate[], Error>({
    queryKey: STATUS_QUERY_KEY,
    queryFn: fetchStatus,
  });

  if (isLoading) {
    return <StatusLoading />;
  }

  if (isError) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return <StatusError message={errorMessage} />;
  }

  if (!statusUpdates || statusUpdates.length === 0) {
    return <EmptyStatus />;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statusUpdates.map((update) => (
        <Card key={update.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium capitalize">
              {update.status} Status
            </CardTitle>
            <StatusIcon status={update.status} />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-2xl font-bold" title={update.message}>{update.message || "-"}</div>
            <p className="text-xs text-muted-foreground">
              {new Date(update.timestamp).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 