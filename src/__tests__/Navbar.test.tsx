import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from '../components/Navbar';

// Mock scroll hooks because of framer motion
vi.mock('motion/react', async () => {
  const actual = await vi.importActual('motion/react');
  return {
    ...actual,
    useScroll: () => ({
      scrollY: {
        get: () => 0,
        getPrevious: () => 0,
        onChange: () => () => {},
      },
      scrollYProgress: {
        get: () => 0,
        getPrevious: () => 0,
        onChange: () => () => {},
      },
    }),
    useMotionValueEvent: () => {},
  };
});

describe('Navbar Component', () => {
  it('should render navigation links', () => {
    render(<Navbar />);
    
    // Check if navigation links are rendered
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const experienceLink = screen.getByRole('link', { name: /experience/i });
    const projectsLink = screen.getByRole('link', { name: /projects/i });
    const contactLink = screen.getByRole('link', { name: /contact/i });

    expect(aboutLink).toBeInTheDocument();
    expect(experienceLink).toBeInTheDocument();
    expect(projectsLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();

    expect(aboutLink).toHaveAttribute('href', '#about');
    expect(experienceLink).toHaveAttribute('href', '#experience');
    expect(projectsLink).toHaveAttribute('href', '#projects');
    expect(contactLink).toHaveAttribute('href', '#contact');
  });

  it('should render contact/social button or text', () => {
    render(<Navbar />);
    // Check for a CTA/Resume button or LinkedIn link
    const ctaElement = screen.getByRole('button', { name: /resume|contact|linkedin/i });
    expect(ctaElement).toBeInTheDocument();
  });
});
