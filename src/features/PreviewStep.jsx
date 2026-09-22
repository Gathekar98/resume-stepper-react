import React from "react";
import Section from "../components/Section.jsx";
import ResumePreview from "../components/ResumePreview.jsx";

export default function PreviewStep({ data, onDownloadHTML, onClearAll }) {
  return (
    <Section title="Preview" subtitle="Review your resume below.">
      <ResumePreview data={data} />
      <div className="flex flex-wrap gap-3 mt-6">
        <button className="lux-button px-5 py-2.5" onClick={onDownloadHTML}>
          Download HTML
        </button>
        <button className="lux-button-secondary px-5 py-2.5" onClick={() => window.print()}>
          Print
        </button>
        <button className="lux-button-quiet px-5 py-2.5 text-rose-200" onClick={onClearAll}>
          Clear all
        </button>
      </div>
    </Section>
  );
}
