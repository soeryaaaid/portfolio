import React from 'react';
import { InfiniteMovingCards } from './ui/infinite-moving-cards';

function getTheSvgUrl(skillName: string): string {
  const mapping: { [key: string]: string } = {
    'next.js': 'nextdotjs',
    'node.js': 'nodedotjs',
    'express.js': 'expressdotjs',
    'tailwind css': 'tailwind-css',
    'javascript': 'javascript',
    'typescript': 'typescript',
    'react': 'react',
    'git': 'git',
    'github': 'github',
  };
  const normalized = skillName.toLowerCase().trim();
  const slug = mapping[normalized] || normalized.replace(/[^a-z0-9]/g, '');
  return `https://thesvg.org/icons/${slug}/default.svg`;
}

export const SkillsMarquee = ({
  skills,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
}: {
  skills: string[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
}) => {
  // Map skills to Logo Clouds format
  const marqueeItems = skills.map((skill) => ({
    name: skill,
    icon: getTheSvgUrl(skill),
    quote: '',
    title: '',
  }));

  return (
    <div className="relative z-20 px-4 py-10 md:px-8 md:py-40 bg-neutral-50 dark:bg-neutral-950 text-neutral-950 dark:text-white flex flex-col items-center justify-center overflow-hidden border-y border-neutral-200 dark:border-neutral-900">
      <div className="max-w-4xl mx-auto text-center px-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
          Skills & Technologies
        </h2>
        <p className="text-neutral-600 dark:text-neutral-500 text-xs md:text-sm">
          A selection of tools and technologies I use to build premium digital products.
        </p>
      </div>

      <div className="w-full flex justify-center items-center max-w-7xl mx-auto px-4 md:px-8">
        <InfiniteMovingCards
          items={marqueeItems}
          direction="left"
          speed="normal"
          pauseOnHover={true}
          className="max-w-full"
        />
      </div>
    </div>
  );
};
