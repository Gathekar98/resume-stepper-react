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
      <div className="text-sm font-medium mb-2 text-stone-200">{label}</div>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder="Type and press Enter"
          className="lux-input flex-1 px-3.5 py-2.5"
        />
        <button className="lux-button-secondary px-4 py-2.5" onClick={add}>
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {(values || []).map((v, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d8b778]/10 border border-[#d8b778]/25 text-[#f2dbac] text-sm">
            {v}
            <button className="text-[#d8b778] hover:text-white" onClick={() => remove(i)} aria-label={`Remove ${v}`}>
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
