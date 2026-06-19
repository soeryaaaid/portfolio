import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SkillsMarquee } from '../components/SkillsMarquee';

// Mock InfiniteMovingCards because it clones DOM elements which is complex in JSDOM
vi.mock('./ui/infinite-moving-cards', () => ({
  InfiniteMovingCards: ({ items }: { items: { quote: string; name: string; title: string }[] }) => (
    <div data-testid="infinite-moving-cards">
      {items.map((item) => (
        <div key={item.name} data-testid="skill-item">
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  ),
}));

describe('SkillsMarquee Component', () => {
  it('should render the marquee with the provided skills list', () => {
    const mockSkills = ['TensorFlow', 'Kotlin', 'Python', 'React', 'TypeScript'];
    render(<SkillsMarquee skills={mockSkills} />);

    expect(screen.getByTestId('infinite-moving-cards')).toBeInTheDocument();
    
    // Check if skills are displayed
    mockSkills.forEach((skill) => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });
});
