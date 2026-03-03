import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import { BackButton } from "../../../../components/ui/back-button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuItemIcon,
  NavigationMenuItemLabel,
  NavigationMenuItemTrailing,
} from "../../../../components/ui/navigation-menu";

export const Route = createFileRoute("/(dashboard)/dashboard/connect/destination")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-1.5">
      <BackButton />
      <NavigationMenu>
        <NavigationMenuItem to="/dashboard/connect/google">
          <NavigationMenuItemIcon>
            <img src="/integrations/icon-google.svg" alt="" width={15} height={15} />
            <NavigationMenuItemLabel>Google Calendar</NavigationMenuItemLabel>
          </NavigationMenuItemIcon>
          <NavigationMenuItemTrailing />
        </NavigationMenuItem>
        <NavigationMenuItem to="/dashboard/connect/outlook">
          <NavigationMenuItemIcon>
            <img src="/integrations/icon-outlook.svg" alt="" width={15} height={15} />
            <NavigationMenuItemLabel>Outlook</NavigationMenuItemLabel>
          </NavigationMenuItemIcon>
          <NavigationMenuItemTrailing />
        </NavigationMenuItem>
        <NavigationMenuItem to="/dashboard/connect/microsoft">
          <NavigationMenuItemIcon>
            <img src="/integrations/icon-microsoft-365.svg" alt="" width={15} height={15} />
            <NavigationMenuItemLabel>Microsoft 365</NavigationMenuItemLabel>
          </NavigationMenuItemIcon>
          <NavigationMenuItemTrailing />
        </NavigationMenuItem>
      </NavigationMenu>
      <NavigationMenu>
        <NavigationMenuItem to="/dashboard/connect/caldav">
          <NavigationMenuItemIcon>
            <Calendar size={15} />
            <NavigationMenuItemLabel>CalDAV Server</NavigationMenuItemLabel>
          </NavigationMenuItemIcon>
          <NavigationMenuItemTrailing />
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  );
}
