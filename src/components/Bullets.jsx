import React from "react";

export default function Bullets({ bullets = [], onChange }) {
  const setAt = (i, v) => onChange(bullets.map((b, idx) => (idx === i ? v : b)));
  const add = () => onChange([...(bullets || []), ""]);
  const remove = (i) => onChange(bullets.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="text-sm font-medium mb-2">Key achievements / responsibilities</div>
      <div className="space-y-2">
        {bullets.map((b, i) => (
          <div key={i} className="flex gap-2 items-start">
            <input
              value={b}
              onChange={(e) => setAt(i, e.target.value)}
              placeholder="e.g., Led a 3-member team to deliver…"
              className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="px-2 py-1 rounded-lg border" onClick={() => remove(i)}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <button className="mt-2 px-3 py-2 rounded-xl border" onClick={add}>Add bullet</button>
    </div>
  );
}
