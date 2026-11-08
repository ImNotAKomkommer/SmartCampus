import { useMemo, useState } from "react";
import { CalendarClock } from "lucide-react";
import { bookings } from "./bookingData";
import { rooms } from "./roomData";
import type { RoomRequirements } from "./types";
import { filterRooms } from "./roomFilters";
import { chooseRoomId } from "./roomSelection";
import { getRoomAvailabilityView } from "./availabilityView";
import { timeToMinutes } from "./availability";
import RoomRequirementsPanel from "./components/RoomRequirementsPanel";
import RoomCatalog from "./components/RoomCatalog";
import TimeIntervalPanel from "./components/TimeIntervalPanel";
import AvailabilityResult from "./components/AvailabilityResult";
import Timeline from "./components/Timeline";

const FIXED_CURRENT_TIME = 540; // 09:00, for repeatable demonstration and tests

export default function App() {
  const [requirements, setRequirements] = useState<RoomRequirements>({ attendees: 1, equipment: [] });
  const [preferredRoomId, setPreferredRoomId] = useState<string | null>(rooms[0].id);
  const [startTime, setStartTime] = useState("11:00");
  const [endTime, setEndTime] = useState("12:00");

  const matchingRooms = useMemo(() => filterRooms(rooms, requirements), [requirements]);
  const selectedId = chooseRoomId(matchingRooms, preferredRoomId);
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);
  // This same integration function is exercised by node:test (room switching + bookings).
  const view = getRoomAvailabilityView(matchingRooms, bookings, selectedId, start, end, FIXED_CURRENT_TIME);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-800">
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-sky-600 text-white"><CalendarClock className="w-5 h-5" /></span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Smart Campus Room Checker</h1>
          </div>
          <p className="text-sm sm:text-base text-slate-600">Find a fictional campus room by capacity and equipment, then check its availability. Nothing is booked or saved.</p>
        </header>
        <RoomRequirementsPanel requirements={requirements} onChange={setRequirements} />
        <RoomCatalog rooms={matchingRooms} selectedId={selectedId} onSelect={setPreferredRoomId} />
        <TimeIntervalPanel startTime={startTime} endTime={endTime} onStart={setStartTime} onEnd={setEndTime} />
        {view.room && <section aria-label="Selected room timeline" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 mb-6">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Today's timeline — {view.room.name}</h2>
          <Timeline bookings={view.roomBookings} candidateStart={start} candidateEnd={end}
            candidateValid={view.result?.status === "available"} currentTime={FIXED_CURRENT_TIME} />
        </section>}
        <AvailabilityResult result={view.result} start={start} end={end} hasRoom={view.room !== null} />
        <footer className="mt-8 text-center text-xs text-slate-500">Fictional sample data · No login, database, live API, or saved bookings.</footer>
      </main>
    </div>
  );
}
