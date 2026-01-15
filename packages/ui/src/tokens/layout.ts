/**
 * Layout tokens for the UI library
 * Includes z-index values, sizing, and common layout patterns
 */

export const Z_INDEX = {
  base: "z-0",
  dropdown: "z-50",
  sticky: "z-100",
  backdrop: "z-150",
  modal: "z-200",
  tooltip: "z-250",
} as const;

export const SIZES = {
  xs: "size-3",
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-12",
  "2xl": "size-16",
} as const;

export const ICON_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
} as const;

export const MAX_WIDTHS = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  full: "max-w-full",
} as const;
