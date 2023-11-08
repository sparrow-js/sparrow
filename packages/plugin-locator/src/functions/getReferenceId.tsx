const map = new WeakMap();
let lastId = 0;

export function getReferenceId(ref: object): number {
  if (!map.has(ref)) {
    lastId++;
    map.set(ref, lastId);
  }
  return map.get(ref);
}
