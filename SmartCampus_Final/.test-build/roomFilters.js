"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterRooms = filterRooms;
/** F1/F2: all equipment items are required; exact capacity is sufficient. */
function filterRooms(rooms, requirements) {
    if (!Number.isInteger(requirements.attendees) || requirements.attendees < 1)
        return [];
    return rooms.filter((room) => room.capacity >= requirements.attendees &&
        requirements.equipment.every((item) => room.equipment.includes(item)));
}
