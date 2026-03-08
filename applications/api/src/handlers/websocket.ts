import { syncStatusTable, calendarsTable, sourceDestinationMappingsTable } from "@keeper.sh/database/schema";
import { createWebsocketHandler } from "@keeper.sh/broadcast";
import type { Socket } from "@keeper.sh/broadcast";
import { syncAggregateSchema } from "@keeper.sh/data-schemas";
import { and, eq, inArray, max } from "drizzle-orm";
import { database, getCachedSyncAggregate, getCurrentSyncAggregate } from "../context";

const INITIAL_COUNT = 0;
const COMPLETE_PERCENT = 100;

const resolvePayload = async (
  userId: string,
  fallback: {
    progressPercent: number;
    syncEventsProcessed: number;
    syncEventsRemaining: number;
    syncEventsTotal: number;
    lastSyncedAt: string | null;
  },
) => {
  const current = getCurrentSyncAggregate(userId, fallback);
  const hasLiveCurrent = current.syncing || current.syncEventsRemaining > INITIAL_COUNT;
  if (hasLiveCurrent) {
    return current;
  }

  const cached = await getCachedSyncAggregate(userId);
  if (!cached || !syncAggregateSchema.allows(cached)) {
    return current;
  }

  return {
    ...cached,
    ...(cached.lastSyncedAt === undefined && { lastSyncedAt: fallback.lastSyncedAt }),
  };
};

const sendInitialSyncStatus = async (userId: string, socket: Socket): Promise<void> => {
  const [aggregate] = await database
    .select({
      lastSyncedAt: max(syncStatusTable.lastSyncedAt),
    })
    .from(syncStatusTable)
    .innerJoin(
      calendarsTable,
      eq(syncStatusTable.calendarId, calendarsTable.id),
    )
    .where(
      and(
        eq(calendarsTable.userId, userId),
        inArray(calendarsTable.id,
          database.selectDistinct({ id: sourceDestinationMappingsTable.destinationCalendarId })
            .from(sourceDestinationMappingsTable)
        ),
      ),
    );

  const payload = await resolvePayload(userId, {
    lastSyncedAt: aggregate?.lastSyncedAt?.toISOString() ?? null,
    progressPercent: COMPLETE_PERCENT,
    syncEventsProcessed: INITIAL_COUNT,
    syncEventsRemaining: INITIAL_COUNT,
    syncEventsTotal: INITIAL_COUNT,
  });

  socket.send(
    JSON.stringify({
      data: payload,
      event: "sync:aggregate",
    }),
  );
};

const websocketHandler = createWebsocketHandler({
  onConnect: sendInitialSyncStatus,
});

export { websocketHandler };
