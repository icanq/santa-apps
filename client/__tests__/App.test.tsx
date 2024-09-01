import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';

// Mock the fetch function
global.fetch = vi.fn();

describe('App Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders App component', () => {
    render(<App />);
    expect(screen.getByText("A Letter to Santa's")).toBeTruthy();
    expect(
      screen.getByText('Ho ho ho, what you want for Christmas?')
    ).toBeTruthy();
  });
});
