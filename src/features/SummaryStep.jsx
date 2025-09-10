import React from "react";
import Section from "../components/Section.jsx";
import TextArea from "../components/inputs/TextArea.jsx";

export default function SummaryStep({ data, update }) {
  return (
    <Section title="Professional summary" subtitle="2–4 crisp lines that position you.">
      <TextArea
        label="About you"
        rows={6}
        value={data.summary.about}
        onChange={(v) => update(["summary", "about"], v)}
        placeholder={"Equity research analyst with strong valuation & modeling skills..."}
      />
    </Section>
  );
}
