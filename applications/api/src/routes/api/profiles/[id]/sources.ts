import { withAuth, withWideEvent } from "../../../../utils/middleware";
import { ErrorResponse } from "../../../../utils/responses";
import { setProfileSources } from "../../../../utils/sync-profiles";

export const PUT = withWideEvent(
  withAuth(async ({ request, params, userId }) => {
    const { id } = params;

    if (!id) {
      return ErrorResponse.badRequest("Profile ID is required").toResponse();
    }

    const body = (await request.json()) as { calendarIds?: string[] };

    if (!Array.isArray(body.calendarIds)) {
      return ErrorResponse.badRequest("calendarIds array is required").toResponse();
    }

    await setProfileSources(userId, id, body.calendarIds);
    return Response.json({ success: true });
  }),
);
