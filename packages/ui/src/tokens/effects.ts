/**
 * Visual effects tokens for the UI library
 * Includes shadows, transitions, focus rings, and borders
 */

export const SHADOWS = {
  none: "shadow-none",
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  "2xl": "shadow-2xl",
} as const;

export const TRANSITIONS = {
  all: "transition-all",
  colors: "transition-colors",
  opacity: "transition-opacity",
  transform: "transition-transform",
  fast: "transition-all duration-150",
  normal: "transition-all duration-200",
  slow: "transition-all duration-300",
} as const;

export const FOCUS_RING = {
  button: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2",
  input: "focus:outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200",
  checkbox: "peer-focus:ring-2 peer-focus:ring-neutral-200 peer-focus:border-neutral-400",
} as const;

export const DISABLED = {
  button: "disabled:opacity-50 disabled:cursor-not-allowed",
  input: "disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed",
  label: "cursor-not-allowed opacity-50",
} as const;

export const BORDER_RADIUS = {
  none: "rounded-none",
  sm: "rounded-sm",
  default: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-full",
  button: "rounded-xl",
  input: "rounded-xl",
  card: "rounded-2xl",
} as const;

export const BACKDROP_BLUR = {
  none: "backdrop-blur-none",
  sm: "backdrop-blur-sm",
  default: "backdrop-blur-[0.125rem]",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
} as const;
