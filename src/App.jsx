// src/App.jsx
import React, { useMemo } from "react";
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
    <div className="app-shell">
      <header className="app-header">
        <div className="max-w-6xl mx-auto px-5 py-5 md:py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="brand-mark">R</div>
            <div>
              <div className="eyebrow">The considered career edit</div>
              <h1 className="brand-serif text-2xl md:text-3xl leading-none mt-1 text-stone-50">Resume Atelier</h1>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <div className="eyebrow">Your document</div>
            <div className="text-sm text-stone-300 mt-1">Saved privately on this device</div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 py-9 md:py-12 pb-24">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow mb-3">A refined first impression</p>
          <h2 className="brand-serif text-3xl md:text-5xl text-stone-50 leading-tight">Build a resume with quiet confidence.</h2>
          <p className="mt-3 text-stone-300 leading-relaxed">A focused, step-by-step workspace for shaping the story behind your next opportunity.</p>
        </div>
        {/* Stepper */}
        <Stepper
          steps={STEPS}
          step={step}
          onGo={(i) => go(i)}
          validFlags={validFlags}
        />

        {/* Panels */}
        <div className="workspace-card p-5 md:p-8">
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
          
          <div className="form-actions mt-8 pt-6 border-t border-stone-300/10 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <button
              disabled={step === 0}
              onClick={back}
              className={cls(
                "lux-button-quiet px-5 py-2.5",
                step === 0 && "opacity-40 cursor-not-allowed"
              )}
            >
              Back
            </button>
            <div className="flex items-center gap-3">
              <span
                className={cls(
                  "text-sm font-medium",
                  validFlags[STEPS[step].id]
                    ? "text-emerald-300"
                    : "text-amber-300"
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
                  "lux-button px-5 py-2.5",
                  step === STEPS.length - 1
                    ? "opacity-40 cursor-not-allowed"
                    : ""
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
