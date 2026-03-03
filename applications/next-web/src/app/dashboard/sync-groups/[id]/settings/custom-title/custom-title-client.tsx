"use client";

import { FC, useState } from "react";
import KeeperLogo from "@/assets/keeper.svg";
import { DashboardBackButton } from "@/components/dashboard-back-button";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Copy } from "@/components/copy";
import { Heading4 } from "@/components/heading";

const variables = [
  { name: "{{title}}", description: "Original event title" },
  { name: "{{calendar}}", description: "Calendar name" },
  { name: "{{account}}", description: "Account email" },
  { name: "{{status}}", description: "Busy, Free, etc." },
];

export const CustomTitleClient: FC<{ id: string }> = ({ id }) => {
  const [template, setTemplate] = useState("Busy — {{title}}");

  const preview = template
    .replace("{{title}}", "Team Standup")
    .replace("{{calendar}}", "Work")
    .replace("{{account}}", "ridafkih@gmail.com")
    .replace("{{status}}", "busy");

  return (
    <div className="flex flex-col gap-2">
      <DashboardBackButton href={`/dashboard/sync-groups/${id}/settings`} />

      <div className="px-1">
        <Heading4>Custom Title</Heading4>
        <Copy>Set a template for synced event titles.</Copy>
      </div>

      <Input
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
      />

      <div className="flex flex-col gap-1.5 px-1">
        <Copy className="text-foreground-muted text-xs">Preview</Copy>
        <div className="rounded-xl border border-border p-3">
          <Copy className="text-foreground">{preview}</Copy>
        </div>
      </div>

      <div className="flex flex-col gap-1 px-1 mt-2">
        <Copy className="text-foreground-muted text-xs">Variables</Copy>
        {variables.map((v) => (
          <div key={v.name} className="flex items-baseline gap-2">
            <code className="text-sm text-foreground-muted shrink-0" style={{ fontFamily: "'Geist Mono', monospace" }}>{v.name}</code>
            <Copy className="text-foreground-muted text-xs">{v.description}</Copy>
          </div>
        ))}
      </div>

      <Button className="w-full mt-2">Save</Button>

      <KeeperLogo className="size-8 text-border self-center mt-8" />
    </div>
  );
};
