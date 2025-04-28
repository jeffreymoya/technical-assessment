# Performance Decisions

This document outlines key decisions made to optimize the frontend performance.

## Data Fetching & Caching

- **React Query (`@tanstack/react-query`):** Used for server state management (fetching, caching, synchronization).
    - Handles caching, background updates, and stale data invalidation automatically, reducing redundant fetches.
    - Provides dedicated loading and error states per query, simplifying UI logic.
    - Shared query keys (`METRICS_QUERY_KEY`) are used between `MetricsChart` (initially) and `DataGrid` (via `page.tsx`) to potentially leverage the cache, although data fetching was centralized in `page.tsx` for filtering.

## Rendering Performance

- **Next.js App Router:** Leverages Server Components by default. Client Components (`'use client'`) are used only where necessary (e.g., components requiring hooks like `useState`, `useEffect`, `useQuery`, or event handlers).
    - `app/page.tsx` was converted to a Client Component due to the need for state (`searchTerm`) and data fetching hooks (`useQuery`).
    - Components like `ActualMetricsChart`, `DataGrid`, `StatusCards` are marked as Client Components as they use hooks or interactivity.
- **Code Splitting:** Handled automatically by Next.js per page/route.
- **`useMemo`:** Used in `page.tsx` to memoize the filtering logic (`filteredData`, `gridDisplayData`), preventing recalculation on every render unless dependencies (`metricsData`, `debouncedSearchTerm`) change.
- **Recharts:** While powerful, charting libraries can impact performance. We are using the standard components. Further optimization could involve lazy loading the chart component if needed.

## Input Handling

- **Debouncing:** The search input in `page.tsx` uses a `useDebounce` hook (300ms delay) to prevent filtering logic from running on every keystroke, improving responsiveness and reducing computation during typing.

## Bundle Size

- **`@next/bundle-analyzer`:** Configured to allow analysis of the final bundle sizes (`npm run analyze`). This helps identify large dependencies or potential areas for optimization.
- **Tree Shaking:** Relies on Next.js/Webpack build process.
- **Component Library:** Uses `shadcn/ui` which allows importing only the necessary components, minimizing unused code compared to importing an entire monolithic library.