'use client';

import React from 'react';
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';
import { PixelatedCanvas } from '@/components/ui/pixelated-canvas';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { PortfolioData } from '@/utils/getPortfolioData';

interface HeroProps {
  data: PortfolioData;
  // Pixelated Canvas Props
  width?: number;
  height?: number;
  cellSize?: number;
  dotScale?: number;
  shape?: 'circle' | 'square';
  backgroundColor?: string;
  grayscale?: boolean;
  responsive?: boolean;
  dropoutStrength?: number;
  interactive?: boolean;
  distortionStrength?: number;
  distortionRadius?: number;
  distortionMode?: 'repel' | 'attract' | 'swirl';
  followSpeed?: number;
  sampleAverage?: boolean;
  tintColor?: string;
  tintStrength?: number;
  maxFps?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  jitterStrength?: number;
  jitterSpeed?: number;
  fadeOnLeave?: boolean;
  fadeSpeed?: number;
  // Glowing Effect Props
  glowBlur?: number;
  glowInactiveZone?: number;
  glowProximity?: number;
  glowSpread?: number;
  glowVariant?: 'default' | 'white';
  glowGlow?: boolean;
  glowDisabled?: boolean;
  glowMovementDuration?: number;
  glowBorderWidth?: number;
}

export const Hero = ({
  data,
  // Pixelated Canvas defaults
  width = 300,
  height = 380,
  cellSize = 5,
  dotScale = 0.85,
  shape = 'square',
  backgroundColor = '#000000',
  grayscale = false,
  responsive = false,
  dropoutStrength = 0,
  interactive = true,
  distortionStrength = 4,
  distortionRadius = 150,
  distortionMode = 'repel',
  followSpeed = 0.1,
  sampleAverage = true,
  tintColor = '#6366f1',
  tintStrength = 0.15,
  maxFps = 60,
  objectFit = 'cover',
  jitterStrength = 10,
  jitterSpeed = 2,
  fadeOnLeave = true,
  fadeSpeed = 0.03,
  // Glowing Effect defaults
  glowBlur = 0,
  glowInactiveZone = 0.7,
  glowProximity = 150,
  glowSpread = 30,
  glowVariant = 'default',
  glowGlow = false,
  glowDisabled = false, // Enable interactive border glow by default
  glowMovementDuration = 2,
  glowBorderWidth = 1,
}: HeroProps) => {
  const { name, headline, about, contact } = data;

  // Premium developer stock portrait from Unsplash
  const avatarSrc =
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80';

  return (
    <section
      id="about"
      className="relative min-h-screen bg-white dark:bg-black text-neutral-950 dark:text-white w-full"
    >
      <HeroHighlight containerClassName="min-h-screen w-full py-20 px-4 md:px-8 flex items-center justify-center bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Introduction & Texts */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left relative z-20">
            {/* Professional Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-950/20 px-3.5 py-1 text-xs md:text-sm font-medium text-indigo-600 dark:text-indigo-400 backdrop-blur-md mb-6">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
              Continuous Learner & Professional
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-neutral-900 dark:text-white leading-tight">
              Hi, I am{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
                {name}
              </span>
            </h1>

            {/* Headline with animated highlighting */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-6 leading-snug">
              Specialized in <br />
              <Highlight className="text-black dark:text-white">
                {headline.split('|')[0].trim()}
              </Highlight>
            </h2>

            {/* About / Intro */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed mb-8">
              {about}
            </p>

            {/* Social Media Link Icons using theSVG */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
              {/* GitHub */}
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/90 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-900 dark:text-white transition-all transform hover:-translate-y-2 hover:z-20 shadow-lg hover:border-neutral-300 dark:hover:border-neutral-700/50"
              >
                <img
                  src="https://thesvg.org/icons/github/default.svg"
                  alt="GitHub"
                  className="w-5 h-5 dark:invert"
                />
              </a>

              {/* LinkedIn */}
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/90 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-900 dark:text-white transition-all transform hover:-translate-y-2 hover:z-20 shadow-lg hover:border-indigo-300 dark:hover:border-indigo-500/50"
              >
                <img
                  src="https://thesvg.org/icons/linkedin/default.svg"
                  alt="LinkedIn"
                  className="w-5 h-5"
                />
              </a>

              {/* Gmail via theSVG */}
              <a
                href={`mailto:${contact.email}`}
                aria-label="Email"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/90 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-900 dark:text-white transition-all transform hover:-translate-y-2 hover:z-20 shadow-lg hover:border-red-300 dark:hover:border-red-500/50"
              >
                <img
                  src="https://thesvg.org/icons/gmail/default.svg"
                  alt="Gmail"
                  className="w-5 h-5"
                />
              </a>
            </div>
          </div>

          {/* Right Column: Premium Pixelated Canvas Portrait wrapped in Glowing Effect Card */}
          <div className="lg:col-span-5 flex justify-center items-center relative z-10">
            <div className="relative rounded-2xl border border-neutral-200 dark:border-neutral-800/50 p-2 md:rounded-3xl md:p-3 max-w-[340px] mx-auto w-full">
              <GlowingEffect
                blur={glowBlur}
                inactiveZone={glowInactiveZone}
                proximity={glowProximity}
                spread={glowSpread}
                variant={glowVariant}
                glow={glowGlow}
                disabled={glowDisabled}
                movementDuration={glowMovementDuration}
                borderWidth={glowBorderWidth}
              />
              <div className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-xl p-4 bg-neutral-50 dark:bg-neutral-950 shadow-md dark:shadow-[0px_0px_27px_0px_#2D2D2D] border-neutral-200 dark:border-neutral-900 border">
                <div className="rounded-xl overflow-hidden bg-black flex justify-center items-center">
                  <PixelatedCanvas
                    src={avatarSrc}
                    width={width}
                    height={height}
                    cellSize={cellSize}
                    dotScale={dotScale}
                    shape={shape}
                    backgroundColor={backgroundColor}
                    grayscale={grayscale}
                    responsive={responsive}
                    dropoutStrength={dropoutStrength}
                    interactive={interactive}
                    distortionStrength={distortionStrength}
                    distortionRadius={distortionRadius}
                    distortionMode={distortionMode}
                    followSpeed={followSpeed}
                    sampleAverage={sampleAverage}
                    tintColor={tintColor}
                    tintStrength={tintStrength}
                    maxFps={maxFps}
                    objectFit={objectFit}
                    jitterStrength={jitterStrength}
                    jitterSpeed={jitterSpeed}
                    fadeOnLeave={fadeOnLeave}
                    fadeSpeed={fadeSpeed}
                    className="max-w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeroHighlight>
    </section>
  );
};
