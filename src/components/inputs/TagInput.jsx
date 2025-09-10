import React, { useState } from "react";

export default function TagInput({ label, values = [], onChange }) {
  const [text, setText] = useState("");

  const add = () => {
    const v = text.trim();
    if (!v) return;
    onChange([...(values || []), v]);
    setText("");
  };

  const remove = (i) => onChange(values.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="text-sm font-medium mb-2">{label}</div>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder="Type and press Enter"
          className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button className="px-3 py-2 rounded-xl border" onClick={add}>
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {(values || []).map((v, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm">
            {v}
            <button className="text-gray-500" onClick={() => remove(i)} aria-label={`Remove ${v}`}>
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
