import { atom } from "jotai";

export type FormStateAtomValue = "idle" | "loading";

export const formStateAtom = atom<FormStateAtomValue>("idle")
