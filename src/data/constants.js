export const STORAGE_KEY_DATA = "resumeStepper.v1";
export const STORAGE_KEY_STEP = "resumeStepper.currentStep";

export const STEPS = [
  { id: "personal", label: "Personal" },
  { id: "summary", label: "Summary" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "preview", label: "Preview" },
];

export const EMPTY = {
  personal: { fullName: "", email: "", phone: "", location: "", website: "" },
  summary: { about: "" },
  education: [{ school: "", degree: "", field: "", start: "", end: "", details: "" }],
  experience: [{ company: "", role: "", start: "", end: "", location: "", bullets: [""] }],
  skills: { core: [], tools: [] },
};
