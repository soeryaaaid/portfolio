import { getPortfolioData } from '@/utils/getPortfolioData';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { SkillsMarquee } from '@/components/SkillsMarquee';
import { ExperienceTabs } from '@/components/ExperienceTabs';
import { ProjectGrid } from '@/components/ProjectGrid';
import { Contact } from '@/components/Contact';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Software Engineer & Machine Learning Specialist | Portfolio',
  description:
    'A personal web portfolio showcasing featured projects, work experience, technical skill sets, and certifications.',
};

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <div className="min-h-screen bg-black font-sans text-white antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Floating Navigation */}
      <Navbar />

      {/* Main Single Page Sections */}
      <main className="flex flex-col w-full">
        <Hero data={data} />
        <SkillsMarquee skills={data.skills} />
        <ExperienceTabs experience={data.experience} />
        <ProjectGrid projects={data.projects} />
        <Contact contact={data.contact} />
      </main>
    </div>
  );
}
