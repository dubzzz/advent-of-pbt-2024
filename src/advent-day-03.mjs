export default function (n, o) {
  const r = e(o);
  let a = null,
    s = null;
  for (let i = 0; i <= n.length - o.length; i += 1) {
    const l = n.substring(i, i + o.length);
    if (((s = null === s ? e(l) : t(s, a, l)), (a = l), r === s)) {
      let e = 0;
      for (let t = 0; t < o.length; t += 1) o[t] === n[i + t] && (e += 1);
      if (e === o.length) return !0;
    }
  }
  return !1;
}
function e(e) {
  let t = 0;
  for (let n = 0; n < e.length; n += 1) t += e[n].charCodeAt(0) * 97 ** n;
  return t;
}
function t(e, t, n) {
  const o = n.length - 1;
  let r = e - t[0].charCodeAt(0);
  return (r /= 97), (r += n[o].charCodeAt(0) * 97 ** o), r;
}