/**
 * Color tokens for the UI library
 * These map to Tailwind's neutral scale and semantic colors
 */

export const TEXT_COLORS = {
  primary: "text-neutral-900",
  secondary: "text-neutral-600",
  tertiary: "text-neutral-500",
  muted: "text-neutral-400",
  error: "text-red-600",
  success: "text-green-600",
  warning: "text-amber-600",
} as const;

export const BACKGROUND_COLORS = {
  primary: "bg-white",
  secondary: "bg-neutral-50",
  tertiary: "bg-neutral-100",
  muted: "bg-neutral-200",
  error: "bg-red-50",
  success: "bg-green-50",
  warning: "bg-amber-50",
} as const;

export const BORDER_COLORS = {
  default: "border-neutral-200",
  light: "border-neutral-300",
  medium: "border-neutral-400",
  dark: "border-neutral-800",
  error: "border-red-400",
  success: "border-green-400",
  warning: "border-amber-400",
} as const;

export const ICON_COLORS = {
  primary: "text-neutral-900",
  secondary: "text-neutral-600",
  tertiary: "text-neutral-500",
  muted: "text-neutral-400",
  error: "text-red-400",
  success: "text-green-400",
  warning: "text-amber-400",
} as const;
