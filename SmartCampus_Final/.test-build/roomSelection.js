"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chooseRoomId = chooseRoomId;
/** F5: preserve selection if eligible, else pick first matching room (or null). */
function chooseRoomId(matchingRooms, preferredId) {
    return matchingRooms.some((room) => room.id === preferredId)
        ? preferredId
        : matchingRooms[0]?.id ?? null;
}
