export default function (e) {
  let t = e;
  const n = Math.floor(Math.sqrt(t));
  let o = 0;
  for (let r = 2; r <= n; ++r) t % r == 0 && (++o, (t /= r));
  return 1 === o && t * t !== e;
}
