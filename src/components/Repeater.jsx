import React from "react";

export default function Repeater({ items = [], onChange, emptyItem, render }) {
  const add = () =>
    onChange([...(items || []), JSON.parse(JSON.stringify(emptyItem))]);

  const remove = (idx) => onChange(items.filter((_, i) => i !== idx));

  const move = (from, to) => {
    const arr = [...items];
    const [it] = arr.splice(from, 1);
    arr.splice(to, 0, it);
    onChange(arr);
  };

  return (
    <div className="space-y-4">
      {(items || []).map((item, i) => (
        <div key={i} className="border border-stone-300/15 bg-black/10 rounded-xl p-4 md:p-5">
          <div className="flex justify-between items-center mb-3">
            <div className="eyebrow">Entry {String(i + 1).padStart(2, "0")}</div>
            <div className="flex gap-2">
              <button
                className="lux-icon-button px-2.5 py-1.5"
                onClick={() => move(i, Math.max(0, i - 1))}
                disabled={i === 0}
              >
                ↑
              </button>
              <button
                className="lux-icon-button px-2.5 py-1.5"
                onClick={() => move(i, Math.min(items.length - 1, i + 1))}
                disabled={i === items.length - 1}
              >
                ↓
              </button>
              <button
                className="lux-icon-button px-2.5 py-1.5 text-rose-300"
                onClick={() => remove(i)}
              >
                Delete
              </button>
            </div>
          </div>

          {render(item, (v) =>
            onChange(items.map((it, idx) => (idx === i ? v : it)))
          )}
        </div>
      ))}

      <button className="lux-button-secondary px-4 py-2.5" onClick={add}>
        Add another
      </button>
    </div>
  );
}
