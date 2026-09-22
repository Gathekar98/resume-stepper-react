import React from "react";

export default function Bullets({ bullets = [], onChange }) {
  const setAt = (i, v) => onChange(bullets.map((b, idx) => (idx === i ? v : b)));
  const add = () => onChange([...(bullets || []), ""]);
  const remove = (i) => onChange(bullets.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="text-sm font-medium mb-2 text-stone-200">Key achievements / responsibilities</div>
      <div className="space-y-2">
        {bullets.map((b, i) => (
          <div key={i} className="flex gap-2 items-start">
            <input
              value={b}
              onChange={(e) => setAt(i, e.target.value)}
              placeholder="e.g., Led a 3-member team to deliver…"
              className="lux-input flex-1 px-3.5 py-2.5"
            />
            <button className="lux-icon-button px-2.5 py-2.5" onClick={() => remove(i)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <button className="lux-button-secondary mt-3 px-4 py-2.5" onClick={add}>Add bullet</button>
    </div>
  );
}
