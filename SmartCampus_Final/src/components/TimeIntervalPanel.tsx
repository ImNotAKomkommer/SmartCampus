import { Clock } from "lucide-react";
import { timeToMinutes, minutesToLabel } from "../availability";

type Props = { startTime: string; endTime: string; onStart: (v: string) => void; onEnd: (v: string) => void; };
const PRESETS = [30, 60, 90, 120];

export default function TimeIntervalPanel({ startTime, endTime, onStart, onEnd }: Props) {
  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 mb-6">
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Candidate interval</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {([{ name: "Start time", value: startTime, update: onStart }, { name: "End time", value: endTime, update: onEnd }] as const).map((field) => (
          <label key={field.name} className="block text-sm font-medium text-slate-700">{field.name}
            <div className="mt-1 relative"><Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input type="time" aria-label={field.name} value={field.value} onChange={(event) => field.update(event.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-300" />
            </div>
          </label>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs text-slate-500 mr-1">Quick durations:</span>
        {PRESETS.map((duration) => <button type="button" key={duration}
          onClick={() => { const start = timeToMinutes(startTime); if (start !== null && start + duration < 1440) onEnd(minutesToLabel(start + duration)); }}
          className="text-xs font-medium px-2.5 py-1 rounded-full border border-slate-300 hover:bg-slate-100">{duration} min</button>)}
      </div>
      <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-sm text-slate-600">
        Current time used for validation: <strong>09:00 (fixed fictional time)</strong>
      </div>
    </section>
  );
}
