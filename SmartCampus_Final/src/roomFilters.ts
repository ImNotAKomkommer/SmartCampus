import type { Room, RoomRequirements } from "./types";

/** F1/F2: all equipment items are required; exact capacity is sufficient. */
export function filterRooms(rooms: readonly Room[], requirements: RoomRequirements): Room[] {
  if (!Number.isInteger(requirements.attendees) || requirements.attendees < 1) return [];
  return rooms.filter((room) =>
    room.capacity >= requirements.attendees &&
    requirements.equipment.every((item) => room.equipment.includes(item))
  );
}
