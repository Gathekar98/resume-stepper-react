import React, { useMemo } from "react";

export default function TextArea({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
}) {
  const id = useMemo(() => `id_${Math.random().toString(36).slice(2)}`, []);
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-2 text-stone-200">{label}</span>
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="lux-input w-full px-3.5 py-2.5 resize-y"
      />
    </label>
  );
}
