"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomAvailabilityView = getRoomAvailabilityView;
const availability_1 = require("./availability");
/** Integration boundary: selection -> room-specific bookings -> availability result. */
function getRoomAvailabilityView(rooms, bookings, selectedId, start, end, now) {
    const room = rooms.find((r) => r.id === selectedId) ?? null;
    if (!room)
        return { room: null, roomBookings: [], result: null };
    const roomBookings = bookings.filter((booking) => booking.roomId === room.id);
    const result = start === null || end === null
        ? null
        : (0, availability_1.checkAvailability)(room, bookings, start, end, now);
    return { room, roomBookings, result };
}
