import type { Metadata } from "next";
import type { NextWebVitalsMetric } from 'next/app';
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ReactQueryProvider } from "@/components/layout/ReactQueryProvider";
import { WebVitalsLogger } from "../src/components/WebVitalsLogger";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metrics Dashboard",
  description: "Frontend Specialist Assessment Dashboard",
};

/**
 * The root layout component for the entire application.
 * Sets up HTML structure, fonts, theme provider, React Query provider, and web vitals logging.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The nested page or layout components.
 * @returns {JSX.Element} The root HTML structure wrapping the application content.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <main className="flex-1">{children}</main>
            </div>
          </ThemeProvider>
        </ReactQueryProvider>
        <WebVitalsLogger /> {/* <-- Add WebVitalsLogger here */}
      </body>
    </html>
  );
} 