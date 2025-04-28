# Frontend Documentation

This document provides a high-level overview of the frontend application structure and key components. For detailed information on specific components, functions, or hooks, please refer to the JSDoc comments directly within the source code.

## Technologies Used

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **UI Library:** React
*   **Styling:** Tailwind CSS
*   **UI Components:** Shadcn UI (built on Radix UI primitives)
*   **Charting:** Recharts
*   **Data Fetching/State:** React Query (@tanstack/react-query)
*   **Theming:** next-themes

## Project Structure

```
frontend/
├── api/              # Mock API definitions and data fetching logic
├── app/              # Next.js App Router: Pages, layouts, global styles
│   ├── globals.css   # Global CSS styles
│   ├── layout.tsx    # Root layout component
│   └── page.tsx      # Root page component (Dashboard)
├── components/       # Reusable React components
│   ├── dashboard/    # Components specific to the dashboard display
│   ├── layout/       # Layout-related components (ThemeProvider, ErrorBoundary, etc.)
│   └── ui/           # Generic UI primitives (Button, Card, Table, etc. - mostly Shadcn UI)
├── hooks/            # Custom React hooks
│   └── useDebounce.ts # Hook for debouncing values
├── lib/              # Utility functions and shared constants
│   └── utils.ts      # General utilities (class merging, formatters, styles)
├── public/           # Static assets
├── src/              # (Optional additional source directory, currently contains WebVitalsLogger)
├── .eslintrc.json    # ESLint configuration
├── next.config.js    # Next.js configuration
├── package.json      # Project dependencies and scripts
├── tailwind.config.ts# Tailwind CSS configuration
└── tsconfig.json     # TypeScript configuration
```

## Key Areas

### `/app`
Contains the core routing and layout structure defined by the Next.js App Router.
*   `layout.tsx`: Sets up the root HTML, providers (`ThemeProvider`, `ReactQueryProvider`), and global structure.
*   `page.tsx`: The main entry point for the dashboard route. It fetches initial data server-side and renders the main `DashboardDisplay` component.

### `/components`
This directory houses all React components, organized by scope:
*   `/ui`: Contains base UI elements, largely based on Shadcn UI components (`Button`, `Card`, `Input`, `Table`, `DropdownMenu`, `Avatar`, `Tabs`, `Skeleton`). These are intended to be generic and reusable.
*   `/layout`: Components related to the overall page structure and application shell, such as `ThemeProvider`, `ThemeToggle`, `ErrorBoundary`, and `ReactQueryProvider`.
*   `/dashboard`: Components specifically built for the dashboard's features, like `StatusCards`, `DataGrid`, `MetricsChart`, and the main orchestrator `DashboardDisplay`.

### `/hooks`
Contains custom React hooks used across the application.
*   `useDebounce`: A utility hook to delay updating a value until a certain time has passed without changes, useful for input filtering.

### `/lib`
Shared utility functions and constants.
*   `utils.ts`: Includes helper functions like `cn` for merging Tailwind classes, `formatTimestamp` for date formatting, and `statusStyles` / `getStatusClasses` for applying consistent styling based on status.

### `/api`
Contains mock data definitions (`mock-data.ts`) and functions (`fetchMetrics`, `fetchStatus`) used to simulate API interactions for the dashboard components.

## Development Notes

*   **Component Documentation:** Most components and utility functions include JSDoc comments explaining their purpose, props, and return values.
*   **Styling:** Styling is primarily handled by Tailwind CSS utility classes. The `cn` utility function in `lib/utils.ts` helps manage and merge these classes effectively.
*   **Data Flow:** The root page (`/app/page.tsx`) fetches initial data server-side. Client components like `StatusCards` and `MetricsChart` (via `DashboardDisplay`) use React Query (`useQuery`) for subsequent client-side data fetching and state management. 