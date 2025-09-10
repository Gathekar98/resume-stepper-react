import React, { useMemo } from "react";

export default function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}) {
  const id = useMemo(() => `id_${Math.random().toString(36).slice(2)}`, []);
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1 text-purple-800">
        {label}
        {required && <span className="text-red-600"> *</span>}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-200"
      />
    </label>
  );
}
