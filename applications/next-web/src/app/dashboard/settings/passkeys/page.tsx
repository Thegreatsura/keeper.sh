import { FC } from "react";
import { KeyRound, Trash2, Plus } from "lucide-react";
import { Heading4 } from "@/components/heading";
import { DashboardBackButton } from "@/components/dashboard-back-button";
import {
  NavigationMenu,
  NavigationItem,
  NavigationItemIcon,
  NavigationItemLabel,
  NavigationItemRightContent,
} from "@/components/navigation-menu";
import { Copy } from "@/components/copy";

const PasskeysPage: FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <DashboardBackButton href="/dashboard/settings" />

      <div className="px-1">
        <Heading4>Passkeys</Heading4>
        <Copy>Manage passwordless authentication methods.</Copy>
      </div>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        <li className="rounded-[0.875rem] flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <KeyRound className="text-foreground-muted" size={15} />
            <Copy className="text-foreground-muted">MacBook Pro</Copy>
          </div>
          <div className="flex items-center gap-2">
            <Copy className="text-foreground-muted text-xs">Added Feb 14, 2026</Copy>
            <button className="p-1 hover:bg-surface-muted rounded-lg cursor-pointer">
              <Trash2 className="text-foreground-muted" size={15} />
            </button>
          </div>
        </li>

        <NavigationItem>
          <NavigationItemIcon>
            <Plus className="text-foreground-muted" size={15} />
            <NavigationItemLabel>Add Passkey</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent />
        </NavigationItem>
      </NavigationMenu>
    </div>
  );
};

export default PasskeysPage;
