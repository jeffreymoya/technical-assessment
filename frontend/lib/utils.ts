import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { StatusUpdate } from "../api/mock-data";

/**
 * Combines Tailwind CSS classes using clsx and tailwind-merge.
 * Ensures proper handling of conditional classes and utility conflicts.
 *
 * @param {...ClassValue[]} inputs - A list of class values (strings, objects, arrays).
 * @returns {string} The merged and optimized class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Type definition for the style object
export type StatusStyle = { base: string; text: string; border: string };

/**
 * A mapping of status types to their corresponding Tailwind CSS classes for styling.
 * Includes base background, text color, and border color classes.
 * Provides a 'default' style as a fallback.
 */
export const statusStyles: Record<StatusUpdate["status"] | 'default', StatusStyle> = {
  healthy: {
    base: "bg-green-100 dark:bg-green-900/30", // Added dark mode example
    text: "text-green-800 dark:text-green-300", // Added dark mode example
    border: "border-green-500 dark:border-green-600", // Added dark mode example
  },
  warning: {
    base: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-800 dark:text-yellow-300",
    border: "border-yellow-500 dark:border-yellow-600",
  },
  error: {
    base: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-800 dark:text-red-300",
    border: "border-red-500 dark:border-red-600",
  },
  default: { // Added default fallback style
    base: "bg-gray-100 dark:bg-gray-700/30",
    text: "text-gray-800 dark:text-gray-300",
    border: "border-gray-500 dark:border-gray-600",
  }
};

/**
 * Retrieves a combined string of Tailwind CSS classes for a given status.
 *
 * @param {StatusUpdate["status"]} status - The status type ('healthy', 'warning', 'error', etc.).
 * @returns {string} A string containing the combined base, text, and border classes for the status.
 */
export function getStatusClasses(status: StatusUpdate["status"]) {
  const styles = statusStyles[status] || statusStyles.default;
  return cn(styles.base, styles.text, styles.border);
}

/**
 * Formats an ISO date string into a locale-specific time string (HH:MM).
 * Handles potential errors during date parsing.
 *
 * @param {string} isoString - The ISO 8601 date string to format.
 * @returns {string} The formatted time string (e.g., "03:45 PM") or "Invalid Date" on error.
 */
export function formatTimestamp(isoString: string): string {
  try {
    return new Date(isoString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return "Invalid Date";
  }
} 