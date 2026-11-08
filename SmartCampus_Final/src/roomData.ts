import type { Equipment, Room } from "./types";

export const EQUIPMENT_OPTIONS: Equipment[] = [
  "Projector",
  "Whiteboard",
  "Video conferencing",
  "Computers",
];

/** Fictional campus rooms, independent of the booking validation rules. */
export const rooms: Room[] = [
  { id: "r1", name: "Athena 101", building: "Engineering Block", capacity: 40,
    equipment: ["Projector", "Whiteboard", "Computers"], blocked: false },
  { id: "r2", name: "Curie 204", building: "Science Wing", capacity: 24,
    equipment: ["Projector", "Video conferencing"], blocked: false },
  { id: "r3", name: "Newton 310", building: "Engineering Block", capacity: 60,
    equipment: ["Projector", "Whiteboard", "Video conferencing", "Computers"], blocked: true },
  { id: "r4", name: "Darwin 112", building: "Life Sciences", capacity: 18,
    equipment: ["Whiteboard"], blocked: false },
];
