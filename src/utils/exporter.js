import { range } from "./range.js";

export function renderStandaloneHTML(data) {
  const esc = (s) =>
    String(s || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

  const p = data.personal;

  const lines = [
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '  <meta charset="utf-8"/>',
    '  <meta name="viewport" content="width=device-width, initial-scale=1"/>',
    `  <title>${esc(p.fullName || "Resume")}</title>`,
    "  <style>",
    "   :root{--ink:#111;--muted:#555;--rule:#ddd;}",
    "   *{box-sizing:border-box;}body{font:14px/1.5 system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:var(--ink);margin:0;background:#fff;padding:32px;}",
    "   h1{font-size:28px;margin:0 0 4px} h2{font-size:16px;margin:24px 0 8px} .muted{color:var(--muted)} hr{border:0;border-top:1px solid var(--rule);margin:16px 0}",
    "   .section{margin-top:16px}",
    "   ul{margin:8px 0 0 18px}",
    "   @media print{ body{padding:0} }",
    "  </style>",
    "</head>",
    "<body>",
    "  <header>",
    `    <h1>${esc(p.fullName || "Your Name")}</h1>`,
    `    <div class="muted">${esc([p.location, p.phone, p.email, p.website].filter(Boolean).join(" · "))}</div>`,
    "  </header>",
    data.summary.about
      ? `<section class="section"><h2>Summary</h2><div>${esc(data.summary.about).replaceAll("\n","<br>")}</div></section>`
      : "",
    (data.experience || []).length
      ? `<section class="section"><h2>Experience</h2>${data.experience.map(e=>`
          <div><strong>${esc(e.role||"Role")} — ${esc(e.company||"Company")}</strong>
          <div class="muted">${esc([e.location, range(e.start,e.end)].filter(Boolean).join(" · "))}</div>
          ${(e.bullets||[]).filter(Boolean).length?`<ul>${
            e.bullets.filter(Boolean).map(b=>`<li>${esc(b)}</li>`).join("")
          }</ul>`:""}</div>
        `).join("")}</section>`
      : "",
    (data.education || []).length
      ? `<section class="section"><h2>Education</h2>${data.education.map(ed=>`
          <div><strong>${esc(ed.school||"School")}</strong>
          <div class="muted">${esc([ed.degree, ed.field, range(ed.start, ed.end)].filter(Boolean).join(" · "))}</div>
          ${ed.details?`<div>${esc(ed.details)}</div>`:""}</div>
        `).join("")}</section>`
      : "",
    (data.skills.core?.length || data.skills.tools?.length)
      ? `<section class="section"><h2>Skills</h2>${
          data.skills.core?.length?`<div><strong>Core:</strong> ${esc(data.skills.core.join(", "))}</div>`:""
        }${
          data.skills.tools?.length?`<div><strong>Tools / Tech:</strong> ${esc(data.skills.tools.join(", "))}</div>`:""
        }</section>`
      : "",
    "</body>",
    "</html>",
  ];

  return lines.join("\n");
}
