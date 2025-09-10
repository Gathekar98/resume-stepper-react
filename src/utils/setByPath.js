export function setByPath(obj, path, value) {
    const clone = JSON.parse(JSON.stringify(obj));
    const [head, ...rest] = Array.isArray(path) ? path : String(path).split(".");
    if (!rest.length) {
      clone[head] = value;
      return clone;
    }
    clone[head] = setByPath(clone[head] ?? {}, rest, value);
    return clone;
  }
  