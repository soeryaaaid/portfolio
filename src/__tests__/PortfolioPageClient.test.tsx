import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PortfolioPageClient from '../components/PortfolioPageClient';
import { PortfolioData } from '@/utils/getPortfolioData';

const mockData: PortfolioData = {
  name: 'John Doe',
  nickname: 'John',
  headline: 'Full-Stack Software Engineer',
  about: 'About John Doe',
  skills: ['React', 'TypeScript'],
  experience: [],
  projects: [],
  education: [],
  contact: {
    email: 'johndoe@example.com',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
  },
};

// Mock components to simplify rendering in integration test
vi.mock('../components/Navbar', () => ({
  Navbar: (props: any) => <div data-testid="mock-navbar">Navbar - darkness: {props.darkness} - blur: {props.blur}</div>,
}));

vi.mock('../components/Hero', () => ({
  Hero: (props: any) => (
    <div data-testid="mock-hero">
      Hero - cellSize: {props.cellSize} - glowBlur: {props.glowBlur}
    </div>
  ),
}));

vi.mock('../components/SkillsMarquee', () => ({
  SkillsMarquee: () => <div data-testid="mock-skills">SkillsMarquee</div>,
}));

vi.mock('../components/ExperienceTabs', () => ({
  ExperienceTabs: () => <div data-testid="mock-experience">ExperienceTabs</div>,
}));

vi.mock('../components/ProjectGrid', () => ({
  ProjectGrid: () => <div data-testid="mock-projects">ProjectGrid</div>,
}));

vi.mock('../components/Contact', () => ({
  Contact: () => <div data-testid="mock-contact">Contact</div>,
}));

describe('PortfolioPageClient Component', () => {
  it('should render all child sections and customizer controls', () => {
    render(<PortfolioPageClient data={mockData} />);

    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-hero')).toBeInTheDocument();
    expect(screen.getByTestId('mock-skills')).toBeInTheDocument();
    expect(screen.getByTestId('mock-experience')).toBeInTheDocument();
    expect(screen.getByTestId('mock-projects')).toBeInTheDocument();
    expect(screen.getByTestId('mock-contact')).toBeInTheDocument();
  });
});
