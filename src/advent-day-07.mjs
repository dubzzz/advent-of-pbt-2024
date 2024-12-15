export default function (e) {
  const t = e.replace(/\/$/, "").split("/");
  let n = 0;
  const o = [];
  for (const r of t)
    if ("." === r || "" === r) {
      if (n > o.length) return e;
      for (let e = 0; e !== n; ++e) o.pop();
    } else if (".." === r) ++n;
    else {
      if (n > o.length) return e;
      for (let e = 0; e !== n; ++e) o.pop();
      (n = 0), o.push(r);
    }
  if (n >= o.length) return e;
  for (let r = 0; r !== n; ++r) o.pop();
  return "/" + o.join("/");
}
