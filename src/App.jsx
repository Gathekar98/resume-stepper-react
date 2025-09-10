// src/App.jsx
import React, { useMemo, useState } from "react";
import Stepper from "./components/Stepper.jsx";
import PersonalStep from "./features/PersonalStep.jsx";
import SummaryStep from "./features/SummaryStep.jsx";
import EducationStep from "./features/EducationStep.jsx";
import ExperienceStep from "./features/ExperienceStep.jsx";
import SkillsStep from "./features/SkillsStep.jsx";
import PreviewStep from "./features/PreviewStep.jsx";
import { cls } from "./utils/cls.js";
import { setByPath } from "./utils/setByPath.js";
import { renderStandaloneHTML } from "./utils/exporter.js";
import { STORAGE_KEY_DATA, STORAGE_KEY_STEP, STEPS, EMPTY } from "./data/constants.js";

function useLocalStorageState(key, initialValue) {
  const [state, setState] = React.useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);

  return [state, setState];
}

export default function App() {
  const [data, setData] = useLocalStorageState(STORAGE_KEY_DATA, EMPTY);
  const [step, setStep] = useLocalStorageState(STORAGE_KEY_STEP, 0);
  
  const go = (n) => setStep(Math.min(STEPS.length - 1, Math.max(0, n)));
  const next = () => go(step + 1);
  const back = () => go(step - 1);

  const update = (path, value) => setData((d) => setByPath(d, path, value));

  const onDownloadHTML = () => {
    const html = renderStandaloneHTML(data);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const safeName = (data.personal.fullName || "resume").replace(/[^a-z0-9\-_]+/gi, "-");
    a.href = url;
    a.download = `${safeName}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const onClearAll = () => {
    if (!confirm("Clear all data?")) return;
    setData(EMPTY);
    setStep(0);
    try {
      localStorage.removeItem(STORAGE_KEY_DATA);
      localStorage.removeItem(STORAGE_KEY_STEP);
    } catch {}
  };
  
  // minimal “valid” badge for the current step
  const validFlags = useMemo(
    () => ({
      personal: Boolean(data.personal.fullName && data.personal.email),
      summary: Boolean(data.summary.about),
      education:  (data.education || []).length > 0 &&
      Boolean(data.education[0].school),
      experience: (data.experience || []).length > 0 &&
      Boolean(data.experience[0].company && data.experience[0].role),
      skills: (data.skills.core?.length || data.skills.tools?.length) > 0,
      preview: true,
    }),
    [data]
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-green-900">Resume Builder</h1>
        <p className="text-sm text-gray-600 mt-1">
          Step-by-step build. This step adds the Personal form.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-24">
        {/* Stepper */}
        <Stepper
          steps={STEPS}
          step={step}
          onGo={(i) => go(i)}
          validFlags={validFlags}
        />

        {/* Panels */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6">
          {(() => {
            switch (STEPS[step].id) {
              case "personal":
                return <PersonalStep data={data} update={update} />;

              case "summary":
                return <SummaryStep data={data} update={update} />;

              case "education":
                return <EducationStep data={data} update={update} />;

              case "experience":
                return <ExperienceStep data={data} update={update} />;

              case "skills":
                // TagInput still lives in App.jsx, so we pass it in
                return <SkillsStep data={data} update={update} />;

              case "preview":
                return (
                  <PreviewStep
                    data={data}
                    onDownloadHTML={onDownloadHTML}
                    onClearAll={onClearAll}
                  />
                );

              default:
                return (
                  <div className="text-gray-700">
                    <div className="text-lg font-semibold">{STEPS[step].label} (coming next)</div>
                    <p className="text-sm text-gray-600 mt-1">We’ll build each panel one by one.</p>
                  </div>
                );
            }
          })()}
          
          <div className="flex justify-between pt-6">
            <button
              disabled={step === 0}
              onClick={back}
              className={cls(
                "px-4 py-2 rounded-xl border",
                step === 0 && "opacity-40 cursor-not-allowed"
              )}
            >
              Back
            </button>
            <div className="flex items-center gap-3">
              <span
                className={cls(
                  "text-sm",
                  validFlags[STEPS[step].id]
                    ? "text-green-700"
                    : "text-amber-700"
                )}
              >
                {validFlags[STEPS[step].id]
                  ? "Looks good"
                  : "Some fields are optional/empty"}
              </span>
              <button
                onClick={next}
                disabled={step === STEPS.length - 1}
                className={cls(
                  "px-4 py-2 rounded-xl text-white",
                  step === STEPS.length - 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-800"
                )}
              >
                {step === STEPS.length - 1 ? "Done" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
