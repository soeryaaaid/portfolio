import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Contact } from '../components/Contact';
import { ContactData } from '@/utils/getPortfolioData';

const mockContact: ContactData = {
  email: 'johndoe@example.com',
  linkedin: 'https://linkedin.com/in/johndoe',
  github: 'https://github.com/johndoe',
};

describe('Contact Component', () => {
  it('should render contact information and links', () => {
    render(<Contact contact={mockContact} />);
    
    // Check if titles and text are rendered
    expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
    expect(screen.getByText(/johndoe@example.com/i)).toBeInTheDocument();

    // Check if links are correct
    const emailLink = screen.getByRole('link', { name: /email|mail/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const githubLink = screen.getByRole('link', { name: /github/i });

    expect(emailLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();

    expect(emailLink).toHaveAttribute('href', 'mailto:johndoe@example.com');
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/johndoe');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/johndoe');
  });
});
