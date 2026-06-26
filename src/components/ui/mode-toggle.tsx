'use client';

import React, { useCallback, useRef, useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';
import { useTheme } from 'next-themes';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type TransitionVariant =
  | 'circle'
  | 'square'
  | 'triangle'
  | 'diamond'
  | 'hexagon'
  | 'rectangle'
  | 'star';

function polygonCollapsed(cx: number, cy: number, vertexCount: number): string {
  const pairs = Array.from({ length: vertexCount }, () => `${cx}px ${cy}px`).join(', ');
  return `polygon(${pairs})`;
}

function getThemeTransitionClipPaths(
  variant: TransitionVariant,
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number,
): [string, string] {
  switch (variant) {
    case 'circle':
      return [`circle(0px at ${cx}px ${cy}px)`, `circle(${maxRadius}px at ${cx}px ${cy}px)`];
    case 'square': {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const halfSide = Math.max(halfW, halfH) * 1.05;
      const end = [
        `${cx - halfSide}px ${cy - halfSide}px`,
        `${cx + halfSide}px ${cy - halfSide}px`,
        `${cx + halfSide}px ${cy + halfSide}px`,
        `${cx - halfSide}px ${cy + halfSide}px`,
      ].join(', ');
      return [polygonCollapsed(cx, cy, 4), `polygon(${end})`];
    }
    case 'triangle': {
      const scale = maxRadius * 2.2;
      const dx = (Math.sqrt(3) / 2) * scale;
      const verts = [
        `${cx}px ${cy - scale}px`,
        `${cx + dx}px ${cy + 0.5 * scale}px`,
        `${cx - dx}px ${cy + 0.5 * scale}px`,
      ].join(', ');
      return [polygonCollapsed(cx, cy, 3), `polygon(${verts})`];
    }
    case 'diamond': {
      const R = maxRadius * Math.SQRT2;
      const end = [
        `${cx}px ${cy - R}px`,
        `${cx + R}px ${cy}px`,
        `${cx}px ${cy + R}px`,
        `${cx - R}px ${cy}px`,
      ].join(', ');
      return [polygonCollapsed(cx, cy, 4), `polygon(${end})`];
    }
    case 'hexagon': {
      const R = maxRadius * Math.SQRT2;
      const verts: string[] = [];
      for (let i = 0; i < 6; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 3;
        verts.push(`${cx + R * Math.cos(a)}px ${cy + R * Math.sin(a)}px`);
      }
      return [polygonCollapsed(cx, cy, 6), `polygon(${verts.join(', ')})`];
    }
    case 'rectangle': {
      const halfW = Math.max(cx, viewportWidth - cx);
      const halfH = Math.max(cy, viewportHeight - cy);
      const end = [
        `${cx - halfW}px ${cy - halfH}px`,
        `${cx + halfW}px ${cy - halfH}px`,
        `${cx + halfW}px ${cy + halfH}px`,
        `${cx - halfW}px ${cy + halfH}px`,
      ].join(', ');
      return [polygonCollapsed(cx, cy, 4), `polygon(${end})`];
    }
    case 'star': {
      const R = maxRadius * Math.SQRT2 * 1.03;
      const innerRatio = 0.42;
      const starPolygon = (radius: number) => {
        const verts: string[] = [];
        for (let i = 0; i < 5; i++) {
          const outerA = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
          verts.push(`${cx + radius * Math.cos(outerA)}px ${cy + radius * Math.sin(outerA)}px`);
          const innerA = outerA + Math.PI / 5;
          verts.push(
            `${cx + radius * innerRatio * Math.cos(innerA)}px ${cy + radius * innerRatio * Math.sin(innerA)}px`,
          );
        }
        return `polygon(${verts.join(', ')})`;
      };
      const startR = Math.max(2, R * 0.025);
      return [starPolygon(startR), starPolygon(R)];
    }
    default:
      return [`circle(0px at ${cx}px ${cy}px)`, `circle(${maxRadius}px at ${cx}px ${cy}px)`];
  }
}

interface ModeToggleProps {
  className?: string;
  duration?: number;
  variant?: TransitionVariant;
  fromCenter?: boolean;
}

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ModeToggle({
  className,
  duration = 400,
  variant = 'circle',
  fromCenter = false,
}: ModeToggleProps) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = useCallback(() => {
    if (!mounted) return;
    const button = buttonRef.current;
    if (!button) return;

    const currentTheme = theme === 'system' ? 'light' : theme;
    const isDark = currentTheme === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';

    const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;

    let x: number;
    let y: number;
    if (fromCenter) {
      x = viewportWidth / 2;
      y = viewportHeight / 2;
    } else {
      const { top, left, width, height } = button.getBoundingClientRect();
      x = left + width / 2;
      y = top + height / 2;
    }

    const maxRadius = Math.hypot(Math.max(x, viewportWidth - x), Math.max(y, viewportHeight - y));

    const applyTheme = () => {
      // Toggle class synchronously so the View Transitions API
      // snapshots the new theme inside the startViewTransition callback.
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
      setTheme(nextTheme);
    };

    if (typeof document.startViewTransition !== 'function') {
      applyTheme();
      return;
    }

    const clipPath = getThemeTransitionClipPaths(
      variant,
      x,
      y,
      maxRadius,
      viewportWidth,
      viewportHeight,
    );

    const root = document.documentElement;
    root.dataset.magicuiThemeVt = 'active';
    root.style.setProperty('--magicui-theme-toggle-vt-duration', `${duration}ms`);
    root.style.setProperty('--magicui-theme-vt-clip-from', clipPath[0]);

    const cleanup = () => {
      delete root.dataset.magicuiThemeVt;
      root.style.removeProperty('--magicui-theme-toggle-vt-duration');
      root.style.removeProperty('--magicui-theme-vt-clip-from');
    };

    const transition = document.startViewTransition(() => {
      flushSync(applyTheme);
    });

    if (typeof transition?.finished?.finally === 'function') {
      transition.finished.finally(cleanup);
    } else {
      cleanup();
    }

    const ready = transition?.ready;
    if (ready && typeof ready.then === 'function') {
      ready.then(() => {
        document.documentElement.animate(
          {
            clipPath,
          },
          {
            duration,
            easing: variant === 'star' ? 'linear' : 'ease-in-out',
            fill: 'forwards',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      });
    }
  }, [variant, fromCenter, duration, theme, mounted, setTheme]);

  if (!mounted) {
    return <div className="h-8 w-8 rounded-full border-none bg-transparent animate-pulse" />;
  }

  const isDark = theme === 'dark';

  return (
    <Button
      type="button"
      ref={buttonRef}
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn(
        'rounded-full border-none shadow-none bg-transparent text-neutral-900 dark:text-white cursor-pointer transition-colors',
        className,
      )}
      aria-label="Toggle Theme"
    >
      <motion.svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ rotate: isDark ? 90 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-4.5 h-4.5"
      >
        <defs>
          <mask id="theme-toggle-mask">
            <rect width="24" height="24" fill="white" />
            <motion.circle
              cx="12"
              cy="12"
              r="9"
              fill="black"
              animate={{
                cx: isDark ? 18 : 30,
                cy: isDark ? 6 : -10,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            />
          </mask>
        </defs>

        {/* Central Sun/Moon Body */}
        <motion.circle
          cx="12"
          cy="12"
          r="9"
          fill="currentColor"
          mask="url(#theme-toggle-mask)"
          animate={{
            r: isDark ? 9 : 5,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        />

        {/* Sun Rays */}
        <motion.g
          stroke="currentColor"
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.3 : 1,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          style={{ originX: '12px', originY: '12px' }}
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </motion.g>
      </motion.svg>
    </Button>
  );
}
