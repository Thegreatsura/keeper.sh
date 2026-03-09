import {
  emitWideEvent,
  endTiming,
  initializeWideLogger,
  reportError,
  runWideEvent,
  setLogFields,
  shutdownLogging,
  startTiming,
} from "@keeper.sh/provider-core";

initializeWideLogger({
  service: process.env.SERVICE_NAME ?? process.env.npm_package_name ?? "keeper-cron",
});

export {
  emitWideEvent,
  endTiming,
  reportError,
  runWideEvent,
  setLogFields,
  shutdownLogging,
  startTiming,
};
