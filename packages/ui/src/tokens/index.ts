/**
 * Design tokens barrel export
 * Centralized design system tokens for the UI library
 */

export * from "./colors";
export * from "./typography";
export * from "./spacing";
export * from "./effects";
export * from "./layout";
export * from "./motion";

// Re-export commonly used tokens for convenience
export { TEXT_COLORS, BACKGROUND_COLORS, BORDER_COLORS, ICON_COLORS } from "./colors";
export { TYPOGRAPHY, FONT_SIZES, FONT_WEIGHTS } from "./typography";
export { FORM_INPUT_SIZES, BUTTON_SIZES, PADDING, GAP } from "./spacing";
export { FOCUS_RING, DISABLED, BORDER_RADIUS, TRANSITIONS } from "./effects";
export { Z_INDEX, ICON_SIZES, SIZES } from "./layout";
export { EASING, DURATION, MODAL_ANIMATION } from "./motion";
