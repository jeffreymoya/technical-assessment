import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StatusCards } from '@/components/dashboard/StatusCards';
import { StatusUpdate } from '@/api/mock-data';
import { useQuery } from '@tanstack/react-query';

const mockUseQuery = jest.fn();
jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'), 
  useQuery: (options: any) => mockUseQuery(options), 
}));

jest.mock('@/api/mock-data', () => ({
  fetchStatus: jest.fn(),
}));

describe('StatusCards Container Component', () => {
  beforeEach(() => {
    mockUseQuery.mockReset();
  });

  test('renders loading state initially', () => {
    mockUseQuery.mockReturnValue({ isLoading: true, isError: false, data: undefined });
    render(<StatusCards />);
    // Check for loading indicator (adjust query based on actual loading component)
    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument(); 
  });

  test('renders error state', () => {
    const errorMessage = "Failed to fetch";
    mockUseQuery.mockReturnValue({
      isLoading: false,
      isError: true,
      error: new Error(errorMessage),
      data: undefined,
    });
    render(<StatusCards />);
    // Check for error message display
    expect(screen.getByText(/error loading status/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders empty state when data is empty (edge case)', () => {
    mockUseQuery.mockReturnValue({ isLoading: false, isError: false, data: [] }); // Empty array
    render(<StatusCards />);
    expect(
      screen.getByText("No current status updates available.")
    ).toBeInTheDocument();
  });

  test('renders status cards with data on successful fetch', () => {
    const mockData: StatusUpdate[] = [
      {
        id: '1',
        status: 'healthy',
        message: 'System OK',
        timestamp: '2023-01-01T11:00:00Z',
      },
      {
        id: '2',
        status: 'warning',
        message: 'High Load',
        timestamp: '2023-01-01T11:05:00Z',
      },
    ];
    mockUseQuery.mockReturnValue({ isLoading: false, isError: false, data: mockData });
    const { container } = render(<StatusCards />); // Render with mock data

    // Check that the correct number of cards are rendered
    const cards = container.querySelectorAll('.rounded-lg.border.bg-card'); // Use a class selector for the cards
    expect(cards.length).toBe(mockData.length);

    // Check content within the cards
    expect(screen.getByText(/healthy status/i)).toBeInTheDocument();
    expect(screen.getByText(/System OK/i)).toBeInTheDocument();
    expect(screen.getByText(new Date(mockData[0].timestamp).toLocaleString())).toBeInTheDocument();

    expect(screen.getByText(/warning status/i)).toBeInTheDocument();
    expect(screen.getByText(/High Load/i)).toBeInTheDocument();
    expect(screen.getByText(new Date(mockData[1].timestamp).toLocaleString())).toBeInTheDocument();
  });

}); 