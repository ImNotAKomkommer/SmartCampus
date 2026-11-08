import type { Equipment, RoomRequirements } from "../types";
import { EQUIPMENT_OPTIONS } from "../roomData";

type Props = {
  requirements: RoomRequirements;
  onChange: (requirements: RoomRequirements) => void;
};

export default function RoomRequirementsPanel({ requirements, onChange }: Props) {
  function toggle(item: Equipment) {
    const equipment = requirements.equipment.includes(item)
      ? requirements.equipment.filter((value) => value !== item)
      : [...requirements.equipment, item];
    onChange({ ...requirements, equipment });
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 mb-6" aria-labelledby="filter-heading">
      <h2 id="filter-heading" className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Room requirements</h2>
      <label className="block max-w-xs text-sm font-medium text-slate-700 mb-4">
        Number of attendees
        <input type="number" min={1} max={999} step={1} value={requirements.attendees}
          onChange={(event) => onChange({ ...requirements, attendees: Number(event.target.value) })}
          className="mt-1 block w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-300" />
      </label>
      <fieldset>
        <legend className="text-sm font-medium text-slate-700 mb-2">Required equipment (all selected items must be present)</legend>
        <div className="flex flex-wrap gap-x-5 gap-y-3">
          {EQUIPMENT_OPTIONS.map((item) => (
            <label key={item} className="inline-flex items-center gap-2 text-sm cursor-pointer text-slate-700">
              <input type="checkbox" checked={requirements.equipment.includes(item)} onChange={() => toggle(item)}
                className="rounded border-slate-300 text-sky-600 focus:ring-sky-300" />
              {item}
            </label>
          ))}
        </div>
      </fieldset>
    </section>
  );
}
