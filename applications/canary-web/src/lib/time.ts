const MINS_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const MINS_PER_DAY = MINS_PER_HOUR * HOURS_PER_DAY;

const getSuffixAndPrefix = (
  diffMins: number,
): { suffix: string; prefix: string } => {
  if (diffMins < 0) return { suffix: " ago", prefix: "" };
  if (diffMins > 0) return { suffix: "", prefix: "in " };
  return { suffix: "", prefix: "" };
};

export const formatTimeUntil = (date: Date): string => {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffMins = Math.round(diffMs / (1000 * 60));

  if (diffMins === 0) return "now";

  const absMins = Math.abs(diffMins);
  const { suffix, prefix } = getSuffixAndPrefix(diffMins);

  if (absMins < MINS_PER_HOUR) return `${prefix}${absMins}m${suffix}`;

  const hours = Math.floor(absMins / MINS_PER_HOUR);
  if (hours < 48) return `${prefix}${hours}h${suffix}`;

  const days = Math.floor(absMins / MINS_PER_DAY);
  return `${prefix}${days}d${suffix}`;
};

export const isEventPast = (endTime: Date): boolean =>
  endTime.getTime() < Date.now();

export const formatTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;

  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export const formatTimeRange = (start: Date, end: Date): string => {
  const startStr = formatTime(start);
  const endStr = formatTime(end);

  const startPeriod = start.getHours() >= 12 ? "PM" : "AM";
  const endPeriod = end.getHours() >= 12 ? "PM" : "AM";

  if (startPeriod === endPeriod) {
    return `${startStr.replace(` ${startPeriod}`, "")} – ${endStr}`;
  }

  return `${startStr} – ${endStr}`;
};

export const formatDayHeader = (date: Date): string => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};
