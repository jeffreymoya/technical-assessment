import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DataGrid } from '@/components/dashboard/DataGrid';
import { TimeSeriesData } from '@/api/mock-data';

jest.mock('@/lib/utils', () => ({
  ...jest.requireActual('@/lib/utils'),
  formatTimestamp: jest.fn((isoString) => new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
}));

describe('DataGrid Component', () => {
  test('renders loading state correctly', () => {
    render(<DataGrid isLoading={true} isError={false} error={null} data={[]} />);
    expect(screen.getByRole('status', { name: /loading recent metrics/i })).toBeInTheDocument();
  });

  test('renders error state correctly', () => {
    const errorMessage = "Grid fetch failed";
    render(<DataGrid isLoading={false} isError={true} error={new Error(errorMessage)} data={[]} />);
    expect(screen.getByText(/error loading grid data/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders empty state when data is empty', () => {
    render(<DataGrid isLoading={false} isError={false} error={null} data={[]} />);
    expect(
      screen.getByText(/no recent metrics data to display/i)
    ).toBeInTheDocument();
  });

  test('renders table with data correctly', () => {
    const mockData: TimeSeriesData[] = [
      { timestamp: '2023-01-01T10:00:00Z', value: 50 },
      { timestamp: '2023-01-01T10:05:00Z', value: 55 },
    ];
    const { container } = render(<DataGrid isLoading={false} isError={false} error={null} data={mockData} />);

    expect(screen.getByRole('columnheader', { name: /timestamp/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /raw value/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /formatted value/i })).toBeInTheDocument();

    const expectedTime1 = new Date(mockData[0].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const expectedTime2 = new Date(mockData[1].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    expect(screen.getByRole('cell', { name: expectedTime1 })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: mockData[0].value.toString() })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: "+$50.00" })).toBeInTheDocument();

    expect(screen.getByRole('cell', { name: expectedTime2 })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: mockData[1].value.toString() })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: "+$55.00" })).toBeInTheDocument();

    expect(container.querySelectorAll('tbody > tr').length).toBe(mockData.length);
  });
}); 