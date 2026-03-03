import type { FC } from "react";
import { ArrowLeft } from "lucide-react";
import { LinkButton } from "@/components/button";

type DashboardBackButtonProps = {
  href?: string;
};

const DashboardBackButton: FC<DashboardBackButtonProps> = ({ href = "/dashboard" }) => {
  return (
    <LinkButton href={href} variant="border" size="compact" className="aspect-square bg-surface-elevated">
      <ArrowLeft size={15} />
    </LinkButton>
  );
};

export { DashboardBackButton };
