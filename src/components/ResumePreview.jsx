import React from "react";

function range(a, b) {
  if (!a && !b) return "";
  if (a && !b) return `${a} – Present`;
  if (!a && b) return `${b}`;
  return `${a} – ${b}`;
}

export default function ResumePreview({ data }) {
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
          <p className="mt-2 leading-relaxed whitespace-pre-line">
            {data.summary.about}
          </p>
        </section>
      )}

      {!!data.experience?.length && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold">Experience</h3>
          <div className="mt-2 space-y-4">
            {data.experience.map((e, i) => (
              <div key={i}>
                <div className="font-medium">
                  {e.role || "Role"} — {e.company || "Company"}
                </div>
                <div className="text-sm text-gray-600">
                  {[e.location, range(e.start, e.end)].filter(Boolean).join(" · ")}
                </div>
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
                <div className="text-sm text-gray-600">
                  {[ed.degree, ed.field, range(ed.start, ed.end)]
                    .filter(Boolean)
                    .join(" · ")}
                </div>
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
                <div className="text-sm text-gray-800">
                  {data.skills.core.join(", ")}
                </div>
              </div>
            )}
            {!!data.skills.tools?.length && (
              <div className="mt-2">
                <div className="text-sm font-medium">Tools / Tech</div>
                <div className="text-sm text-gray-800">
                  {data.skills.tools.join(", ")}
                </div>
              </div>
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
}
