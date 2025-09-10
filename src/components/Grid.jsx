import React from "react";

export default function Grid({ cols = 2, children }) {
  return (
    <div className={["grid gap-4", cols === 2 ? "md:grid-cols-2" : ""].join(" ")}>
      {children}
    </div>
  );
}
