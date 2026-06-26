import { getPortfolioData } from '@/utils/getPortfolioData';
import PortfolioPageClient from '@/components/PortfolioPageClient';
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
      <PortfolioPageClient data={data} />
    </div>
  );
}
