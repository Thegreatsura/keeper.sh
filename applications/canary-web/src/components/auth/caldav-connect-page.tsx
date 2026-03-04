import type { ReactNode } from "react";
import { Heading2 } from "../ui/heading";
import { Text } from "../ui/text";
import { ProviderIconPair } from "./oauth-preamble";
import { CalDAVConnectForm } from "./caldav-connect-form";

type CalDAVProvider = "fastmail" | "icloud" | "caldav";

interface CalDAVConnectPageProps {
  provider: CalDAVProvider;
  icon: ReactNode;
  heading: string;
  description: string;
  steps: ReactNode[];
  footer?: ReactNode;
}

export function CalDAVConnectPage({
  provider,
  icon,
  heading,
  description,
  steps,
  footer,
}: CalDAVConnectPageProps) {
  return (
    <>
      <ProviderIconPair>{icon}</ProviderIconPair>
      <Heading2 as="h1">{heading}</Heading2>
      <Text size="sm" tone="muted" align="left">
        {description}
      </Text>
      <ol className="flex flex-col gap-1 list-decimal list-inside">
        {steps.map((step, index) => (
          <li key={index} className="text-sm tracking-tight text-foreground-muted">
            {step}
          </li>
        ))}
      </ol>
      {footer}
      <CalDAVConnectForm provider={provider} />
    </>
  );
}
