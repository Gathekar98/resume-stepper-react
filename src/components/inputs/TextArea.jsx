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
      <span className="block text-sm font-medium mb-1 text-purple-800">{label}</span>
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-200"
      />
    </label>
  );
}
