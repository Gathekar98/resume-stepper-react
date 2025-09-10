export function range(a, b) {
    if (!a && !b) return "";
    if (a && !b) return `${a} – Present`;
    if (!a && b) return `${b}`;
    return `${a} – ${b}`;
  }
  