import React from 'react';
import { Spotlight } from '@/components/ui/spotlight';
import { PortfolioData } from '@/utils/getPortfolioData';
import { Mail } from 'lucide-react';

// Custom inline GitHub icon to avoid missing icon exports in old lucide-react versions
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Custom inline LinkedIn icon to avoid missing icon exports in old lucide-react versions
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Hero = ({ data }: { data: PortfolioData }) => {
  const { name, headline, about, contact } = data;

  return (
    <section
      id="about"
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-black text-white px-4 md:px-8 py-20"
    >
      {/* Background Spotlight effects */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(6, 182, 212, 0.15)" // Cyan accent
      />
      <Spotlight
        className="top-40 right-0 md:right-60"
        fill="rgba(139, 92, 246, 0.15)" // Violet accent
      />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center justify-center">
        {/* Humble Stay-Low Intro Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs md:text-sm font-medium text-cyan-400 backdrop-blur-md mb-6 animate-pulse">
          <span className="flex h-2 w-2 rounded-full bg-cyan-400" />
          Available for New Opportunities
        </div>

        {/* Name with elegant gradient */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4">
          Hi, I am{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-500">
            {name}
          </span>
        </h1>

        {/* Headline */}
        <p className="text-lg sm:text-2xl md:text-3xl font-semibold text-zinc-300 max-w-2xl mb-6">
          {headline}
        </p>

        {/* Brief professional details - stay low / humble */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-3xl leading-relaxed mb-10">
          {about}
        </p>

        {/* Social Links Avatar Stack */}
        <div className="flex items-center justify-center -space-x-4 mb-8">
          {/* GitHub Icon Avatar */}
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center justify-center w-12 h-12 rounded-full border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-white transition-all transform hover:-translate-y-2 hover:z-20 shadow-lg hover:border-cyan-500/50"
          >
            <GithubIcon />
          </a>

          {/* LinkedIn Icon Avatar */}
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center justify-center w-12 h-12 rounded-full border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-white transition-all transform hover:-translate-y-2 hover:z-20 shadow-lg hover:border-indigo-500/50"
          >
            <LinkedinIcon />
          </a>

          {/* Email Icon Avatar */}
          <a
            href={`mailto:${contact.email}`}
            aria-label="Email"
            className="flex items-center justify-center w-12 h-12 rounded-full border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-white transition-all transform hover:-translate-y-2 hover:z-20 shadow-lg hover:border-violet-500/50"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Grid background effect overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
    </section>
  );
};
