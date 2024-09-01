import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  it('renders footer text and link', () => {
    render(<Footer />);
    expect(screen.getByText(/Made with/i)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Glitch/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://glitch.com');
  });
});
