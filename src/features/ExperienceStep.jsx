import React from "react";
import Section from "../components/Section.jsx";
import Grid from "../components/Grid.jsx";
import TextField from "../components/inputs/TextField.jsx";
import Repeater from "../components/Repeater.jsx";
import Bullets from "../components/Bullets.jsx";

export default function ExperienceStep({ data, update }) {
  return (
    <Section title="Experience" subtitle="Add roles; use bullet points for impact.">
      <Repeater
        items={data.experience}
        onChange={(items) => update(["experience"], items)}
        emptyItem={{ company: "", role: "", start: "", end: "", location: "", bullets: [""] }}
        render={(item, onItemChange) => (
          <div className="space-y-4">
            <Grid cols={2}>
              <TextField
                label="Company"
                value={item.company}
                onChange={(v) => onItemChange({ ...item, company: v })}
                required
              />
              <TextField
                label="Role / Title"
                value={item.role}
                onChange={(v) => onItemChange({ ...item, role: v })}
                required
              />
              <TextField
                label="Start"
                placeholder="Jan 2021"
                value={item.start}
                onChange={(v) => onItemChange({ ...item, start: v })}
              />
              <TextField
                label="End"
                placeholder="Dec 2023 / Present"
                value={item.end}
                onChange={(v) => onItemChange({ ...item, end: v })}
              />
              <TextField
                label="Location"
                value={item.location}
                onChange={(v) => onItemChange({ ...item, location: v })}
              />
            </Grid>
            <Bullets
              bullets={item.bullets}
              onChange={(bullets) => onItemChange({ ...item, bullets })}
            />
          </div>
        )}
      />
    </Section>
  );
}
