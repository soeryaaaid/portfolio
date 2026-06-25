"use client";

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { SkillsMarquee } from '@/components/SkillsMarquee';
import { ExperienceTabs } from '@/components/ExperienceTabs';
import { ProjectGrid } from '@/components/ProjectGrid';
import { Contact } from '@/components/Contact';
import { PortfolioData } from '@/utils/getPortfolioData';

interface PortfolioPageClientProps {
  data: PortfolioData;
}

export default function PortfolioPageClient({ data }: PortfolioPageClientProps) {
  return (
    <>
      {/* Floating Navigation */}
      <Navbar />

      {/* Main Single Page Sections */}
      <main className="flex flex-col w-full">
        <Hero
          data={data}
          width={300}
          height={380}
          cellSize={5}
          dotScale={0.85}
          shape="square"
          backgroundColor="#000000"
          grayscale={false}
          responsive={false}
          dropoutStrength={0}
          interactive={true}
          distortionStrength={4}
          distortionRadius={150}
          distortionMode="repel"
          followSpeed={0.10}
          sampleAverage={true}
          tintColor="#6366f1"
          tintStrength={0.15}
          maxFps={60}
          objectFit="cover"
          jitterStrength={10}
          jitterSpeed={2}
          fadeOnLeave={true}
          fadeSpeed={0.03}
          glowBlur={0}
          glowInactiveZone={0.7}
          glowProximity={150}
          glowSpread={30}
          glowVariant="default"
          glowGlow={false}
          glowDisabled={false}
          glowMovementDuration={2}
          glowBorderWidth={1}
        />
        <SkillsMarquee skills={data.skills} />
        <ExperienceTabs experience={data.experience} />
        <ProjectGrid projects={data.projects} />
        <Contact contact={data.contact} />
      </main>
    </>
  );
}
