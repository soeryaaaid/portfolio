import React from 'react';
import { Tabs } from '@/components/ui/tabs';
import { ExperienceItem } from '@/utils/getPortfolioData';
import { MapPin, Calendar, Briefcase } from 'lucide-react';

export const ExperienceTabs = ({ experience }: { experience: ExperienceItem[] }) => {
  if (!experience || experience.length === 0) return null;

  // Format experience items for the Aceternity Tabs component
  const tabItems = experience.map((item) => ({
    title: item.company,
    value: item.company.toLowerCase().replace(/\s+/g, '-'),
    content: (
      <div className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-cyan-400" />
              {item.role}
            </h3>
            <p className="text-cyan-400 font-medium mt-1">{item.company}</p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-neutral-600 dark:text-neutral-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-neutral-500" />
              {item.duration}
            </span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-neutral-500" />
              {item.location}
            </span>
          </div>
        </div>

        <ul className="space-y-3">
          {item.description.map((desc, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300 text-sm md:text-base leading-relaxed"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
              <span>{desc}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <div
      id="experience"
      className="py-20 bg-white dark:bg-black text-neutral-900 dark:text-white px-4 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center md:text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Work Experience</h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            A history of my professional roles and internships.
          </p>
        </div>

        <div className="w-full flex flex-col [perspective:1000px] relative">
          <Tabs
            tabs={tabItems}
            containerClassName="mb-8"
            activeTabClassName="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
            tabClassName="text-sm font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all py-2.5"
            contentClassName="relative w-full h-auto min-h-[300px]"
          />
        </div>
      </div>
    </div>
  );
};
