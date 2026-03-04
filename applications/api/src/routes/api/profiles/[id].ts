import { withAuth, withWideEvent } from "../../../utils/middleware";
import { ErrorResponse } from "../../../utils/responses";
import { getProfile, updateProfile, deleteProfile } from "../../../utils/sync-profiles";

export const GET = withWideEvent(
  withAuth(async ({ params, userId }) => {
    const { id } = params;

    if (!id) {
      return ErrorResponse.badRequest("ID is required").toResponse();
    }

    const profile = await getProfile(userId, id);

    if (!profile) {
      return ErrorResponse.notFound().toResponse();
    }

    return Response.json(profile);
  }),
);

export const PATCH = withWideEvent(
  withAuth(async ({ request, params, userId }) => {
    const { id } = params;

    if (!id) {
      return ErrorResponse.badRequest("ID is required").toResponse();
    }

    const body = (await request.json()) as { name?: string };

    if (!body.name || typeof body.name !== "string") {
      return ErrorResponse.badRequest("Name is required").toResponse();
    }

    const updated = await updateProfile(userId, id, body.name);

    if (!updated) {
      return ErrorResponse.notFound().toResponse();
    }

    return Response.json({ success: true });
  }),
);

export const DELETE = withWideEvent(
  withAuth(async ({ params, userId }) => {
    const { id } = params;

    if (!id) {
      return ErrorResponse.badRequest("ID is required").toResponse();
    }

    const deleted = await deleteProfile(userId, id);

    if (!deleted) {
      return ErrorResponse.notFound().toResponse();
    }

    return Response.json({ success: true });
  }),
);
