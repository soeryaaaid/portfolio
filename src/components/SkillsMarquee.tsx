import React from 'react';
import { InfiniteMovingCards } from './ui/infinite-moving-cards';

export const SkillsMarquee = ({ skills }: { skills: string[] }) => {
  // Map skills to the format expected by InfiniteMovingCards
  const marqueeItems = skills.map((skill) => ({
    quote: `Building solutions and writing efficient code using ${skill}.`,
    name: skill,
    title: 'Technology Stack',
  }));

  return (
    <div className="py-20 bg-zinc-950 text-white flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-4xl mx-auto text-center px-4 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Skills & Technologies
        </h2>
        <p className="text-zinc-400 text-sm md:text-base">
          A selection of tools and technologies I use to bring ideas to life.
        </p>
      </div>

      <div className="w-full flex justify-center items-center">
        <InfiniteMovingCards
          items={marqueeItems}
          direction="left"
          speed="normal"
          className="max-w-full"
        />
      </div>
    </div>
  );
};
