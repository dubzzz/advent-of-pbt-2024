export default function (t, n) {
  const o = e(t, n, 0);
  return void 0 === o ? t : o.join(" ");
}
function e(t, n, o) {
  if (o === t.length) return [];
  for (const r of n)
    if (t.startsWith(r, o)) {
      const a = e(t, n, o + r.length);
      return void 0 !== a ? [r, ...a] : void 0;
    }
}
