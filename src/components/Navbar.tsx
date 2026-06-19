"use client";

import React from 'react';
import { FloatingNav } from './ui/floating-navbar';
import { User, Briefcase, Code, Mail } from 'lucide-react';

export const Navbar = () => {
  const navItems = [
    {
      name: 'About',
      link: '#about',
      icon: <User className="h-4 w-4" />,
    },
    {
      name: 'Experience',
      link: '#experience',
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      name: 'Projects',
      link: '#projects',
      icon: <Code className="h-4 w-4" />,
    },
    {
      name: 'Contact',
      link: '#contact',
      icon: <Mail className="h-4 w-4" />,
    },
  ];

  const handleCtaClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <NavbarContainer>
      <FloatingNav
        navItems={navItems}
        cta={
          <button
            onClick={handleCtaClick}
            className="relative rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-900/20 dark:bg-white dark:text-black dark:hover:bg-neutral-100 dark:hover:shadow-white/20"
          >
            <span>Contact</span>
          </button>
        }
      />
    </NavbarContainer>
  );
};

// Container wrapper to make sure Navbar is rendered and can be found easily in document
const NavbarContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full relative z-[5000]">{children}</div>;
};
