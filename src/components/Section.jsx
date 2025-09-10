import React from "react";

export default function Section({ title, subtitle, children }) {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
