import env from "@keeper.sh/env/cron";
import { createDatabase } from "@keeper.sh/database";
import { syncStatusTable } from "@keeper.sh/database/schema";
import { createRedis } from "@keeper.sh/redis";
import { createPremiumService } from "@keeper.sh/premium";
import { createBroadcastService } from "@keeper.sh/broadcast";
import { SYNC_TTL_SECONDS } from "@keeper.sh/constants";
import {
  createSyncCoordinator,
  createOAuthProviders,
  buildOAuthConfigs,
  SyncAggregateTracker,
} from "@keeper.sh/provider-core";
import { createDestinationProviders } from "@keeper.sh/provider-registry/server";
import type {
  DestinationSyncResult,
  SyncProgressUpdate,
  SyncAggregateMessage,
} from "@keeper.sh/provider-core";
import { Polar } from "@polar-sh/sdk";

const SYNC_AGGREGATE_LATEST_KEY_PREFIX = "sync:aggregate:latest:";
const SYNC_AGGREGATE_SEQUENCE_KEY_PREFIX = "sync:aggregate:seq:";

const database = createDatabase(env.DATABASE_URL);
const redis = createRedis(env.REDIS_URL);
const broadcastService = createBroadcastService({ redis });

const premiumService = createPremiumService({
  commercialMode: env.COMMERCIAL_MODE ?? false,
  database,
});

const oauthConfigs = buildOAuthConfigs(env);
const oauthProviders = createOAuthProviders(oauthConfigs);

const destinationProviders = createDestinationProviders({
  database,
  encryptionKey: env.ENCRYPTION_KEY,
  oauthProviders,
});

const syncAggregateTracker = new SyncAggregateTracker();

const getSyncAggregateLatestKey = (userId: string): string =>
  `${SYNC_AGGREGATE_LATEST_KEY_PREFIX}${userId}`;

const getSyncAggregateSequenceKey = (userId: string): string =>
  `${SYNC_AGGREGATE_SEQUENCE_KEY_PREFIX}${userId}`;

const emitSyncAggregate = async (
  userId: string,
  aggregate: SyncAggregateMessage,
): Promise<void> => {
  try {
    const sequenceKey = getSyncAggregateSequenceKey(userId);
    const seq = await redis.incr(sequenceKey);
    await redis.expire(sequenceKey, SYNC_TTL_SECONDS);

    const payload: SyncAggregateMessage = { ...aggregate, seq };

    const latestKey = getSyncAggregateLatestKey(userId);
    await redis.set(latestKey, JSON.stringify(payload));
    await redis.expire(latestKey, SYNC_TTL_SECONDS);

    broadcastService.emit(userId, "sync:aggregate", payload);
  } catch {
    broadcastService.emit(userId, "sync:aggregate", aggregate);
  }
};

const onDestinationSync = async (result: DestinationSyncResult): Promise<void> => {
  if (result.broadcast === false) {
    return;
  }

  const now = new Date();
  const lastSyncedAt = now.toISOString();

  await database
    .insert(syncStatusTable)
    .values({
      calendarId: result.calendarId,
      lastSyncedAt: now,
      localEventCount: result.localEventCount,
      remoteEventCount: result.remoteEventCount,
    })
    .onConflictDoUpdate({
      set: {
        lastSyncedAt: now,
        localEventCount: result.localEventCount,
        remoteEventCount: result.remoteEventCount,
      },
      target: [syncStatusTable.calendarId],
    });

  const aggregate = syncAggregateTracker.trackDestinationSync(result, lastSyncedAt);
  if (aggregate) {
    await emitSyncAggregate(result.userId, aggregate);
  }
};

const onSyncProgress = (update: SyncProgressUpdate): void => {
  const aggregate = syncAggregateTracker.trackProgress(update);
  if (aggregate) {
    void emitSyncAggregate(update.userId, aggregate);
  }
};

const syncCoordinator = createSyncCoordinator({
  onDestinationSync,
  onSyncProgress,
  redis,
});

const createPolarClient = (): Polar | null => {
  if (env.POLAR_ACCESS_TOKEN && env.POLAR_MODE) {
    return new Polar({
      accessToken: env.POLAR_ACCESS_TOKEN,
      server: env.POLAR_MODE,
    });
  }
  return null;
};

const polarClient = createPolarClient();

export { database, premiumService, destinationProviders, syncCoordinator, polarClient };
