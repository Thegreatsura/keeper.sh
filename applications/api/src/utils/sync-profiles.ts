import {
  calendarsTable,
  sourceDestinationMappingsTable,
  syncProfilesTable,
  syncStatusTable,
} from "@keeper.sh/database/schema";
import { and, eq, inArray, notInArray } from "drizzle-orm";
import { database } from "../context";

interface SyncProfile {
  id: string;
  name: string;
  sources: string[];
  destinations: string[];
  createdAt: Date;
}

const getUserProfiles = async (userId: string): Promise<SyncProfile[]> => {
  const profiles = await database
    .select()
    .from(syncProfilesTable)
    .where(eq(syncProfilesTable.userId, userId));

  if (profiles.length === 0) return [];

  const profileIds = profiles.map((profile) => profile.id);

  const mappings = await database
    .select({
      destinationCalendarId: sourceDestinationMappingsTable.destinationCalendarId,
      profileId: sourceDestinationMappingsTable.profileId,
      sourceCalendarId: sourceDestinationMappingsTable.sourceCalendarId,
    })
    .from(sourceDestinationMappingsTable)
    .where(inArray(sourceDestinationMappingsTable.profileId, profileIds));

  const profileMappings = new Map<string, { sources: Set<string>; destinations: Set<string> }>();

  for (const mapping of mappings) {
    if (!profileMappings.has(mapping.profileId)) {
      profileMappings.set(mapping.profileId, { sources: new Set(), destinations: new Set() });
    }
    const entry = profileMappings.get(mapping.profileId)!;
    entry.sources.add(mapping.sourceCalendarId);
    entry.destinations.add(mapping.destinationCalendarId);
  }

  return profiles.map((profile) => {
    const entry = profileMappings.get(profile.id);
    return {
      createdAt: profile.createdAt,
      destinations: entry ? [...entry.destinations] : [],
      id: profile.id,
      name: profile.name,
      sources: entry ? [...entry.sources] : [],
    };
  });
};

const getProfile = async (userId: string, profileId: string): Promise<SyncProfile | undefined> => {
  const [profile] = await database
    .select()
    .from(syncProfilesTable)
    .where(and(eq(syncProfilesTable.id, profileId), eq(syncProfilesTable.userId, userId)))
    .limit(1);

  if (!profile) return undefined;

  const mappings = await database
    .select({
      destinationCalendarId: sourceDestinationMappingsTable.destinationCalendarId,
      sourceCalendarId: sourceDestinationMappingsTable.sourceCalendarId,
    })
    .from(sourceDestinationMappingsTable)
    .where(eq(sourceDestinationMappingsTable.profileId, profileId));

  const sources = [...new Set(mappings.map((mapping) => mapping.sourceCalendarId))];
  const destinations = [...new Set(mappings.map((mapping) => mapping.destinationCalendarId))];

  return {
    createdAt: profile.createdAt,
    destinations,
    id: profile.id,
    name: profile.name,
    sources,
  };
};

const createProfile = async (userId: string, name: string): Promise<{ id: string }> => {
  const [profile] = await database
    .insert(syncProfilesTable)
    .values({ name, userId })
    .returning({ id: syncProfilesTable.id });

  if (!profile) {
    throw new Error("Failed to create sync profile");
  }

  return profile;
};

const updateProfile = async (userId: string, profileId: string, name: string): Promise<boolean> => {
  const [updated] = await database
    .update(syncProfilesTable)
    .set({ name })
    .where(and(eq(syncProfilesTable.id, profileId), eq(syncProfilesTable.userId, userId)))
    .returning({ id: syncProfilesTable.id });

  return Boolean(updated);
};

const deleteProfile = async (userId: string, profileId: string): Promise<boolean> => {
  const [deleted] = await database
    .delete(syncProfilesTable)
    .where(and(eq(syncProfilesTable.id, profileId), eq(syncProfilesTable.userId, userId)))
    .returning({ id: syncProfilesTable.id });

  return Boolean(deleted);
};

const setProfileSources = async (
  userId: string,
  profileId: string,
  calendarIds: string[],
): Promise<void> => {
  // Verify profile ownership
  const [profile] = await database
    .select({ id: syncProfilesTable.id })
    .from(syncProfilesTable)
    .where(and(eq(syncProfilesTable.id, profileId), eq(syncProfilesTable.userId, userId)))
    .limit(1);

  if (!profile) throw new Error("Profile not found");

  // Verify all calendar IDs belong to the user
  const validCalendars = await database
    .select({ id: calendarsTable.id })
    .from(calendarsTable)
    .where(and(eq(calendarsTable.userId, userId), inArray(calendarsTable.id, calendarIds.length > 0 ? calendarIds : ["__none__"])));

  const validIds = new Set(validCalendars.map((calendar) => calendar.id));
  const filteredCalendarIds = calendarIds.filter((id) => validIds.has(id));

  // Get current mappings for this profile
  const currentMappings = await database
    .select({
      destinationCalendarId: sourceDestinationMappingsTable.destinationCalendarId,
      id: sourceDestinationMappingsTable.id,
      sourceCalendarId: sourceDestinationMappingsTable.sourceCalendarId,
    })
    .from(sourceDestinationMappingsTable)
    .where(eq(sourceDestinationMappingsTable.profileId, profileId));

  const currentDestinationIds = [...new Set(currentMappings.map((mapping) => mapping.destinationCalendarId))];
  const currentSourceIds = new Set(currentMappings.map((mapping) => mapping.sourceCalendarId));

  // Delete mappings for sources being removed
  const sourcesToRemove = [...currentSourceIds].filter((id) => !filteredCalendarIds.includes(id));
  if (sourcesToRemove.length > 0) {
    await database
      .delete(sourceDestinationMappingsTable)
      .where(
        and(
          eq(sourceDestinationMappingsTable.profileId, profileId),
          inArray(sourceDestinationMappingsTable.sourceCalendarId, sourcesToRemove),
        ),
      );
  }

  // Create mappings for new sources (cross-product with existing destinations)
  const sourcesToAdd = filteredCalendarIds.filter((id) => !currentSourceIds.has(id));
  if (sourcesToAdd.length > 0 && currentDestinationIds.length > 0) {
    const newMappings = sourcesToAdd.flatMap((sourceCalendarId) =>
      currentDestinationIds.map((destinationCalendarId) => ({
        destinationCalendarId,
        profileId,
        sourceCalendarId,
      })),
    );

    await database
      .insert(sourceDestinationMappingsTable)
      .values(newMappings)
      .onConflictDoNothing();
  }
};

const setProfileDestinations = async (
  userId: string,
  profileId: string,
  calendarIds: string[],
): Promise<void> => {
  // Verify profile ownership
  const [profile] = await database
    .select({ id: syncProfilesTable.id })
    .from(syncProfilesTable)
    .where(and(eq(syncProfilesTable.id, profileId), eq(syncProfilesTable.userId, userId)))
    .limit(1);

  if (!profile) throw new Error("Profile not found");

  // Verify all calendar IDs belong to the user
  const validCalendars = await database
    .select({ id: calendarsTable.id })
    .from(calendarsTable)
    .where(and(eq(calendarsTable.userId, userId), inArray(calendarsTable.id, calendarIds.length > 0 ? calendarIds : ["__none__"])));

  const validIds = new Set(validCalendars.map((calendar) => calendar.id));
  const filteredCalendarIds = calendarIds.filter((id) => validIds.has(id));

  // Get current mappings for this profile
  const currentMappings = await database
    .select({
      destinationCalendarId: sourceDestinationMappingsTable.destinationCalendarId,
      id: sourceDestinationMappingsTable.id,
      sourceCalendarId: sourceDestinationMappingsTable.sourceCalendarId,
    })
    .from(sourceDestinationMappingsTable)
    .where(eq(sourceDestinationMappingsTable.profileId, profileId));

  const currentSourceIds = [...new Set(currentMappings.map((mapping) => mapping.sourceCalendarId))];
  const currentDestinationIds = new Set(currentMappings.map((mapping) => mapping.destinationCalendarId));

  // Delete mappings for destinations being removed
  const destinationsToRemove = [...currentDestinationIds].filter((id) => !filteredCalendarIds.includes(id));
  if (destinationsToRemove.length > 0) {
    await database
      .delete(sourceDestinationMappingsTable)
      .where(
        and(
          eq(sourceDestinationMappingsTable.profileId, profileId),
          inArray(sourceDestinationMappingsTable.destinationCalendarId, destinationsToRemove),
        ),
      );
  }

  // Create mappings for new destinations (cross-product with existing sources)
  const destinationsToAdd = filteredCalendarIds.filter((id) => !currentDestinationIds.has(id));
  if (destinationsToAdd.length > 0 && currentSourceIds.length > 0) {
    const newMappings = destinationsToAdd.flatMap((destinationCalendarId) =>
      currentSourceIds.map((sourceCalendarId) => ({
        destinationCalendarId,
        profileId,
        sourceCalendarId,
      })),
    );

    await database
      .insert(sourceDestinationMappingsTable)
      .values(newMappings)
      .onConflictDoNothing();
  }

  // Initialize sync status for new destinations
  for (const destinationId of destinationsToAdd) {
    await database
      .insert(syncStatusTable)
      .values({ calendarId: destinationId })
      .onConflictDoNothing();
  }
};

export {
  getUserProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  setProfileSources,
  setProfileDestinations,
};
