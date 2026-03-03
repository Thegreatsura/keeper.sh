import { FC } from "react";
import { Check } from "lucide-react";
import { Lora } from "next/font/google";
import KeeperLogo from "@/assets/keeper.svg";
import { DashboardBackButton } from "@/components/dashboard-back-button";
import { Copy } from "@/components/copy";

const lora = Lora();

const features = [
  "Unlimited sync groups",
  "Unlimited calendar accounts",
  "Advanced sync rules",
  "Real-time sync",
  "Priority support",
];

const UpgradePage: FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <DashboardBackButton />

      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className={`${lora.className} text-xl font-medium tracking-tighter text-white`}>Pro</h2>
          <div className="flex items-baseline gap-0.5">
            <span className={`${lora.className} text-4xl font-medium tracking-tighter text-white`}>$5</span>
            <span className="text-sm text-neutral-500 tracking-tight">per month</span>
          </div>
          <Copy inverted className="mt-2">
            Support the project, and get access to extra features! Keeper Pro is for power users who want minutely syncs and unlimited calendars.
          </Copy>
        </div>

        <div className="flex flex-col gap-2.5">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-2.5">
              <Check className="text-neutral-500" size={15} />
              <span className="text-sm font-medium tracking-tight text-white">{feature}</span>
            </div>
          ))}
        </div>

        <button className="bg-white text-neutral-950 font-medium tracking-tighter rounded-xl px-4 py-2.5 w-full hover:brightness-90 active:brightness-80 cursor-pointer transition-all shadow-xs">
          Start Free Trial
        </button>
      </div>

      <KeeperLogo className="size-8 text-border self-center mt-8" />
    </div>
  );
};

export default UpgradePage;
