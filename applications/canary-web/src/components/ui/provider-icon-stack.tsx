import { AnimatePresence, motion } from "motion/react";
import { Text } from "./text";
import { ProviderIcon } from "./provider-icon";

interface ProviderIconStackProps {
  providers: { provider?: string; calendarType?: string }[];
  max?: number;
  animate?: boolean;
}

function ProviderIconStackItem({ provider, calendarType }: { provider?: string; calendarType?: string }) {
  return (
    <div className="size-6 rounded-full bg-background-elevated border border-border-elevated flex items-center justify-center">
      <ProviderIcon provider={provider} calendarType={calendarType} size={12} />
    </div>
  );
}

const HIDDEN = { opacity: 0, filter: "blur(4px)" };
const VISIBLE = { opacity: 1, filter: "blur(0)" };

function resolveInitial(animate: boolean) {
  if (animate) return HIDDEN;
  return false as const;
}

function ProviderIconStack({ providers, max = 4, animate = false }: ProviderIconStackProps) {
  const visible = providers.slice(0, max);
  const overflow = providers.length - max;
  const initial = resolveInitial(animate);

  return (
    <div className="relative">
      <div className="absolute right-0 inset-y-0 flex items-center *:not-last:-mr-2.5">
        <AnimatePresence>
          {visible.map((entry, index) => (
            <motion.div
              key={`${entry.provider}-${index}`}
              initial={initial}
              animate={VISIBLE}
              exit={HIDDEN}
            >
              <ProviderIconStackItem provider={entry.provider} calendarType={entry.calendarType} />
            </motion.div>
          ))}
          {overflow > 0 && (
            <motion.div
              key="overflow"
              initial={initial}
              animate={VISIBLE}
              exit={HIDDEN}
              className="size-6 rounded-full bg-background-elevated border border-border-elevated flex items-center justify-center"
            >
              <Text size="xs" tone="muted" className="tabular-nums text-[0.625rem]">+{overflow}</Text>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export { ProviderIconStack };
