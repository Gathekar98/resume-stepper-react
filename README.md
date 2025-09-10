# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




code 
import React, { useEffect, useMemo, useState } from "react";

// --- small helpers ---
const STORAGE_KEY = "resumeStepper.v1";
const cls = (...a) => a.filter(Boolean).join(" ");

function useLocalStorageState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState];
}

const STEPS = [
  { id: "personal", label: "Personal" },
  { id: "summary", label: "Summary" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "preview", label: "Preview" },
];

const EMPTY = {
  personal: { fullName: "", email: "", phone: "", location: "", website: "" },
  summary: { about: "" },
  education: [
    { school: "", degree: "", field: "", start: "", end: "", details: "" },
  ],
  experience: [
    { company: "", role: "", start: "", end: "", location: "", bullets: [""] },
  ],
  skills: { core: [], tools: [] },
};

// --- main ---
export default function App() {
  const [data, setData] = useLocalStorageState(STORAGE_KEY, EMPTY);
  const [step, setStep] = useLocalStorageState("resumeStepper.currentStep", 0);

  const go = (n) => setStep(Math.min(STEPS.length - 1, Math.max(0, n)));
  const next = () => go(step + 1);
  const back = () => go(step - 1);

  const update = (path, value) => {
    setData((d) => setByPath(d, path, value));
  };

  const validFlags = useMemo(() => validate(data), [data]);

  const onDownloadHTML = () => {
    const html = renderStandaloneHTML(data);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = (data.personal.fullName || "resume").replace(/[^a-z0-9\-\_]+/gi, "-");
    a.download = `${safeName}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onClearAll = () => {
    if (!confirm("Clear all saved data?")) return;
    setData(EMPTY);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-semibold">Resume Builder</h1>
        <p className="text-sm text-gray-600 mt-1">Multi‑step form with autosave to Local Storage. Export as a clean, printable HTML at the end.</p>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-24">
        {/* Stepper */}
        <ol className="flex flex-wrap gap-2 md:gap-3 mb-6">
          {STEPS.map((s, i) => (
            <li key={s.id} className="flex items-center">
              <button
                onClick={() => go(i)}
                className={cls(
                  "px-3 py-1.5 rounded-full text-sm border",
                  i === step
                    ? "bg-black text-white border-black"
                    : validFlags[s.id]
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                )}
                aria-current={i === step ? "step" : undefined}
              >
                <span className="font-medium">{i + 1}.</span> <span className="ml-1">{s.label}</span>
              </button>
              {i < STEPS.length - 1 && <span className="mx-2 text-gray-300">›</span>}
            </li>
          ))}
        </ol>

        {/* Panels */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6">
          {STEPS[step].id === "personal" && (
            <Section title="Personal details" subtitle="These show up at the top of your resume.">
              <Grid cols={2}>
                <TextField label="Full name" value={data.personal.fullName} onChange={(v) => update(["personal", "fullName"], v)} required />
                <TextField label="Email" type="email" value={data.personal.email} onChange={(v) => update(["personal", "email"], v)} required />
                <TextField label="Phone" value={data.personal.phone} onChange={(v) => update(["personal", "phone"], v)} />
                <TextField label="Location" value={data.personal.location} onChange={(v) => update(["personal", "location"], v)} />
                <TextField label="Website / LinkedIn" value={data.personal.website} onChange={(v) => update(["personal", "website"], v)} />
              </Grid>
            </Section>
          )}

          {STEPS[step].id === "summary" && (
            <Section title="Professional summary" subtitle="2–4 crisp lines that position you.">
              <TextArea label="About you" rows={6} value={data.summary.about} onChange={(v) => update(["summary", "about"], v)} />
            </Section>
          )}

          {STEPS[step].id === "education" && (
            <Section title="Education" subtitle="Add one or more entries.">
              <Repeater
                items={data.education}
                onChange={(items) => update(["education"], items)}
                emptyItem={{ school: "", degree: "", field: "", start: "", end: "", details: "" }}
                render={(item, onItemChange) => (
                  <Grid cols={2}>
                    <TextField label="School / University" value={item.school} onChange={(v) => onItemChange({ ...item, school: v })} required />
                    <TextField label="Degree" value={item.degree} onChange={(v) => onItemChange({ ...item, degree: v })} />
                    <TextField label="Field of study" value={item.field} onChange={(v) => onItemChange({ ...item, field: v })} />
                    <TextField label="Start" placeholder="2019" value={item.start} onChange={(v) => onItemChange({ ...item, start: v })} />
                    <TextField label="End" placeholder="2023 / Present" value={item.end} onChange={(v) => onItemChange({ ...item, end: v })} />
                    <TextArea label="Details" rows={3} value={item.details} onChange={(v) => onItemChange({ ...item, details: v })} />
                  </Grid>
                )}
              />
            </Section>
          )}

          {STEPS[step].id === "experience" && (
            <Section title="Experience" subtitle="Add roles; use bullet points for impact.">
              <Repeater
                items={data.experience}
                onChange={(items) => update(["experience"], items)}
                emptyItem={{ company: "", role: "", start: "", end: "", location: "", bullets: [""] }}
                render={(item, onItemChange) => (
                  <div className="space-y-4">
                    <Grid cols={2}>
                      <TextField label="Company" value={item.company} onChange={(v) => onItemChange({ ...item, company: v })} required />
                      <TextField label="Role / Title" value={item.role} onChange={(v) => onItemChange({ ...item, role: v })} required />
                      <TextField label="Start" placeholder="Jan 2021" value={item.start} onChange={(v) => onItemChange({ ...item, start: v })} />
                      <TextField label="End" placeholder="Dec 2023 / Present" value={item.end} onChange={(v) => onItemChange({ ...item, end: v })} />
                      <TextField label="Location" value={item.location} onChange={(v) => onItemChange({ ...item, location: v })} />
                    </Grid>

                    <Bullets
                      bullets={item.bullets}
                      onChange={(bullets) => onItemChange({ ...item, bullets })}
                    />
                  </div>
                )}
              />
            </Section>
          )}

          {STEPS[step].id === "skills" && (
            <Section title="Skills" subtitle="Separate core skills and tools/tech.">
              <TagInput
                label="Core skills (e.g., Equity Research, Valuation, Financial Modeling)"
                values={data.skills.core}
                onChange={(v) => update(["skills", "core"], v)}
              />
              <div className="h-4" />
              <TagInput
                label="Tools / Tech (e.g., Excel, Power BI, React, Python)"
                values={data.skills.tools}
                onChange={(v) => update(["skills", "tools"], v)}
              />
            </Section>
          )}

          {STEPS[step].id === "preview" && (
            <Section title="Preview & Export" subtitle="Review your resume and export a clean HTML.">
              <ResumePreview data={data} />
              <div className="flex flex-wrap gap-3 mt-6">
                <button className="px-4 py-2 rounded-xl bg-black text-white" onClick={onDownloadHTML}>Download HTML</button>
                <button className="px-4 py-2 rounded-xl border" onClick={() => window.print()}>Print</button>
                <button className="px-4 py-2 rounded-xl border" onClick={onClearAll}>Clear all</button>
              </div>
            </Section>
          )}

          <div className="flex justify-between pt-4">
            <button disabled={step === 0} onClick={back} className={cls("px-4 py-2 rounded-xl border", step === 0 && "opacity-40 cursor-not-allowed")}>Back</button>
            <div className="flex items-center gap-3">
              <span className={cls("text-sm", validFlags[STEPS[step].id] ? "text-green-700" : "text-amber-700")}>{validFlags[STEPS[step].id] ? "Looks good" : "Some fields are optional/empty"}</span>
              <button onClick={next} disabled={step === STEPS.length - 1} className={cls("px-4 py-2 rounded-xl text-white", step === STEPS.length - 1 ? "bg-gray-400 cursor-not-allowed" : "bg-black")}>{step === STEPS.length - 1 ? "Done" : "Next"}</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- UI primitives ---
function Section({ title, subtitle, children }) {
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

function Grid({ cols = 2, children }) {
  return <div className={cls("grid gap-4", cols === 2 ? "md:grid-cols-2" : "")}>{children}</div>;
}

function TextField({ label, value, onChange, type = "text", placeholder, required }) {
  const id = useMemo(() => `id_${Math.random().toString(36).slice(2)}`, []);
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1">{label}{required && <span className="text-red-600"> *</span>}</span>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </label>
  );
}

function TextArea({ label, value, onChange, rows = 4, placeholder }) {
  const id = useMemo(() => `id_${Math.random().toString(36).slice(2)}`, []);
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1">{label}</span>
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
      />
    </label>
  );
}

function Repeater({ items, onChange, emptyItem, render }) {
  const add = () => onChange([...(items || []), JSON.parse(JSON.stringify(emptyItem))]);
  const remove = (idx) => onChange(items.filter((_, i) => i !== idx));
  const move = (from, to) => {
    const arr = [...items];
    const [it] = arr.splice(from, 1);
    arr.splice(to, 0, it);
    onChange(arr);
  };

  return (
    <div className="space-y-4">
      {(items || []).map((item, i) => (
        <div key={i} className="border border-gray-200 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm text-gray-600">Entry {i + 1}</div>
            <div className="flex gap-2">
              <button className="px-2 py-1 rounded-lg border" onClick={() => move(i, Math.max(0, i - 1))} disabled={i === 0}>↑</button>
              <button className="px-2 py-1 rounded-lg border" onClick={() => move(i, Math.min(items.length - 1, i + 1))} disabled={i === items.length - 1}>↓</button>
              <button className="px-2 py-1 rounded-lg border text-red-600" onClick={() => remove(i)}>Delete</button>
            </div>
          </div>
          {render(item, (v) => onChange(items.map((it, idx) => (idx === i ? v : it))))}
        </div>
      ))}
      <button className="px-3 py-2 rounded-xl border" onClick={add}>Add another</button>
    </div>
  );
}

function Bullets({ bullets, onChange }) {
  const setAt = (i, v) => onChange(bullets.map((b, idx) => (idx === i ? v : b)));
  const add = () => onChange([...(bullets || []), ""]);
  const remove = (i) => onChange(bullets.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="text-sm font-medium mb-2">Key achievements / responsibilities</div>
      <div className="space-y-2">
        {bullets.map((b, i) => (
          <div key={i} className="flex gap-2 items-start">
            <input
              value={b}
              onChange={(e) => setAt(i, e.target.value)}
              placeholder="e.g., Led a 3‑member team to deliver…"
              className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="px-2 py-1 rounded-lg border" onClick={() => remove(i)}>Delete</button>
          </div>
        ))}
      </div>
      <button className="mt-2 px-3 py-2 rounded-xl border" onClick={add}>Add bullet</button>
    </div>
  );
}

function TagInput({ label, values, onChange }) {
  const [text, setText] = useState("");
  const add = () => {
    const v = text.trim();
    if (!v) return;
    onChange([...(values || []), v]);
    setText("");
  };
  const remove = (i) => onChange(values.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className="text-sm font-medium mb-2">{label}</div>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder="Type and press Enter"
          className="flex-1 px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button className="px-3 py-2 rounded-xl border" onClick={add}>Add</button>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {(values || []).map((v, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm">
            {v}
            <button className="text-gray-500" onClick={() => remove(i)} aria-label={`Remove ${v}`}>×</button>
          </span>
        ))}
      </div>
    </div>
  );
}

// --- validation ---
function validate(d) {
  return {
    personal: Boolean(d.personal.fullName && d.personal.email),
    summary: (d.summary.about || "").length > 0,
    education: (d.education || []).length > 0 && Boolean(d.education[0].school),
    experience: (d.experience || []).length > 0 && Boolean(d.experience[0].company && d.experience[0].role),
    skills: (d.skills.core?.length || d.skills.tools?.length) > 0,
    preview: true,
  };
}

// --- preview ---
function ResumePreview({ data }) {
  const p = data.personal;
  return (
    <div className="border border-gray-200 rounded-2xl p-6">
      <div className="text-2xl font-semibold">{p.fullName || "Your Name"}</div>
      <div className="text-sm text-gray-600 mt-1">
        {[p.location, p.phone, p.email, p.website].filter(Boolean).join(" · ")}
      </div>

      {data.summary.about && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold">Summary</h3>
          <p className="mt-2 leading-relaxed whitespace-pre-line">{data.summary.about}</p>
        </section>
      )}

      {!!data.experience?.length && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold">Experience</h3>
          <div className="mt-2 space-y-4">
            {data.experience.map((e, i) => (
              <div key={i}>
                <div className="font-medium">{e.role || "Role"} — {e.company || "Company"}</div>
                <div className="text-sm text-gray-600">{[e.location, range(e.start, e.end)].filter(Boolean).join(" · ")}</div>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  {(e.bullets || []).filter(Boolean).map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {!!data.education?.length && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold">Education</h3>
          <div className="mt-2 space-y-2">
            {data.education.map((ed, i) => (
              <div key={i}>
                <div className="font-medium">{ed.school || "School"}</div>
                <div className="text-sm text-gray-600">{[ed.degree, ed.field, range(ed.start, ed.end)].filter(Boolean).join(" · ")}</div>
                {ed.details && <div className="text-sm mt-1">{ed.details}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {(data.skills.core?.length || data.skills.tools?.length) ? (
        <section className="mt-6">
          <h3 className="text-lg font-semibold">Skills</h3>
          <div className="mt-2">
            {!!data.skills.core?.length && (
              <div>
                <div className="text-sm font-medium">Core</div>
                <div className="text-sm text-gray-800">{data.skills.core.join(", ")}</div>
              </div>
            )}
            {!!data.skills.tools?.length && (
              <div className="mt-2">
                <div className="text-sm font-medium">Tools / Tech</div>
                <div className="text-sm text-gray-800">{data.skills.tools.join(", ")}</div>
              </div>
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
}

// --- pure helpers ---
function range(a, b) {
  if (!a && !b) return "";
  if (a && !b) return `${a} – Present`;
  if (!a && b) return `${b}`;
  return `${a} – ${b}`;
}

function setByPath(obj, path, value) {
  const clone = structuredClone ? structuredClone(obj) : JSON.parse(JSON.stringify(obj));
  const [head, ...rest] = Array.isArray(path) ? path : String(path).split(".");
  if (!rest.length) {
    clone[head] = value;
    return clone;
  }
  clone[head] = setByPath(clone[head], rest, value);
  return clone;
}

// --- exporter ---
function renderStandaloneHTML(data) {
  const esc = (s) => String(s || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const p = data.personal;
  const lines = [
    `<!doctype html>`,
    `<html lang="en">`,
    `<head>`,
    `  <meta charset="utf-8"/>`,
    `  <meta name="viewport" content="width=device-width, initial-scale=1"/>`,
    `  <title>${esc(p.fullName || "Resume")}</title>`,
    `  <style>`,
    `   :root{--ink:#111;--muted:#555;--rule:#ddd;}`,
    `   *{box-sizing:border-box;}body{font:14px/1.5 system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;color:var(--ink);margin:0;background:#fff;padding:32px;}`,
    `   h1{font-size:28px;margin:0 0 4px} h2{font-size:16px;margin:24px 0 8px} .muted{color:var(--muted)} hr{border:0;border-top:1px solid var(--rule);margin:16px 0}`,
    `   .section{margin-top:16px}`,
    `   ul{margin:8px 0 0 18px}`,
    `   @media print{ body{padding:0} }`,
    `  </style>`,
    `</head>`,
    `<body>`,
    `  <header>`,
    `    <h1>${esc(p.fullName || "Your Name")}</h1>`,
    `    <div class="muted">${esc([p.location, p.phone, p.email, p.website].filter(Boolean).join(" · "))}</div>`,
    `  </header>`,
    `  ${data.summary.about ? `<section class="section"><h2>Summary</h2><div>${esc(data.summary.about).replaceAll("\n","<br>")}</div></section>` : ""}`,
    `  ${(data.experience||[]).length ? `<section class="section"><h2>Experience</h2>${data.experience.map(e=>`
          <div><strong>${esc(e.role||"Role")} — ${esc(e.company||"Company")}</strong><div class="muted">${esc([e.location, range(e.start,e.end)].filter(Boolean).join(" · "))}</div>${(e.bullets||[]).filter(Boolean).length?`<ul>${e.bullets.filter(Boolean).map(b=>`<li>${esc(b)}</li>`).join("")}</ul>`:``}</div>
        `).join("")}</section>` : ""}`,
    `  ${(data.education||[]).length ? `<section class="section"><h2>Education</h2>${data.education.map(ed=>`
          <div><strong>${esc(ed.school||"School")}</strong><div class="muted">${esc([ed.degree, ed.field, range(ed.start, ed.end)].filter(Boolean).join(" · "))}</div>${ed.details?`<div>${esc(ed.details)}</div>`:""}</div>
        `).join("")}</section>` : ""}`,
    `  ${(data.skills.core?.length||data.skills.tools?.length)?`<section class="section"><h2>Skills</h2>${data.skills.core?.length?`<div><strong>Core:</strong> ${esc(data.skills.core.join(", "))}</div>`:""}${data.skills.tools?.length?`<div><strong>Tools / Tech:</strong> ${esc(data.skills.tools.join(", "))}</div>`:""}</section>`:""}`,
    `</body>`,
    `</html>`,
  ];
  return lines.join("\n");
}
