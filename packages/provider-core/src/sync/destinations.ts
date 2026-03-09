import type { SyncResult } from "../types";
import type { SyncContext, SyncCoordinator } from "./coordinator";
import { reportError } from "../utils/wide-logging";

const INITIAL_ADDED_COUNT = 0;
const INITIAL_ADD_FAILED_COUNT = 0;
const INITIAL_REMOVED_COUNT = 0;
const INITIAL_REMOVE_FAILED_COUNT = 0;

interface DestinationProvider {
  syncForUser(userId: string, context: SyncContext): Promise<SyncResult | null>;
}

const syncDestinationsForUser = async (
  userId: string,
  providers: DestinationProvider[],
  syncCoordinator: SyncCoordinator,
): Promise<SyncResult> => {
  const context = await syncCoordinator.startSync(userId);

  const settledResults = await Promise.allSettled(
    providers.map((provider) =>
      Promise.resolve().then(() => provider.syncForUser(userId, context)),
    ),
  );

  await syncCoordinator.isSyncCurrent(context);

  const combined: SyncResult = {
    addFailed: INITIAL_ADD_FAILED_COUNT,
    added: INITIAL_ADDED_COUNT,
    removeFailed: INITIAL_REMOVE_FAILED_COUNT,
    removed: INITIAL_REMOVED_COUNT,
  };

  for (const [providerIndex, settled] of settledResults.entries()) {
    if (settled.status === "rejected") {
      reportError(settled.reason, {
        "operation.name": "sync:destination-provider",
        "operation.type": "sync",
        "provider.index": providerIndex,
        "user.id": userId,
      });
      continue;
    }
    if (settled.value === null) {
      continue;
    }
    combined.added += settled.value.added;
    combined.addFailed += settled.value.addFailed;
    combined.removed += settled.value.removed;
    combined.removeFailed += settled.value.removeFailed;
  }

  return combined;
};

export { syncDestinationsForUser };
export type { DestinationProvider };
