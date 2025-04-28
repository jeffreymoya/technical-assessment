import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 

import { StatusCard } from '@/components/dashboard/StatusCard';
import { StatusUpdate } from '@/api/mock-data'; 

jest.mock('@/lib/utils', () => {
  const originalUtils = jest.requireActual('@/lib/utils');
  return {
    ...originalUtils,
    formatTimestamp: jest.fn((isoString) => {
      try {
        return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } catch (e) {
        return "Invalid Date"; 
      }
    }),
    cn: (...args: any[]) => args.filter(Boolean).join(' '),
  };
});

describe('StatusCard Component', () => {
  const mockUpdateHealthy: StatusUpdate = {
    id: '1',
    status: 'healthy',
    message: 'System operational',
    timestamp: new Date().toISOString(),
  };

  const mockUpdateError: StatusUpdate = {
    id: '2',
    status: 'error',
    message: 'Database connection failed',
    timestamp: new Date(Date.now() - 60000).toISOString(), // 1 minute ago
  };

  const mockUpdateEmptyMessage: StatusUpdate = {
    id: '3',
    status: 'warning',
    message: '', // Edge case: Empty message
    timestamp: new Date().toISOString(),
  };

  const mockUpdateInvalidTimestamp: StatusUpdate = {
    id: '4',
    status: 'healthy',
    message: 'System check', 
    timestamp: 'not-a-valid-date', // Failure case: Invalid timestamp
  };

  test('renders healthy status card correctly', () => {
    render(<StatusCard update={mockUpdateHealthy} />);

    // Check for status text (case-insensitive due to capitalize class)
    expect(screen.getByText(/healthy/i)).toBeInTheDocument();

    // Check for message content
    expect(screen.getByText(mockUpdateHealthy.message)).toBeInTheDocument();

    // Check for formatted timestamp (mocked formatTimestamp)
    const expectedTime = new Date(mockUpdateHealthy.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    expect(screen.getByText(expectedTime)).toBeInTheDocument();
  });

  test('renders error status card correctly', () => {
    render(<StatusCard update={mockUpdateError} />);

    // Check for status text
    expect(screen.getByText(/error/i)).toBeInTheDocument();

    // Check for message content
    expect(screen.getByText(mockUpdateError.message)).toBeInTheDocument();

    // Check for formatted timestamp
    const expectedTime = new Date(mockUpdateError.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    expect(screen.getByText(expectedTime)).toBeInTheDocument();
  });

  test('renders correctly with empty message (edge case)', () => {
    render(<StatusCard update={mockUpdateEmptyMessage} />);

    expect(screen.getByText(/warning/i)).toBeInTheDocument();

    // Use data-testid to find the content area
    const cardContent = screen.getByTestId("status-card-content");
    expect(cardContent).toBeInTheDocument(); // Check it exists
    expect(cardContent).toHaveTextContent(''); // Check it has no text children

    const expectedTime = new Date(mockUpdateEmptyMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    expect(screen.getByText(expectedTime)).toBeInTheDocument();
  });

  test('renders fallback text for invalid timestamp (failure case)', () => {
    render(<StatusCard update={mockUpdateInvalidTimestamp} />);

    expect(screen.getByText(/healthy/i)).toBeInTheDocument();
    expect(screen.getByText(mockUpdateInvalidTimestamp.message)).toBeInTheDocument();

    expect(screen.getByText("Invalid Date")).toBeInTheDocument(); 
  });

}); 