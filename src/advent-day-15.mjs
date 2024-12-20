export default function () {
  const e = [...Array(5)],
    t = [0, 2, 1, 4, 3];
  let n = 0,
    r = 0;
  return {
    put: () => {
      const n = t[r];
      return void 0 !== e[n] ? -1 : ((e[n] = {}), (r = (r + 1) % 5), n);
    },
    pop: () => {
      const r = t[n];
      return void 0 === e[r] ? -1 : ((e[r] = void 0), (n = (n + 1) % 5), r);
    },
    isEmpty: () => n === r,
  };
}
