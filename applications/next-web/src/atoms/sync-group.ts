import { atom } from "jotai";

/** Overrides the current sync group ID in the popover trigger. Reset to null on mount to fall back to the route param. */
export const selectedSyncGroupIdAtom = atom<string | null>(null);
