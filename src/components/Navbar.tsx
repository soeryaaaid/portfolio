import React, { useState } from 'react';
import {
  Navbar as ResizableNavContainer,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from './ui/resizable-navbar';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'About', link: '#about' },
    { name: 'Experience', link: '#experience' },
    { name: 'Projects', link: '#projects' },
    { name: 'Contact', link: '#contact' },
  ];

  const handleCtaClick = () => {
    setIsOpen(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative z-[5000]">
      <ResizableNavContainer className="fixed top-0 left-0 w-full">
        {/* Desktop Resizable Navigation Bar */}
        <NavBody className="px-6 py-3 mt-4">
          {/* Logo / Initials */}
          <a
            href="#"
            className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white transition-opacity hover:opacity-80"
          >
            <span className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 flex items-center justify-center text-black font-extrabold text-xs shadow-lg shadow-cyan-500/20">
              JD
            </span>
            <span className="hidden sm:inline-block tracking-tight">John Doe</span>
          </a>

          {/* Navigation links (centered) */}
          <div className="relative flex-grow flex justify-center max-w-sm mx-auto">
            <NavItems items={navItems} />
          </div>

          {/* CTA Contact Button */}
          <div className="flex items-center gap-3">
            <NavbarButton
              as="button"
              variant="primary"
              className="bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-black font-semibold rounded-full px-5 py-2 text-xs transition-all shadow-md"
              onClick={handleCtaClick}
            >
              Contact
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation Bar */}
        <MobileNav className="px-4 py-3 mt-2">
          <MobileNavHeader>
            <a
              href="#"
              className="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white"
            >
              <span className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 flex items-center justify-center text-black font-extrabold text-xs">
                JD
              </span>
              <span className="tracking-tight">John Doe</span>
            </a>
            <div className="flex items-center gap-3">
              <MobileNavToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            </div>
          </MobileNavHeader>
          <MobileNavMenu isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className="flex flex-col gap-4 w-full">
              {navItems.map((item) => (
                <a
                  key={item.link}
                  href={item.link}
                  onClick={() => setIsOpen(false)}
                  className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white font-medium py-2 border-b border-neutral-100 dark:border-neutral-900 text-sm transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <button
                onClick={handleCtaClick}
                className="w-full py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black font-bold text-xs mt-2 transition-all hover:bg-neutral-800 dark:hover:bg-neutral-200"
              >
                Contact
              </button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavContainer>
    </div>
  );
};
