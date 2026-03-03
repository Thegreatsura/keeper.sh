import { FC } from "react";
import { DashboardBackButton } from "@/components/dashboard-back-button";
import { Heading4 } from "@/components/heading";
import { Copy } from "@/components/copy";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

const DeleteAccountPage: FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <DashboardBackButton href="/dashboard/settings" />

      <div className="px-1">
        <Heading4>Are you sure?</Heading4>
      </div>
      <Copy className="px-1">
        This will permanently delete your account, disconnect all calendar accounts, and remove all synced events. This action cannot be undone.
      </Copy>

      <Input type="password" placeholder="Enter your password to confirm" />

      <Button variant="destructive" className="w-full">
        Delete my account
      </Button>
    </div>
  );
};

export default DeleteAccountPage;
