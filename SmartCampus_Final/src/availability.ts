import type { Booking, CheckResult, Room } from "./types";

const MINUTES_PER_DAY = 24 * 60;
const MAX_BOOKING_DURATION = 120;

export function minutesToLabel(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function timeToMinutes(time: string): number | null {
  const match = /^(\d{2}):(\d{2})$/.exec(time);
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (h < 0 || h > 23 || m < 0 || m > 59) return null;
  return h * 60 + m;
}

export function checkAvailability(
  room: Room,
  bookings: readonly Booking[],
  start: number,
  end: number,
  currentTime: number
): CheckResult {
  // AC1: 0 <= start < end <= 1440 and start strictly after current time
  if (!(start >= 0 && start < end && end <= MINUTES_PER_DAY)) {
    return {
      status: "unavailable",
      reason: "Invalid interval. The start must be earlier than the end, and both must fall within 00:00–24:00.",
    };
  }
  if (start <= currentTime) {
    return {
      status: "unavailable",
      reason: "The start time must be later than the current time.",
    };
  }

  // AC2: no booking longer than 120 minutes
  if (end - start > MAX_BOOKING_DURATION) {
    return {
      status: "unavailable",
      reason: "Bookings cannot be longer than 120 minutes.",
    };
  }

  // AC3: blocked room
  if (room.blocked) {
    return {
      status: "unavailable",
      reason: "This room is currently blocked and cannot be booked.",
    };
  }

  // AC4: reject overlap with existing bookings; touching endpoints allowed
  const roomBookings = bookings.filter((b) => b.roomId === room.id);
  const conflict = roomBookings.find((b) => b.start < end && start < b.end);
  if (conflict) {
    return {
      status: "unavailable",
      reason: `Overlaps with "${conflict.title.trim()}" (${minutesToLabel(conflict.start)}–${minutesToLabel(conflict.end)}).`,
    };
  }

  return { status: "available" };
}
