import { FC } from "react";
import { List, SquarePen } from "lucide-react";
import KeeperLogo from "@/assets/keeper.svg";
import { DashboardBackButton } from "@/components/dashboard-back-button";
import {
  NavigationMenu,
  NavigationItem,
  NavigationItemIcon,
  NavigationItemLabel,
  NavigationItemRightContent,
} from "@/components/navigation-menu";
import { Copy } from "@/components/copy";
import { Heading4 } from "@/components/heading";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

const AddRulePage: FC<{ params: Promise<{ id: string }> }> = async ({ params }) => {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-2">
      <DashboardBackButton href={`/dashboard/sync-groups/${id}/rules`} />

      <div className="px-1">
        <Heading4>Add Rule</Heading4>
        <Copy>Create a new sync rule.</Copy>
      </div>

      <NavigationMenu className="bg-surface-elevated rounded-2xl shadow-xs border border-border overflow-hidden p-0.5">
        <NavigationItem>
          <NavigationItemIcon>
            <List className="text-foreground-muted" size={15} />
            <NavigationItemLabel>Rule type</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent>
            <Copy className="text-foreground-muted">Text filter</Copy>
          </NavigationItemRightContent>
        </NavigationItem>

        <NavigationItem>
          <NavigationItemIcon>
            <SquarePen className="text-foreground-muted" size={15} />
            <NavigationItemLabel>Condition</NavigationItemLabel>
          </NavigationItemIcon>
          <NavigationItemRightContent>
            <Copy className="text-foreground-muted">Exclude</Copy>
          </NavigationItemRightContent>
        </NavigationItem>
      </NavigationMenu>

      <Input placeholder="Text to match" />

      <Button className="w-full">Add Rule</Button>

      <KeeperLogo className="size-8 text-border self-center mt-8" />
    </div>
  );
};

export default AddRulePage;
