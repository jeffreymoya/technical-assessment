import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ActualMetricsChart } from '@/components/dashboard/ActualMetricsChart';
import { TimeSeriesData } from '@/api/mock-data';
import { useQuery } from '@tanstack/react-query';

// Mock recharts library
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  LineChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="line-chart">{children}</div>
  ),
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend">Mock Legend</div>, // Add text to check
  Line: () => <div data-testid="line" />,
}));

jest.mock('@/lib/utils', () => ({
  formatTimestamp: jest.fn((ts) => `formatted-${ts}`),
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('ActualMetricsChart Component', () => {
  const mockData: TimeSeriesData[] = [
    { timestamp: '2023-01-01T10:00:00Z', value: 50 },
    { timestamp: '2023-01-01T10:05:00Z', value: 55 },
  ];

  const emptyMockData: TimeSeriesData[] = [];

  test('renders chart components when given valid data', () => {
    render(<ActualMetricsChart data={mockData} />);

    // Check if mocked recharts components are rendered
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument();
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('legend')).toBeInTheDocument();
    expect(screen.getByTestId('line')).toBeInTheDocument();

    expect(screen.getByText('Mock Legend')).toBeInTheDocument();
  });

  test('renders empty state when data array is empty (edge case)', () => {
    render(<ActualMetricsChart data={emptyMockData} />);

    expect(screen.getByText(/no metrics data to display/i)).toBeInTheDocument();

    // Ensure chart components are NOT rendered
    expect(screen.queryByTestId('responsive-container')).not.toBeInTheDocument();
    expect(screen.queryByTestId('line-chart')).not.toBeInTheDocument();
  });

  test('renders empty state when data is null (failure case)', () => {
    // @ts-expect-error Testing invalid prop case
    render(<ActualMetricsChart data={null} />); 
    expect(screen.getByText(/no metrics data to display/i)).toBeInTheDocument();
    expect(screen.queryByTestId('responsive-container')).not.toBeInTheDocument();
  });

  test('renders empty state when data is undefined (failure case)', () => {
    // @ts-expect-error Testing invalid prop case
    render(<ActualMetricsChart data={undefined} />);
    expect(screen.getByText(/no metrics data to display/i)).toBeInTheDocument();
    expect(screen.queryByTestId('responsive-container')).not.toBeInTheDocument();
  });
}); 