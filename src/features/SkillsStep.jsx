import React from "react";
import Section from "../components/Section.jsx";
import TagInput from "../components/inputs/TagInput.jsx";


export default function SkillsStep({ data, update }) {
  return (
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
  );
}
