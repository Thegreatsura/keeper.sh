import {
  emitWideEvent,
  endTiming,
  getCurrentRequestId,
  incrementLogCount,
  initializeWideLogger,
  reportError as reportWideError,
  runWideEvent,
  setLogFields,
  shutdownLogging,
  startTiming,
} from "@keeper.sh/provider-core";

initializeWideLogger({
  service: process.env.SERVICE_NAME ?? process.env.npm_package_name ?? "keeper-api",
});

const reportError = (error: unknown, fields: Record<string, unknown> = {}): void => {
  reportWideError(error, fields);
};

const trackStatusError = (status: number, errorType: string): void => {
  const statusMessage = `HTTP ${status}`;
  incrementLogCount("error.count");
  incrementLogCount(`error.${errorType}.count`);
  setLogFields({
    [`error.${errorType}.messages`]: [statusMessage],
    "error.message": statusMessage,
    "error.occurred": true,
    "error.type": errorType,
  });
};

const respondWithLoggedError = (error: unknown, response: Response): Response => {
  reportError(error, { "http.status_code": response.status });
  return response;
};

export {
  emitWideEvent,
  endTiming,
  getCurrentRequestId,
  incrementLogCount,
  reportError,
  trackStatusError,
  respondWithLoggedError,
  runWideEvent,
  setLogFields,
  shutdownLogging,
  startTiming,
};
