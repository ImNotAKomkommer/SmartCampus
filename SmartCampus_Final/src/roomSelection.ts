import type { Room } from "./types";

/** F5: preserve selection if eligible, else pick first matching room (or null). */
export function chooseRoomId(matchingRooms: readonly Room[], preferredId: string | null): string | null {
  return matchingRooms.some((room) => room.id === preferredId)
    ? preferredId
    : matchingRooms[0]?.id ?? null;
}
