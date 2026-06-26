import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Hero } from '../components/Hero';
import { PortfolioData } from '@/utils/getPortfolioData';

const mockData: PortfolioData = {
  name: 'John Doe',
  nickname: 'John',
  headline: 'Full-Stack Software Engineer | Specialized in React & Node.js',
  about:
    'I am a passionate Full-Stack Software Engineer with experience in building web applications.',
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

// Mock HeroHighlight and Highlight because they contain custom motion animations
vi.mock('@/components/ui/hero-highlight', () => ({
  __esModule: true,
  HeroHighlight: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="hero-highlight">{children}</div>
  ),
  Highlight: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="highlight">{children}</span>
  ),
}));

// Mock PixelatedCanvas because it performs dynamic Canvas drawings
vi.mock('@/components/ui/pixelated-canvas', () => ({
  __esModule: true,
  PixelatedCanvas: () => <div data-testid="pixelated-canvas" />,
}));

// Mock GlowingEffect because it performs mouse tracking border animations
vi.mock('@/components/ui/glowing-effect', () => ({
  __esModule: true,
  GlowingEffect: () => <div data-testid="glowing-effect" />,
}));

describe('Hero Component', () => {
  it('should render developer name, headline, and about text', () => {
    render(<Hero data={mockData} />);

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/Specialized in/i);
    expect(screen.getByText(/I am a passionate/i)).toBeInTheDocument();
  });

  it('should render social link buttons or avatars', () => {
    render(<Hero data={mockData} />);

    // Check for social links in Hero
    const githubLink = screen.getByRole('link', { name: /github/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    const emailLink = screen.getByRole('link', { name: /email/i });

    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(emailLink).toBeInTheDocument();

    expect(githubLink).toHaveAttribute('href', expect.stringContaining('github.com/johndoe'));
    expect(linkedinLink).toHaveAttribute(
      'href',
      expect.stringContaining('linkedin.com/in/johndoe'),
    );
    expect(emailLink).toHaveAttribute(
      'href',
      expect.stringContaining('mailto:johndoe@example.com'),
    );
  });
});
