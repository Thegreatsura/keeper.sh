import { withAuth, withWideEvent } from "../../../../../utils/middleware";
import { ErrorResponse } from "../../../../../utils/responses";
import { verifyCalDAVSourceOwnership } from "../../../../../utils/caldav-sources";
import { getDestinationsForSource } from "../../../../../utils/source-destination-mappings";

const GET = withWideEvent(
  withAuth(async ({ params, userId }) => {
    const { id: sourceId } = params;

    if (!sourceId) {
      return ErrorResponse.badRequest("Source ID is required").toResponse();
    }

    const isOwner = await verifyCalDAVSourceOwnership(userId, sourceId);
    if (!isOwner) {
      return ErrorResponse.notFound().toResponse();
    }

    const destinationIds = await getDestinationsForSource(sourceId);
    return Response.json({ destinationIds });
  }),
);

export { GET };
