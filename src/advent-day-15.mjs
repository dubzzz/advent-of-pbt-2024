export default function () {
  const e = [...Array(5)],
    t = [0, 2, 1, 4, 3];
  let n = 0;
  return {
    put: () => {
      const r = t[n];
      return void 0 !== e[r] ? -1 : ((e[r] = {}), (n = (n + 1) % 5), r);
    },
    pop: () => {
      const r = (n - 1 + 5) % 5,
        o = t[r];
      return void 0 === e[o] ? -1 : ((e[o] = void 0), (n = r), o);
    },
    isEmpty: () => 0 === n,
  };
}
