export default function (t, n) {
  for (let r = 0; r !== t.length; ++r)
    for (let o = 0; o !== t[0].length; ++o) {
      const a = { x: o, y: r };
      if (e(t, a, n)) return a;
    }
}
function e(e, t, n) {
  for (let r = 0; r !== n.height; ++r) {
    if (!e[t.y + r]?.[t.x]) return !1;
    if (!e[t.y + r]?.[t.x + n.width - 1]) return !1;
  }
  for (let r = 0; r !== n.width; ++r) {
    if (!e[t.y]?.[t.x + r]) return !1;
    if (!e[t.y + n.height - 1]?.[t.x + r]) return !1;
  }
  return !0;
}
