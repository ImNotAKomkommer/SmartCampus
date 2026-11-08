import { DoorOpen, MapPin, Users, XCircle } from "lucide-react";
import type { Room } from "../types";

type Props = { rooms: Room[]; selectedId: string | null; onSelect: (id: string) => void; };

export default function RoomCatalog({ rooms, selectedId, onSelect }: Props) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 mb-6" aria-labelledby="room-heading">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <h2 id="room-heading" className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Matching rooms</h2>
        <span className="text-xs text-slate-500">{rooms.length} match{rooms.length === 1 ? "" : "es"}</span>
      </div>
      {rooms.length === 0 ? (
        <div role="status" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          No rooms match your requirements. Reduce the attendees or uncheck some equipment to see more rooms.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {rooms.map((room) => (
            <button key={room.id} type="button" onClick={() => onSelect(room.id)}
              aria-pressed={room.id === selectedId}
              className={`text-left rounded-xl border p-4 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-500 ${room.id === selectedId
                ? "border-sky-500 ring-2 ring-sky-200 bg-sky-50" : "border-slate-200 hover:border-slate-300 bg-white"}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2"><DoorOpen className="w-4 h-4 text-slate-400" /><span className="font-semibold">{room.name}</span></div>
                {room.blocked && <span className="inline-flex gap-1 items-center text-[11px] text-rose-700 bg-rose-100 rounded-full px-2 py-0.5"><XCircle className="w-3 h-3"/> Blocked</span>}
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/>{room.building}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3"/>Seats {room.capacity}</span>
              </div>
              <p className="mt-2 text-xs text-slate-500">Equipment: {room.equipment.join(", ")}</p>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
