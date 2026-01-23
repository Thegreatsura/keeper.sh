"use client";

import type { FC } from "react";
import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { AccountsPreview, AccountItem } from "@/compositions/connected-accounts/connected-accounts";
import { NavigationItemIcon, NavigationItemLabel, NavigationItemRightContent, NavigationMenu } from "./navigation-menu";
import { cn } from "@/utils/cn";

export type Account = {
  id: string;
  href: string;
  icon: string;
  name: string;
  email: string;
  eventCount: number;
  status?: 'synced' | 'syncing' | 'error';
};

type AccountsPopoverProps = {
  accounts: Account[];
};

const AccountsPopoverTriggerContent: FC = () => {
  return (
    <>
      <NavigationItemIcon>
        <User className="text-foreground-muted" size={15} />
        <NavigationItemLabel>Calendar Accounts</NavigationItemLabel>
      </NavigationItemIcon>
      <NavigationItemRightContent>
        <AccountsPreview />
      </NavigationItemRightContent>
    </>
  );
};

const AccountsPopover: FC<AccountsPopoverProps> = ({ accounts }) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const firstAccountLinkRef = useRef<HTMLAnchorElement>(null);
  const dummyTriggerRef = useRef<HTMLDivElement>(null);
  const dummyPopoverHeightRef = useRef<number>(0);

  const [isOpen, setOpen] = useState<boolean>(false);

  const handleToggle = () => {
    if (isOpen) {
      setOpen(false);
      triggerRef.current?.focus();
    } else {
      setOpen(true);
    }
  };

  // Measure dummy trigger height for morph animation
  useEffect(() => {
    const { current: dummyTrigger } = dummyTriggerRef;
    if (!dummyTrigger) return;

    const observer = new ResizeObserver((events) => {
      for (const event of events) {
        const { height } = event.contentRect;
        dummyPopoverHeightRef.current = height;
      }
    });

    observer.observe(dummyTrigger);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Focus first account when opened
  useEffect(() => {
    if (!isOpen || !firstAccountLinkRef.current) return;

    // Delay to allow animation to complete
    const timeout = setTimeout(() => {
      firstAccountLinkRef.current?.focus();
    }, 160);

    return () => clearTimeout(timeout);
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        popoverRef.current &&
        triggerRef.current &&
        !popoverRef.current.contains(target) &&
        !triggerRef.current.contains(target)
      ) {
        setTimeout(() => {
          setOpen(false);
          triggerRef.current?.focus();
        }, 0);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative grid grid-cols-1 grid-rows-1 *:col-start-1 *:row-start-1">
      <motion.div className="relative">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={popoverRef}
              id="accounts-popover-content"
              role="dialog"
              aria-label="Calendar Accounts"
              aria-modal="false"
              tabIndex={-1}
              className={
                cn(
                  "flex flex-col items-stretch justify-start shadow-xl border border-border -m-px bg-surface-elevated rounded-[0.875rem] absolute top-0 inset-x-0 overflow-hidden z-20 pointer-events-none",
                )
              }
              transition={{ duration: 0.16, height: { duration: 0.16 * 2 } }}
              style={{ transform: `translateY(calc(-50% + ${dummyPopoverHeightRef.current / 2}px))` }}
              initial={{ height: dummyPopoverHeightRef.current }}
              animate={{ height: 'auto' }}
              exit={{
                height: dummyPopoverHeightRef.current,
                transition: { duration: 0.16, height: { duration: 0.16 * 2 }, opacity: { delay: 0.16 * 3/2 } },
                opacity: 0,
              }}
            >
              <div className="relative">
                <NavigationMenu>
                  <motion.div
                    transition={{ duration: 0.16 }}
                    initial={{ opacity: 1, filter: 'none', height: 'auto' }}
                    animate={{ opacity: 0, filter: 'blur(4px)', height: 0, translateY: -dummyPopoverHeightRef.current }}
                    exit={{ opacity: 1, filter: 'none', height: 'auto', translateY: 0 }}
                  >
                    <div className="w-full rounded-[0.875rem] flex items-center justify-between p-3">
                      <AccountsPopoverTriggerContent />
                    </div>
                  </motion.div>
                  <motion.div
                    className="rounded-2xl p-0.5 pointer-events-auto"
                    transition={{ duration: 0.16 }}
                    initial={{ opacity: 0, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, filter: 'none' }}
                    exit={{ opacity: 0, filter: 'blur(8px)' }}
                  >
                    {accounts.map((account, index) => (
                      <AccountItem
                        key={account.id}
                        ref={index === 0 ? firstAccountLinkRef : undefined}
                        className="rounded-[0.6875rem]"
                        href={account.href}
                        icon={account.icon}
                        name={account.name}
                        email={account.email}
                        eventCount={account.eventCount}
                        status={account.status}
                      />
                    ))}
                  </motion.div>
                </NavigationMenu>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <div className="z-10" ref={dummyTriggerRef}>
        <button
          ref={triggerRef}
          type="button"
          onClick={handleToggle}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls="accounts-popover-content"
          className="w-full rounded-[0.875rem] flex items-center justify-between p-3 hover:bg-surface-muted cursor-pointer transition-colors focus-visible:outline-2 outline-offset-1 outline-border-emphasis"
        >
          <AccountsPopoverTriggerContent />
        </button>
      </div>
    </div>
  );
};

export { AccountsPopover };
