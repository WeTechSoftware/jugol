export default function useWeightList(start: number, end: number) {
  let arr = [];
  for (let i = start; i < end; i++) {
    arr.push((i + 1).toString() + ' kg');
  }
  return arr;
}
