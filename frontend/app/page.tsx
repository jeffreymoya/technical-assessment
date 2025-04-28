import { fetchMetrics, type TimeSeriesData } from "@/api/mock-data";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import ErrorBoundary from "@/components/layout/ErrorBoundary";
import { DashboardDisplay } from "@/components/dashboard/DashboardDisplay";


/**
 * The main page component for the dashboard route (/).
 * Fetches initial metrics data on the server and renders the primary dashboard layout.
 * Delegates the main interactive display to the `DashboardDisplay` client component.
 * Includes error handling for the initial data fetch.
 *
 * @returns {Promise<JSX.Element>} A promise resolving to the rendered dashboard page content.
 */
export default async function DashboardPage() {
  // Fetch data directly on the server
  let initialData: TimeSeriesData[] = [];
  let fetchError = null;
  try {
    initialData = await fetchMetrics('day');
  } catch (err) {
    console.error("Failed to fetch initial metrics:", err);
    fetchError = err instanceof Error ? err.message : "An unknown error occurred";
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>

      <ErrorBoundary>
        {fetchError ? (
          <div className="text-red-600">Error loading dashboard data: {fetchError}</div>
        ) : (
          <DashboardDisplay initialData={initialData} />
        )}
      </ErrorBoundary>
    </div>
  );
} 