import { calendarSourcesTable } from "@keeper.sh/database/schema";
import { and, eq } from "drizzle-orm";
import { withAuth, withWideEvent } from "../../../utils/middleware";
import { ErrorResponse } from "../../../utils/responses";
import { database } from "../../../context";
import { deleteSource as deleteIcsSource } from "../../../utils/sources";
import { deleteOAuthSource } from "../../../utils/oauth-sources";
import { deleteCalDAVSource } from "../../../utils/caldav-sources";

export const GET = withWideEvent(
  withAuth(async ({ params, userId }) => {
    const { id } = params;

    if (!id) {
      return ErrorResponse.badRequest("ID is required").toResponse();
    }

    const [source] = await database
      .select({
        id: calendarSourcesTable.id,
        name: calendarSourcesTable.name,
        sourceType: calendarSourcesTable.sourceType,
        provider: calendarSourcesTable.provider,
        url: calendarSourcesTable.url,
        calendarUrl: calendarSourcesTable.calendarUrl,
        excludeWorkingLocation: calendarSourcesTable.excludeWorkingLocation,
        excludeFocusTime: calendarSourcesTable.excludeFocusTime,
        excludeOutOfOffice: calendarSourcesTable.excludeOutOfOffice,
        createdAt: calendarSourcesTable.createdAt,
        updatedAt: calendarSourcesTable.updatedAt,
      })
      .from(calendarSourcesTable)
      .where(
        and(
          eq(calendarSourcesTable.id, id),
          eq(calendarSourcesTable.userId, userId),
        ),
      )
      .limit(1);

    if (!source) {
      return ErrorResponse.notFound().toResponse();
    }

    return Response.json(source);
  }),
);

export const PATCH = withWideEvent(
  withAuth(async ({ request, params, userId }) => {
    const { id } = params;

    if (!id) {
      return ErrorResponse.badRequest("ID is required").toResponse();
    }

    const body = (await request.json()) as { name?: string };
    const { name } = body;

    if (!name || typeof name !== "string") {
      return ErrorResponse.badRequest("Name is required").toResponse();
    }

    const [updated] = await database
      .update(calendarSourcesTable)
      .set({ name })
      .where(
        and(
          eq(calendarSourcesTable.id, id),
          eq(calendarSourcesTable.userId, userId),
        ),
      )
      .returning();

    if (!updated) {
      return ErrorResponse.notFound().toResponse();
    }

    return Response.json(updated);
  }),
);

const sourceTypeDeleters: Record<string, (userId: string, sourceId: string) => Promise<boolean>> = {
  ical: deleteIcsSource,
  oauth: deleteOAuthSource,
  caldav: deleteCalDAVSource,
};

export const DELETE = withWideEvent(
  withAuth(async ({ params, userId }) => {
    const { id } = params;

    if (!id) {
      return ErrorResponse.badRequest("ID is required").toResponse();
    }

    const [source] = await database
      .select({ sourceType: calendarSourcesTable.sourceType })
      .from(calendarSourcesTable)
      .where(
        and(
          eq(calendarSourcesTable.id, id),
          eq(calendarSourcesTable.userId, userId),
        ),
      )
      .limit(1);

    if (!source) {
      return ErrorResponse.notFound().toResponse();
    }

    const deleter = sourceTypeDeleters[source.sourceType];

    if (!deleter) {
      return ErrorResponse.badRequest("Unknown source type").toResponse();
    }

    await deleter(userId, id);

    return Response.json({ success: true });
  }),
);
