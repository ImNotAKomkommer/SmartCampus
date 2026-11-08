export type Equipment = "Projector" | "Whiteboard" | "Video conferencing" | "Computers";

export type Room = {
  id: string;
  name: string;
  building: string;
  capacity: number;
  equipment: Equipment[];
  blocked: boolean;
};

export type Booking = {
  id: string;
  roomId: string;
  start: number; // minutes since midnight, half-open interval [start, end)
  end: number;
  title: string;
  owner: string;
};

export type CheckResult =
  | { status: "available" }
  | { status: "unavailable"; reason: string };

export type RoomRequirements = {
  attendees: number;
  equipment: Equipment[];
};
