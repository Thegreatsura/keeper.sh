import { FC } from "react";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Copy } from "@/components/copy";
import { Heading4 } from "@/components/heading";
import { DashboardBackButton } from "@/components/dashboard-back-button";

const ChangePasswordPage: FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="px-1">
        <Heading4>Change Password</Heading4>
        <Copy>Update your account password.</Copy>
      </div>

      <Input type="password" defaultValue="currentpassword" placeholder="Current password" />
      <Input type="password" placeholder="New password" />
      <Input type="password" placeholder="Confirm new password" />

      <div className="flex items-center gap-2 mt-2">
        <DashboardBackButton href="/dashboard/settings" />
        <Button className="flex-1">Save password</Button>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
