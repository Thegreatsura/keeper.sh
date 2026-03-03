import { FC } from "react";
import KeeperLogo from "@/assets/keeper.svg";
import { Heading4 } from "@/components/heading";
import { Copy } from "@/components/copy";
import { DashboardBackButton } from "@/components/dashboard-back-button";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

const CreateSyncGroupPage: FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <DashboardBackButton />

      <div className="px-1">
        <Heading4>Create Sync Group</Heading4>
        <Copy>Give your sync group a name to get started.</Copy>
      </div>

      <Input placeholder="Sync group name" />
      <Button className="w-full">Create Sync Group</Button>

      <KeeperLogo className="size-8 text-border self-center mt-8" />
    </div>
  );
};

export default CreateSyncGroupPage;
