import type { PropsWithChildren } from "react";

export function MarketingFaqSection({ children }: PropsWithChildren) {
  return <section className="w-full max-w-lg mx-auto pt-16 pb-4">{children}</section>;
}

export function MarketingFaqList({ children }: PropsWithChildren) {
  return (
    <div className="mt-8 border border-interactive-border rounded-2xl overflow-hidden divide-y divide-interactive-border">
      {children}
    </div>
  );
}

export function MarketingFaqQuestion({ children }: PropsWithChildren) {
  return (
    <span className="text-sm font-normal tracking-tight">
      {children}
    </span>
  );
}
