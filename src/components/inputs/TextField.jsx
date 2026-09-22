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
      <span className="block text-sm font-medium mb-2 text-stone-200">
        {label}
        {required && <span className="text-[#e2bd77]"> *</span>}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="lux-input w-full px-3.5 py-2.5"
      />
    </label>
  );
}
