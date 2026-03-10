import { entry } from "entrykit";
import { join } from "node:path";
import { getAllJobs } from "./utils/get-jobs";
import { injectJobs } from "./utils/inject-jobs";
import { registerJobs } from "./utils/register-jobs";
import { emitWideEvent, reportError, shutdownLogging } from "./utils/logging";
import env from "@keeper.sh/env/cron";

const jobsFolderPathname = join(import.meta.dirname, "jobs");

await entry({
  main: async () => {
    try {
      const jobs = await getAllJobs(jobsFolderPathname);
      const injectedJobs = injectJobs(jobs);
      registerJobs(injectedJobs);

      await emitWideEvent({
        "commercial.mode": env.COMMERCIAL_MODE ?? false,
        "database.url.configured": Boolean(env.DATABASE_URL),
        "operation.name": "cron:start",
        "operation.type": "lifecycle",
        "service.name": "cron",
        "job.count": injectedJobs.length,
      });

      return () => {
        shutdownLogging().catch((error) => {
          reportError(error, {
            "operation.name": "cron:shutdown",
            "operation.type": "lifecycle",
          });
        });
      };
    } catch (error) {
      reportError(error, {
        "operation.name": "cron:start",
        "operation.type": "lifecycle",
      });
      throw error;
    }
  },
  name: "cron",
});
