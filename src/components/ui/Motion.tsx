'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  Variants,
} from 'framer-motion';

// Premium e-commerce luxury easing curves
export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;
export const SMOOTH_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * 1. SectionReveal
 * Smooth viewport entrance for major homepage sections.
 * Triggers once when 15-20% of section enters viewport.
 */
interface SectionRevealProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  yOffset?: number;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  id,
  className = '',
  delay = 0,
  yOffset = 28,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: yOffset }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration: 0.7,
        ease: LUXURY_EASE,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * 2. FadeUp
 * Elegant upward fade for headings, paragraphs, and buttons.
 */
interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
}

export const FadeUp: React.FC<FadeUpProps> = ({
  children,
  className = '',
  delay = 0,
  yOffset = 20,
  duration = 0.6,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: yOffset }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration,
        ease: LUXURY_EASE,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * 3. FadeIn
 * Subtle pure opacity reveal for badges, borders, or backgrounds.
 */
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        duration,
        ease: 'easeOut',
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * 4. StaggerContainer & StaggerItem
 * Direct performant renderers for product grids and catalog listings.
 * Ensures zero delay and instant visibility upon navigation.
 */
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
}) => {
  return <div className={className}>{children}</div>;
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
}) => {
  return <div className={className}>{children}</div>;
};

/**
 * 5. ImageReveal
 * Fashion-grade editorial image reveal: scale 1.06 -> 1 with opacity fade.
 */
interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({ children, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.06 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.85,
          ease: LUXURY_EASE,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * 6. ParallaxWrapper
 * Subtle vertical parallax movement for hero imagery & editorial showcases.
 * Clamped to gentle ranges and disabled on mobile & reduced motion.
 */
interface ParallaxWrapperProps {
  children: React.ReactNode;
  className?: string;
  offset?: number; // max pixels movement, e.g. 16
}

export const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({
  children,
  className = '',
  offset = 18,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  if (shouldReduceMotion || isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
};

/**
 * 7. AnimatedCounter
 * Counts from 0 to target value smoothly when entering viewport.
 */
interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = '',
  prefix = '',
  duration = 1.2,
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setCount(target);
      return;
    }

    let start = 0;
    const end = target;
    const totalDuration = duration * 1000;
    const frameRate = 16;
    const totalFrames = Math.round(totalDuration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      // Ease out cubic
      const progress = frame / totalFrames;
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easeProgress);

      setCount(current);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(end);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [isInView, target, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};
