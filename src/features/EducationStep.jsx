import React from "react";
import Section from "../components/Section.jsx";
import Grid from "../components/Grid.jsx";
import TextField from "../components/inputs/TextField.jsx";
import TextArea from "../components/inputs/TextArea.jsx";
import Repeater from "../components/Repeater.jsx";

export default function EducationStep({ data, update }) {
  return (
    <Section title="Education" subtitle="Add one or more entries.">
      <Repeater
        items={data.education}
        onChange={(items) => update(["education"], items)}
        emptyItem={{ school: "", degree: "", field: "", start: "", end: "", details: "" }}
        render={(item, onItemChange) => (
          <Grid cols={2}>
            <TextField
              label="School / University"
              value={item.school}
              onChange={(v) => onItemChange({ ...item, school: v })}
              required
            />
            <TextField
              label="Degree"
              value={item.degree}
              onChange={(v) => onItemChange({ ...item, degree: v })}
            />
            <TextField
              label="Field of study"
              value={item.field}
              onChange={(v) => onItemChange({ ...item, field: v })}
            />
            <TextField
              label="Start"
              placeholder="2019"
              value={item.start}
              onChange={(v) => onItemChange({ ...item, start: v })}
            />
            <TextField
              label="End"
              placeholder="2023 / Present"
              value={item.end}
              onChange={(v) => onItemChange({ ...item, end: v })}
            />
            <div className="md:col-span-2">
              <TextArea
                label="Details"
                rows={3}
                value={item.details}
                onChange={(v) => onItemChange({ ...item, details: v })}
                placeholder="Relevant coursework, GPA, honors, activities..."
              />
            </div>
          </Grid>
        )}
      />
    </Section>
  );
}
