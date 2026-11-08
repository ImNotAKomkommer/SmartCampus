import type { Booking } from "../types";
import { minutesToLabel } from "../availability";

type TimelineProps = {
  bookings: Booking[];
  candidateStart: number | null;
  candidateEnd: number | null;
  candidateValid: boolean;
  currentTime: number;
};

const DAY = 1440;

function HourMarkers() {
  const hours = Array.from({ length: 9 }, (_, i) => i * 3); // 0,3,6,...24
  return (
    <div className="relative h-4 mb-1 select-none">
      {hours.map((h) => (
        <span
          key={h}
          className="absolute -translate-x-1/2 text-[10px] text-slate-400"
          style={{ left: `${((h * 60) / DAY) * 100}%` }}
        >
          {minutesToLabel(h * 60)}
        </span>
      ))}
    </div>
  );
}

export default function Timeline({
  bookings,
  candidateStart,
  candidateEnd,
  candidateValid,
  currentTime,
}: TimelineProps) {
  return (
    <div className="w-full">
      <HourMarkers />
      <div className="relative h-10 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden">
        {/* existing bookings */}
        {bookings.map((b) => {
          const left = (b.start / DAY) * 100;
          const width = ((b.end - b.start) / DAY) * 100;
          return (
            <div
              key={b.id}
              className="absolute top-0 bottom-0 bg-sky-500/80 border-r border-sky-700 flex items-center px-1 overflow-hidden"
              style={{ left: `${left}%`, width: `${width}%` }}
              title={`${b.title.trim()} · ${minutesToLabel(b.start)}–${minutesToLabel(b.end)}`}
            >
              <span className="text-[10px] text-white font-medium truncate" aria-label={b.title.trim()}>
                {width >= 7 ? b.title.trim() : ""}
              </span>
            </div>
          );
        })}

        {/* candidate interval */}
        {candidateStart !== null && candidateEnd !== null && candidateStart < candidateEnd && (
          <div
            className={`absolute top-0 bottom-0 border-2 ${
              candidateValid ? "border-emerald-500 bg-emerald-400/30" : "border-rose-500 bg-rose-400/30"
            }`}
            style={{
              left: `${(candidateStart / DAY) * 100}%`,
              width: `${((candidateEnd - candidateStart) / DAY) * 100}%`,
            }}
            title={`Candidate · ${minutesToLabel(candidateStart)}–${minutesToLabel(candidateEnd)}`}
          />
        )}

        {/* current time marker */}
        <div
          className="absolute top-0 bottom-0 w-px bg-slate-900/70"
          style={{ left: `${(currentTime / DAY) * 100}%` }}
          title={`Now · ${minutesToLabel(currentTime)}`}
        >
          <span className="absolute -top-0.5 -translate-x-1/2 text-[9px] text-slate-700 font-semibold">
            ▼
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm bg-sky-500/80" /> Existing booking
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm border-2 border-emerald-500 bg-emerald-400/30" /> Candidate (valid)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-sm border-2 border-rose-500 bg-rose-400/30" /> Candidate (invalid)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-px h-3 bg-slate-900/70" /> Current time
        </span>
      </div>
    </div>
  );
}
