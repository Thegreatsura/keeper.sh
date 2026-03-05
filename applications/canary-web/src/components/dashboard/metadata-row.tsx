import type { ComponentPropsWithoutRef } from "react";
import type { Link } from "@tanstack/react-router";
import { NavigationMenuItem } from "../ui/navigation-menu";
import { Text } from "../ui/text";

interface MetadataRowProps {
  label: string;
  value: string;
  truncate?: boolean;
  to?: ComponentPropsWithoutRef<typeof Link>["to"];
}

function renderValue(value: string, truncate: boolean) {
  if (truncate) {
    return (
      <div className="min-w-0">
        <Text size="sm" tone="muted" className="truncate">{value}</Text>
      </div>
    );
  }
  return <Text size="sm" tone="muted">{value}</Text>;
}

export function MetadataRow({ label, value, truncate = false, to }: MetadataRowProps) {
  return (
    <NavigationMenuItem to={to}>
      <Text size="sm" tone="muted" className="shrink-0">{label}</Text>
      <div className="ml-auto overflow-hidden">
        {renderValue(value, truncate)}
      </div>
    </NavigationMenuItem>
  );
}
