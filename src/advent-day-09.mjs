export default function (e) {
  const t = e.length - 1,
    n = Math.floor(t / 2);
  for (let r = 0; r < n; ++r) if (e[r] !== e[t - r]) return !1;
  return !0;
}
