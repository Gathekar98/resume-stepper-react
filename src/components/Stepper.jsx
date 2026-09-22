import React from "react";

const cls = (...a) => a.filter(Boolean).join(" ");

export default function Stepper({ steps, step, onGo, validFlags }) {
  return (
    <ol className="stepper-wrap flex flex-wrap items-center gap-2 md:gap-3 mb-8 pb-7 border-b border-stone-300/10">
      {steps.map((s, i) => (
        <li key={s.id} className="flex items-center">
          <button
            onClick={() => onGo(i)}
            className={cls(
              "px-3.5 py-2 rounded-full text-sm border transition-all duration-200",
              i === step
                ? "bg-[#d8b778] text-[#14212b] border-[#d8b778] shadow-lg shadow-black/20"
                : validFlags[s.id]
                ? "bg-emerald-400/10 text-emerald-200 border-emerald-300/25"
                : "bg-transparent text-stone-300 border-stone-300/20 hover:border-[#d8b778]/70 hover:text-[#e9c983]"
            )}
            aria-current={i === step ? "step" : undefined}
          >
            <span className="font-medium">{i + 1}.</span>{" "}
            <span className="ml-1">{s.label}</span>
          </button>
          {i < steps.length - 1 && (
            <span className="mx-1 md:mx-2 text-stone-500">/</span>
          )}
        </li>
      ))}
    </ol>
  );
}
