export default function (e, t, n) {
  const r = (e) =>
    Array.from({ length: 8 }).reduce(
      (e) => (1 & e ? 3988292384 ^ (e >>> 1) : e >>> 1),
      e
    );
  let o = String(n);
  for (let s = 0; s !== Math.max(e.length, t.length); ++s)
    o += (e[s] ?? "") + (t[s] ?? "");
  o = encodeURIComponent(o);
  let a = ~0;
  for (let s = 0; s < o.length; s++) {
    a = (a >>> 8) ^ r(255 & (a ^ o.charCodeAt(s)));
  }
  return (
    (a = ~a >>> 0),
    `https://my-history.santa-web/${encodeURIComponent(e)}-${encodeURIComponent(
      t
    )}-${a.toString(16)}`
  );
}
