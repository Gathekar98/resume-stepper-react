import React from "react";
import Section from "../components/Section.jsx";
import Grid from "../components/Grid.jsx";
import TextField from "../components/inputs/TextField.jsx";

export default function PersonalStep({ data, update }) {
  return (
    <Section title="Personal details" subtitle="These show up at the top of your resume.">
      <Grid cols={2}>
        <TextField
          label="Full name"
          value={data.personal.fullName}
          onChange={(v) => update(["personal", "fullName"], v)}
          required
        />
        <TextField
          label="Email"
          type="email"
          value={data.personal.email}
          onChange={(v) => update(["personal", "email"], v)}
          required
        />
        <TextField
          label="Phone"
          value={data.personal.phone}
          onChange={(v) => update(["personal", "phone"], v)}
        />
        <TextField
          label="Location"
          value={data.personal.location}
          onChange={(v) => update(["personal", "location"], v)}
        />
        <TextField
          label="Website / LinkedIn"
          value={data.personal.website}
          onChange={(v) => update(["personal", "website"], v)}
        />
      </Grid>
    </Section>
  );
}
