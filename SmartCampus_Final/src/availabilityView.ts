import type { Booking, CheckResult, Room } from "./types";
import { checkAvailability } from "./availability";

export type RoomAvailabilityView = {
  room: Room | null;
  roomBookings: Booking[];
  result: CheckResult | null;
};

/** Integration boundary: selection -> room-specific bookings -> availability result. */
export function getRoomAvailabilityView(
  rooms: readonly Room[], bookings: readonly Booking[], selectedId: string | null,
  start: number | null, end: number | null, now: number
): RoomAvailabilityView {
  const room = rooms.find((r) => r.id === selectedId) ?? null;
  if (!room) return { room: null, roomBookings: [], result: null };
  const roomBookings = bookings.filter((booking) => booking.roomId === room.id);
  const result = start === null || end === null
    ? null
    : checkAvailability(room, bookings, start, end, now);
  return { room, roomBookings, result };
}
