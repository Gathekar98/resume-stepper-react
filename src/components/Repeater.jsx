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
        <div key={i} className="border border-gray-200 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm text-gray-600">Entry {i + 1}</div>
            <div className="flex gap-2">
              <button
                className="px-2 py-1 rounded-lg border"
                onClick={() => move(i, Math.max(0, i - 1))}
                disabled={i === 0}
              >
                ↑
              </button>
              <button
                className="px-2 py-1 rounded-lg border"
                onClick={() => move(i, Math.min(items.length - 1, i + 1))}
                disabled={i === items.length - 1}
              >
                ↓
              </button>
              <button
                className="px-2 py-1 rounded-lg border text-red-600"
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

      <button className="px-3 py-2 rounded-xl border border-purple-300 bg-purple-200" onClick={add}>
        Add another
      </button>
    </div>
  );
}
