"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookings = void 0;
/** Fictional room-specific bookings. Never mutated by availability checks. */
exports.bookings = [
    { id: "b1", roomId: "r1", start: 540, end: 600, title: "Algorithms Lecture", owner: "Prof. Rao" },
    { id: "b2", roomId: "r1", start: 720, end: 780, title: "Robotics Lab", owner: "Prof. Chen" },
    { id: "b3", roomId: "r1", start: 900, end: 960, title: "Study Group", owner: "Students" },
    { id: "b4", roomId: "r2", start: 600, end: 660, title: "Physics Tutorial", owner: "Prof. Iqbal" },
    { id: "b5", roomId: "r2", start: 840, end: 900, title: "Seminar", owner: "Dept. of Physics" },
    { id: "b6", roomId: "r4", start: 480, end: 540, title: "Bio Reading", owner: "Prof. Silva" },
    { id: "b7", roomId: "r3", start: 780, end: 840, title: "Equipment Maintenance", owner: "Facilities" },
];
