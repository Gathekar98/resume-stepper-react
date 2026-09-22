import React from "react";

export default function Section({ title, subtitle, children }) {
  return (
    <section>
      <div className="mb-7">
        <div className="eyebrow mb-2">Curriculum vitae</div>
        <h2 className="brand-serif text-3xl md:text-4xl font-medium text-stone-50">{title}</h2>
        {subtitle && <p className="text-sm text-stone-300 mt-2 leading-relaxed">{subtitle}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
