/**
 * Motion tokens for the UI library
 * Animation easing functions and durations for Framer Motion
 */

export const EASING = {
  // Standard easing curves
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],

  // Custom easing
  smooth: [0.16, 0.85, 0.2, 1], // Used for modals
  spring: [0.6, 0.01, -0.05, 0.95],
} as const;

export const DURATION = {
  fast: 0.15,
  normal: 0.2,
  slow: 0.3,
  slower: 0.5,
} as const;

export const MODAL_ANIMATION = {
  backdrop: {
    duration: DURATION.normal,
    ease: EASING.easeOut,
  },
  desktop: {
    duration: DURATION.normal,
    ease: EASING.smooth,
  },
  mobile: {
    duration: DURATION.slow,
    ease: EASING.smooth,
  },
} as const;
