export function solution(data: string, topN = 1): number {
  const lines = data.split("\n");
  const values: number[] = [];
  lines.forEach((line) => {
    if (line == "") {
      values.push(0);
    } else {
      values.push((values.pop() || 0) + parseInt(line));
    }
  });
  return (
    values
      .sort((a, b) => a - b)
      .slice(-topN)
      .reduce((a, b) => a + b)
  );
}
