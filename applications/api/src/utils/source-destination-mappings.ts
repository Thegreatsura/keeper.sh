import {
  calendarsTable,
  sourceDestinationMappingsTable,
} from "@keeper.sh/database/schema";
import { and, eq, inArray } from "drizzle-orm";
import { database } from "../context";

const EMPTY_LIST_COUNT = 0;

interface SourceDestinationMapping {
  id: string;
  sourceCalendarId: string;
  destinationCalendarId: string;
  profileId: string;
  createdAt: Date;
  calendarType: string;
}

const getUserMappings = async (userId: string): Promise<SourceDestinationMapping[]> => {
  const userSourceCalendars = await database
    .select({
      calendarType: calendarsTable.calendarType,
      id: calendarsTable.id,
    })
    .from(calendarsTable)
    .where(
      and(
        eq(calendarsTable.userId, userId),
        inArray(calendarsTable.id,
          database.selectDistinct({ id: sourceDestinationMappingsTable.sourceCalendarId })
            .from(sourceDestinationMappingsTable)
        ),
      ),
    );

  if (userSourceCalendars.length === EMPTY_LIST_COUNT) {
    return [];
  }

  const calendarIds = userSourceCalendars.map((calendar) => calendar.id);
  const typeMap = new Map(userSourceCalendars.map((calendar) => [calendar.id, calendar.calendarType]));

  const mappings = await database
    .select()
    .from(sourceDestinationMappingsTable)
    .where(inArray(sourceDestinationMappingsTable.sourceCalendarId, calendarIds));

  return mappings.map((mapping) => ({
    ...mapping,
    calendarType: typeMap.get(mapping.sourceCalendarId) ?? "unknown",
  }));
};

const getDestinationsForSource = async (sourceCalendarId: string): Promise<string[]> => {
  const mappings = await database
    .select({ destinationCalendarId: sourceDestinationMappingsTable.destinationCalendarId })
    .from(sourceDestinationMappingsTable)
    .where(eq(sourceDestinationMappingsTable.sourceCalendarId, sourceCalendarId));

  return mappings.map((mapping) => mapping.destinationCalendarId);
};

export {
  getUserMappings,
  getDestinationsForSource,
};
