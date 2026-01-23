"use client";

import type { FC, PropsWithChildren, Ref } from "react";
import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { tv } from "tailwind-variants";
import { AccountsPreview, AccountItem } from "@/compositions/connected-accounts/connected-accounts";
import { NavigationItem, NavigationItemIcon, NavigationItemLabel, NavigationItemRightContent, NavigationMenu } from "./navigation-menu";

const MORPH_DURATION = 2;
const CONTENT_TRANSITION_DURATION = 1;
const CONTENT_BLUR_AMOUNT = 8;
const STANDARD_EASING = [0.16, 0.85, 0.2, 1] as const;

const button = tv({
  base: "w-full rounded-[0.875rem] flex items-center justify-between p-3",
  variants: {
    type: {
      dummy: "col-start-1 row-start-1 invisible",
      morphTrigger: "col-start-1 row-start-1 cursor-pointer"
    }
  }
});

const morphContainer = tv({
  base: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 overflow-hidden border border-border bg-surface-elevated",
});

const popover = tv({
  base: "rounded-2xl overflow-hidden",
  variants: {
    type: {
      measurement: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none invisible",
    }
  }
});

type AccountsPopoverButtonContentProps = {
  isOpen?: boolean;
};

type AccountsPopoverTriggerProps = {
  onClick?: () => void;
  ref?: Ref<HTMLLIElement>
}

export const AccountsPopoverTrigger: FC<AccountsPopoverTriggerProps> = ({ onClick, ref }) => {
  return (
    <NavigationItem ref={ref} onClick={onClick}>
      <NavigationItemIcon>
        <User className="text-foreground-muted" size={15} />
        <NavigationItemLabel>Calendar Accounts</NavigationItemLabel>
      </NavigationItemIcon>
      <NavigationItemRightContent>
        <AccountsPreview />
      </NavigationItemRightContent>
    </NavigationItem>
  )
}

const AccountsPopover: FC<PropsWithChildren> = ({ children }) => {
  const dummyPopoverTriggerRef = useRef<HTMLLIElement>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const dummyPopoverHeightRef = useRef<number>(0);

  const handleOpen = () => {
    setOpen(true);
  }

  useEffect(() => {
    const { current: dummyPopoverTrigger } = dummyPopoverTriggerRef;
    if (!dummyPopoverTrigger) return;

    const observer = new ResizeObserver((events) => {
      for (const event of events) {
        const { height } = event.contentRect;
        dummyPopoverHeightRef.current = height;
        console.log({ height })
      }
    })

    observer.observe(dummyPopoverTrigger)

    return () => {
      observer.disconnect();
    }
  }, [])

  return (
    <div className="relative grid grid-cols-1 grid-rows-1 *:col-start-1 *:row-start-1">
      <motion.div className="relative">
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="flex flex-col items-stretch justify-start border border-border -m-px  bg-surface-elevated rounded-[0.875rem] shadow-xl absolute top-0 inset-x-0 overflow-hidden z-20"
                transition={{ duration: 0.16, height: { duration: 0.16 * 2 } }}
                style={{ transform: `translateY(calc(-50% + ${dummyPopoverHeightRef.current / 2}px))` }}
                initial={{ height: dummyPopoverHeightRef.current  }}
                animate={{ height: 'auto' }}
                exit={{ height: dummyPopoverHeightRef.current }}
              >
                <div className="relative">
                  <NavigationMenu>
                    <motion.div
                      transition={{ duration: 0.16 }}
                      initial={{ opacity: 1, filter: 'blur(0px)', height: 'auto' }}
                      animate={{ opacity: 0, filter: 'blur(4px)', height: 0, translateY: -dummyPopoverHeightRef.current }}
                    >
                      <AccountsPopoverTrigger onClick={handleOpen} />
                    </motion.div>
                    <motion.div
                      className="rounded-2xl p-0.5"
                      transition={{ duration: 0.16 }}
                      initial={{ opacity: 0, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                    >
                        <AccountItem className="rounded-[0.6875rem]" href="/dashboard/accounts/1" icon="/integrations/icon-google.svg" name="Personal" email="ridafkih@gmail.com" eventCount={142} status="synced" />
                        <AccountItem className="rounded-[0.6875rem]" href="/dashboard/accounts/2" icon="/integrations/icon-google.svg" name="Work" email="rida@ridafkih.dev" eventCount={89} status="error" />
                        <AccountItem className="rounded-[0.6875rem]" href="/dashboard/accounts/3" icon="/integrations/icon-icloud.svg" name="Family" email="rida@icloud.com" eventCount={23} status="syncing" />
                        <AccountItem className="rounded-[0.6875rem]" href="/dashboard/accounts/4" icon="/integrations/icon-fastmail.svg" name="Personal" email="rida@keeper.sh" eventCount={56} status="synced" />
                    </motion.div>
                  </NavigationMenu>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="z-10">
        <AccountsPopoverTrigger onClick={handleOpen} ref={dummyPopoverTriggerRef} />
      </div>
    </div>
  );
};

export { AccountsPopover };
