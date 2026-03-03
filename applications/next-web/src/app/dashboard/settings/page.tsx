import { FC } from "react";
import { Lock, KeyRound, Trash2 } from "lucide-react";
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

const AccountSettingsPage: FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <DashboardBackButton />

      <div className="px-1">
        <Heading4>Account Settings</Heading4>
        <Copy>Manage your account, security, and preferences.</Copy>
      </div>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        <NavigationItem>
          <NavigationItemIcon>
            <NavigationItemLabel>Email</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent>
            <Copy className="text-foreground-muted">alex@example.com</Copy>
          </NavigationItemRightContent>
        </NavigationItem>
      </NavigationMenu>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        <NavigationItem href="/dashboard/settings/change-password">
          <NavigationItemIcon>
            <Lock className="text-foreground-muted" size={15} />
            <NavigationItemLabel>Change password</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent />
        </NavigationItem>

        <NavigationItem href="/dashboard/settings/passkeys">
          <NavigationItemIcon>
            <KeyRound className="text-foreground-muted" size={15} />
            <NavigationItemLabel>Passkeys</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent>
            <Copy className="text-foreground-muted">1 passkey</Copy>
          </NavigationItemRightContent>
        </NavigationItem>
      </NavigationMenu>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        <NavigationItem href="/dashboard/settings/delete-account">
          <NavigationItemIcon>
            <Trash2 className="text-red-500" size={15} />
            <NavigationItemLabel className="text-red-500">Delete account</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent />
        </NavigationItem>
      </NavigationMenu>
    </div>
  );
};

export default AccountSettingsPage;
