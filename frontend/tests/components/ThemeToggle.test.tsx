import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe } from 'jest-axe';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

// Mock Radix icons
jest.mock('@radix-ui/react-icons', () => ({
  SunIcon: () => <svg data-testid="sun-icon" />,
  MoonIcon: () => <svg data-testid="moon-icon" />,
}));

// Mock the entire next-themes module
const mockSetTheme = jest.fn();
jest.mock('next-themes', () => ({
  useTheme: () => ({
    setTheme: mockSetTheme,
    theme: 'system', // Default mock theme
    themes: ['light', 'dark', 'system'],
  }),
}));

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
  });

  test('renders the toggle button with icons', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  test('opens dropdown menu on button click', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(screen.queryByRole('button', { name: /light/i })).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /light/i })).toBeVisible();
    expect(screen.getByRole('button', { name: /dark/i })).toBeVisible();
    expect(screen.getByRole('button', { name: /system/i })).toBeVisible();
  });

  test('calls setTheme with "light" when Light item is clicked', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(button);
    const lightMenuItem = screen.getByRole('button', { name: /light/i });
    fireEvent.click(lightMenuItem);
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  test('calls setTheme with "dark" when Dark item is clicked', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(button);
    const darkMenuItem = screen.getByRole('button', { name: /dark/i });
    fireEvent.click(darkMenuItem);
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  test('calls setTheme with "system" when System item is clicked', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(button);
    const systemMenuItem = screen.getByRole('button', { name: /system/i });
    fireEvent.click(systemMenuItem);
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
    expect(mockSetTheme).toHaveBeenCalledWith('system');
  });

  // Add accessibility test
  test('should have no accessibility violations', async () => {
    const { container } = render(<ThemeToggle />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
}); 