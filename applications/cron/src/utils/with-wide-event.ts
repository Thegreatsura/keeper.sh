import type { CronOptions } from "cronbake";
import { runWideEvent, setLogFields } from "./logging";

const withCronWideEvent = (options: CronOptions): CronOptions => {
  const { callback, ...restOptions } = options;
  return {
    ...restOptions,
    callback: async () => {
      await runWideEvent({
        "operation.type": "job",
        "operation.name": options.name,
        "job.name": options.name,
      }, async () => {
        await callback();
      });
    },
  };
};

const setCronEventFields = (fields: Record<string, unknown>): void => {
  setLogFields(fields);
};

export { withCronWideEvent, setCronEventFields };
