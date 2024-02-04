export default function useHeightList(start: number, end: number) {
  let arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i + `'`);
    for (let j = 1; j <= 9; j++) {
      arr.push(i + `'` + ' ' + j + `"`);
    }
  }
  return arr;
}
