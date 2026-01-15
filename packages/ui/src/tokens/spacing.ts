/**
 * Spacing tokens for the UI library
 * Includes padding, margin, and gap utilities
 */

export const PADDING = {
  none: "p-0",
  xs: "p-1",
  sm: "p-2",
  md: "p-3",
  lg: "p-4",
  xl: "p-6",
  "2xl": "p-8",
} as const;

export const GAP = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
  xl: "gap-6",
  "2xl": "gap-8",
} as const;

export const FORM_INPUT_SIZES = {
  default: "py-2 px-4 text-base",
  small: "py-1.5 px-3 text-sm",
} as const;

export const BUTTON_SIZES = {
  large: "py-2 px-4",
  default: "py-1.5 px-4 text-sm",
  small: "py-1.25 px-3.5 text-sm",
} as const;
