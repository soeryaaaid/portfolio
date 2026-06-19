import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Hero } from '../components/Hero';
import { PortfolioData } from '@/utils/getPortfolioData';

const mockData: PortfolioData = {
  name: 'John Doe',
  nickname: 'John',
  headline: 'Full-Stack Software Engineer | Specialized in React & Node.js',
  about: 'I am a passionate Full-Stack Software Engineer with experience in building web applications.',
  skills: ['React', 'TypeScript', 'Node.js'],
  experience: [],
  projects: [],
  education: [],
  contact: {
    email: 'johndoe@example.com',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
  },
};

// Mock Spotlight because it contains inline SVG animation
vi.mock('./ui/spotlight', () => ({
  Spotlight: () => <div data-testid="spotlight" />,
}));

describe('Hero Component', () => {
  it('should render developer name, headline, and about text', () => {
    render(<Hero data={mockData} />);

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Full-Stack Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/I am a passionate/i)).toBeInTheDocument();
  });

  it('should render social link buttons or avatars', () => {
    render(<Hero data={mockData} />);
    
    // Check for social links in Hero
    const githubLink = screen.getByRole('link', { name: /github/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const emailLink = screen.getByRole('link', { name: /email|mail/i });

    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(emailLink).toBeInTheDocument();

    expect(githubLink).toHaveAttribute('href', expect.stringContaining('github.com/johndoe'));
    expect(linkedinLink).toHaveAttribute('href', expect.stringContaining('linkedin.com/in/johndoe'));
    expect(emailLink).toHaveAttribute('href', expect.stringContaining('mailto:johndoe@example.com'));
  });
});
