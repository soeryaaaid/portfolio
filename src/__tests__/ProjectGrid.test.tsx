import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProjectGrid } from '../components/ProjectGrid';
import { ProjectItem } from '@/utils/getPortfolioData';

const mockProjects: ProjectItem[] = [
  {
    title: 'Project Alpha',
    subtitle: 'Awesome Project',
    description: 'A stellar web application built for testing purposes.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    tags: ['React', 'Node.js'],
    link: 'https://github.com/example/alpha',
  },
  {
    title: 'Project Beta',
    subtitle: 'Mobile Application',
    description: 'A high-performance mobile application built for testing.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
    tags: ['Kotlin', 'TensorFlow'],
    link: 'https://github.com/example/beta',
  },
];

// Mock HoverEffect from Aceternity
vi.mock('../components/ui/card-hover-effect', () => ({
  HoverEffect: ({ items }: { items: { title: string; description: string; link: string }[] }) => (
    <div data-testid="hover-effect">
      {items.map((item) => (
        <div key={item.link} data-testid="project-card">
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <a href={item.link}>Link</a>
        </div>
      ))}
    </div>
  ),
}));

describe('ProjectGrid Component', () => {
  it('should render the projects layout grid', () => {
    render(<ProjectGrid projects={mockProjects} />);
    
    expect(screen.getByTestId('hover-effect')).toBeInTheDocument();
  });

  it('should render the mockup images and tags for projects', () => {
    render(<ProjectGrid projects={mockProjects} />);

    // Since HoverEffect is mocked, let's verify if the custom wrapper in ProjectGrid renders extra elements
    // like images and tags that are built on top of or alongside HoverEffect.
    mockProjects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
      // Check if project tags are rendered
      project.tags.forEach((tag) => {
        expect(screen.getByText(tag)).toBeInTheDocument();
      });
      // Check if image is rendered
      const img = screen.getByAltText(project.title);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', project.image);
    });
  });
});
