import React from "react";
import Section from "../components/Section.jsx";
import ResumePreview from "../components/ResumePreview.jsx";

export default function PreviewStep({ data, onDownloadHTML, onClearAll }) {
  return (
    <Section title="Preview" subtitle="Review your resume below.">
      <ResumePreview data={data} />
      <div className="flex flex-wrap gap-3 mt-6">
        <button className="px-4 py-2 rounded-xl bg-black text-white" onClick={onDownloadHTML}>
          Download HTML
        </button>
        <button className="px-4 py-2 rounded-xl border" onClick={() => window.print()}>
          Print
        </button>
        <button className="px-4 py-2 rounded-xl border" onClick={onClearAll}>
          Clear all
        </button>
      </div>
    </Section>
  );
}
