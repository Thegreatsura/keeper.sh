import type { PropsWithChildren } from "react";

export function MarketingHowItWorksSection({ children }: PropsWithChildren) {
  return <section className="w-full pt-16 pb-4">{children}</section>;
}

export function MarketingHowItWorksGrid({ children }: PropsWithChildren) {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">{children}</div>
  );
}

export function MarketingHowItWorksStep({
  step,
  children,
}: PropsWithChildren<{ step: number }>) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-center size-8 rounded-full border border-interactive-border text-xs font-medium tracking-tight text-foreground-muted">
        {step}
      </div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}
