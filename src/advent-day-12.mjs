export default function (t, n, o) {
  const r = Object.fromEntries(
    [t, n, ...o.map((e) => e.from), ...o.map((e) => e.to)].map((e) => [
      e,
      { distance: Number.POSITIVE_INFINITY, edges: [] },
    ])
  );
  for (r[t] && (r[t] = { distance: 0, edges: [] }); ; ) {
    const t = e(r);
    if (void 0 === t) return;
    const a = r[t];
    if (t === n) return a.edges;
    delete r[t];
    for (const e of o)
      e.from === t &&
        r[e.to] &&
        (r[e.to] = {
          distance: a.distance + e.distance,
          edges: [...a.edges, e],
        });
  }
}
function e(e) {
  let t,
    n = Number.POSITIVE_INFINITY;
  for (const [o, { distance: r }] of Object.entries(e))
    r < n && ((t = o), (n = r));
  return t;
}
