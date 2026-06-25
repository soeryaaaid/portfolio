import React from 'react';
import { ContactData } from '@/utils/getPortfolioData';

export const Contact = ({ contact }: { contact: ContactData }) => {
  const { email, linkedin, github } = contact;

  return (
    <footer id="contact" className="relative py-24 bg-white dark:bg-black text-neutral-950 dark:text-white px-4 md:px-8 overflow-hidden border-t border-neutral-200 dark:border-neutral-900">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-3 block">
          Let&apos;s Connect
        </span>
        
        <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-6 text-neutral-900 dark:text-white">
          Get in Touch
        </h2>
        
        <p className="text-neutral-600 dark:text-neutral-500 max-w-xl mx-auto text-sm md:text-lg mb-10 leading-relaxed">
          I am always open to discussing new opportunities, open-source projects, or learning achievements. Drop me a line!
        </p>

        {/* Major Contact Link Button using Gmail from theSVG */}
        <div className="inline-flex items-center justify-center mb-12">
          <a
            href={`mailto:${email}`}
            aria-label="Email"
            className="group inline-flex items-center gap-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-indigo-500/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white font-semibold px-6 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-indigo-500/5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10">
              <img
                src="https://thesvg.org/icons/gmail/default.svg"
                alt="Gmail"
                className="h-5 w-5"
              />
            </span>
            <span className="text-sm sm:text-base">{email}</span>
            <i className="fa-solid fa-arrow-right text-neutral-500 group-hover:text-white transition-transform group-hover:translate-x-1"></i>
          </a>
        </div>

        {/* Secondary Contact Icon List using theSVG */}
        <div className="flex justify-center items-center gap-6 pt-8 border-t border-neutral-100 dark:border-neutral-900">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium"
          >
            <img
              src="https://thesvg.org/icons/linkedin/default.svg"
              alt="LinkedIn"
              className="h-5 w-5"
            />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>

          <span className="text-neutral-200 dark:text-neutral-800">|</span>

          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors text-sm font-medium"
          >
            <img
              src="https://thesvg.org/icons/github/default.svg"
              alt="GitHub"
              className="h-5 w-5 dark:invert"
            />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>

        <p className="text-xs text-neutral-600 mt-16">
          © {new Date().getFullYear()} John Doe. Built with Next.js & Aceternity UI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
