import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ExperienceTabs } from '../components/ExperienceTabs';
import { ExperienceItem } from '@/utils/getPortfolioData';

const mockExperience: ExperienceItem[] = [
  {
    company: 'Company A',
    role: 'Role A',
    duration: 'Jan 2024 - Present',
    location: 'Remote',
    description: ['Accomplished task A', 'Developed feature B'],
  },
  {
    company: 'Company B',
    role: 'Role B',
    duration: 'Jun 2023 - Dec 2023',
    location: 'Hybrid',
    description: ['Improved speed C', 'Designed database D'],
  },
];

// Mock Tabs component from Aceternity
vi.mock('../components/ui/tabs', () => ({
  Tabs: ({ tabs }: { tabs: { title: string; value: string; content: React.ReactNode }[] }) => (
    <div data-testid="tabs-container">
      <div data-testid="tab-buttons">
        {tabs.map((tab) => (
          <button key={tab.value} data-testid={`tab-${tab.value}`}>
            {tab.title}
          </button>
        ))}
      </div>
      <div data-testid="tab-content">
        {tabs[0].content} {/* Simulating first tab render */}
      </div>
    </div>
  ),
}));

describe('ExperienceTabs Component', () => {
  it('should render the tabs layout with experience items', () => {
    render(<ExperienceTabs experience={mockExperience} />);
    
    expect(screen.getByTestId('tabs-container')).toBeInTheDocument();
    
    // Check if company names are displayed as tab buttons
    expect(screen.getByRole('button', { name: 'Company A' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Company B' })).toBeInTheDocument();
  });

  it('should render detailed experience information for the active company', () => {
    render(<ExperienceTabs experience={mockExperience} />);

    // Verify detailed role description of active tab (first item by default)
    expect(screen.getByText(/Role A/i)).toBeInTheDocument();
    expect(screen.getByText(/Jan 2024 - Present/i)).toBeInTheDocument();
    expect(screen.getByText(/Remote/i)).toBeInTheDocument();
    expect(screen.getByText(/Accomplished task A/i)).toBeInTheDocument();
    expect(screen.getByText(/Developed feature B/i)).toBeInTheDocument();
  });
});
