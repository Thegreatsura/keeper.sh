import {
  emitWideEvent,
  getCurrentRequestId,
  reportError,
  runWideEvent,
  setLogFields,
} from "./logging";

type BackgroundJobCallback<TResult> = () => Promise<TResult>;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getParentFields = (): Record<`parent.${string}`, string> => {
  const parentRequestId = getCurrentRequestId() ?? "";

  if (typeof parentRequestId !== "string") {
    return {};
  }

  return {
    "parent.request.id": parentRequestId,
  };
};

const spawnBackgroundJob = <TResult>(
  jobName: string,
  fields: Record<string, unknown>,
  callback: BackgroundJobCallback<TResult>,
): void => {
  const parentFields = getParentFields();
  emitWideEvent({
    "operation.name": `${jobName}:spawn`,
    "operation.type": "job-spawn",
    "job.name": jobName,
    ...parentFields,
    ...fields,
  }).catch((error) => {
    reportError(error, {
      "job.name": jobName,
      "operation.name": `${jobName}:spawn`,
      "operation.type": "job-spawn",
    });
  });

  runWideEvent(
    {
      "operation.name": jobName,
      "operation.type": "background-job",
      "job.name": jobName,
      ...parentFields,
      ...fields,
    },
    async () => {
      const result = await callback();
      if (isRecord(result)) {
        setLogFields(result);
      }
    },
  ).catch((error) => {
    reportError(error, {
      "job.name": jobName,
      "operation.name": jobName,
      "operation.type": "background-job",
    });
  });
};

export { spawnBackgroundJob };
