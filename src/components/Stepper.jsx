import React from "react";

const cls = (...a) => a.filter(Boolean).join(" ");

export default function Stepper({ steps, step, onGo, validFlags }) {
  return (
    <ol className="flex flex-wrap gap-2 md:gap-3 mb-6">
      {steps.map((s, i) => (
        <li key={s.id} className="flex items-center">
          <button
            onClick={() => onGo(i)}
            className={cls(
              "px-3 py-1.5 rounded-full text-sm border",
              i === step
                ? "bg-purple-100 text-black border-purple-200"
                : validFlags[s.id]
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-white text-purple-700 border-gray-300 hover:border-gray-400"
            )}
            aria-current={i === step ? "step" : undefined}
          >
            <span className="font-medium">{i + 1}.</span>{" "}
            <span className="ml-1">{s.label}</span>
          </button>
          {i < steps.length - 1 && (
            <span className="mx-2 text-gray-300">›</span>
          )}
        </li>
      ))}
    </ol>
  );
}
