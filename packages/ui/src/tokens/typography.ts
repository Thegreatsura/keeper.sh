/**
 * Typography tokens for the UI library
 * Includes font sizes, weights, and common text styles
 */

export const FONT_SIZES = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
} as const;

export const FONT_WEIGHTS = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

export const LINE_HEIGHTS = {
  none: "leading-none",
  tight: "leading-tight",
  normal: "leading-normal",
  relaxed: "leading-relaxed",
  loose: "leading-loose",
} as const;

export const TYPOGRAPHY = {
  label: "text-sm font-medium text-neutral-900",
  secondaryXs: "text-xs text-neutral-400",
  secondaryXsMedium: "text-xs font-medium text-neutral-400",
  secondarySmMedium: "text-sm font-medium text-neutral-600",
  stepCounter: "text-xs font-medium text-neutral-600",
  stepDescription: "text-xs text-neutral-500",
  calendarLabel: "font-mono text-[0.625rem] text-neutral-400 leading-none",
  error: "text-xs text-red-600",
} as const;
