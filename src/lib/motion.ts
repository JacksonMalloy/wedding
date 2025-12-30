"use client";

/**
 * Motion (Framer Motion) - Animation utilities
 * https://motion.dev/docs/react-quick-start
 *
 * Import from this file to ensure "use client" directive is applied.
 * All motion components require client-side rendering.
 */

// Re-export motion components
export {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  LayoutGroup,
  LazyMotion,
  domAnimation,
  domMax,
  m,
} from "motion/react";

// Re-export types
export type {
  Variants,
  Transition,
  Target,
  TargetAndTransition,
  MotionValue,
  PanInfo,
  TapInfo,
} from "motion/react";

/**
 * Animation Variants
 * Reusable animation presets for consistent animations across the app.
 */

// Fade animations
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Scale animations
export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

// Slide animations
export const slideInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export const slideInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};

/**
 * Stagger container variant
 * Use with children that have staggered animations
 */
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

/**
 * Stagger item variant
 * Use as children of stagger container
 */
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

/**
 * Common transition presets
 */
export const transitions = {
  // Smooth default
  default: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },

  // Quick snappy
  fast: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },

  // Slow elegant
  slow: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },

  // Spring physics
  spring: { type: "spring", stiffness: 300, damping: 30 },
  springBouncy: { type: "spring", stiffness: 400, damping: 25 },
  springGentle: { type: "spring", stiffness: 200, damping: 30 },

  // Easing curves
  easeOut: { duration: 0.4, ease: [0, 0, 0.2, 1] },
  easeIn: { duration: 0.4, ease: [0.4, 0, 1, 1] },
  easeInOut: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
} as const;

/**
 * Scroll-triggered animation variants
 * Use with useInView hook
 */
export const scrollReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export const scrollRevealScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

/**
 * Hover/tap animations for interactive elements
 */
export const buttonHover = {
  scale: 1.02,
  transition: { duration: 0.2 },
};

export const buttonTap = {
  scale: 0.98,
};

export const cardHover = {
  y: -4,
  transition: { duration: 0.3 },
};

/**
 * Page transition variants
 */
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

export const pageSlideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
};
