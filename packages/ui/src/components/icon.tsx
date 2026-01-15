import type { FC, ComponentType } from "react";
import { ICON_SIZES } from "../tokens/layout";
import { cn } from "../utils/cn";

type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface IconProps {
  icon: ComponentType<{ size?: number; className?: string }>;
  size?: IconSize;
  className?: string;
}

/**
 * Standardized icon wrapper component
 * Provides consistent sizing across the UI
 *
 * @example
 * <Icon icon={Calendar} size="md" />
 * <Icon icon={User} size="lg" className="text-blue-500" />
 */
const Icon: FC<IconProps> = ({ icon: IconComponent, size = "md", className }) => {
  const iconSize = ICON_SIZES[size];

  return <IconComponent size={iconSize} className={cn(className)} />;
};

Icon.displayName = "Icon";

export { Icon };
export type { IconSize, IconProps };
