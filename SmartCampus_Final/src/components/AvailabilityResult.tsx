import { CheckCircle2, XCircle } from "lucide-react";
import type { CheckResult } from "../types";
import { minutesToLabel } from "../availability";

type Props = { result: CheckResult | null; start: number | null; end: number | null; hasRoom: boolean; };

export default function AvailabilityResult({ result, start, end, hasRoom }: Props) {
  const available = result?.status === "available";
  const message = !hasRoom ? "Choose less restrictive requirements to find a room."
    : start === null || end === null ? "Enter valid start and end times in HH:MM format."
    : available ? "This room is available for the selected interval."
    : result?.status === "unavailable" ? result.reason : "Choose a time interval.";
  const heading = !hasRoom || start === null || end === null ? "Cannot check availability"
    : available ? "Available" : "Unavailable";
  return (
    <section aria-live="polite" className={`rounded-2xl border p-5 sm:p-6 ${available ? "bg-emerald-50 border-emerald-200" : "bg-white border-slate-200"}`}>
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className={`flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-xl ${available ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"}`}>
          {available ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
        </span>
        <div className="min-w-0">
          <h2 className={`font-bold text-lg ${available ? "text-emerald-700" : "text-slate-800"}`}>{heading}</h2>
          <p className="mt-0.5 text-sm text-slate-600">{message}</p>
          {start !== null && end !== null && <p className="mt-2 text-xs text-slate-500">Requested: {minutesToLabel(start)}–{minutesToLabel(end)} ({end - start} minutes)</p>}
        </div>
      </div>
    </section>
  );
}
