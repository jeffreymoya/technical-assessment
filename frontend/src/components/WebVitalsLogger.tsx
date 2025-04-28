'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { useEffect } from 'react';

// Function to simulate sending error details (replace with actual tracking call)
function logError(error: unknown, context?: string) {
  console.error(`Global Error Handler [${context || 'Unknown'}]:`, {
    error,
    timestamp: new Date().toISOString(),
    // Add other relevant context if available
  });
  // sendErrorToTrackingService({ ... });
}

export function WebVitalsLogger() {
  useReportWebVitals((metric) => {
    console.log(metric);
  });

  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      logError(event.error || event.message, 'onerror');
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      logError(event.reason, 'onunhandledrejection');
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []); 

  return null;
} 