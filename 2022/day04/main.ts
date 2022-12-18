export function solution(data: string, anyOverlap = false): number {
  const lines = data.split("\n");
  const pairs = lines.map((line) => line.split(","));
  const sets = pairs.map(
    (pair) => [buildSetRange(pair[0]), buildSetRange(pair[1])],
  );

  const elfIntersections = sets.map((set) => intersection(set[0], set[1]));
  const elfIntersectionCounts = elfIntersections.map((set) => set.size);

  const smallestCounts = sets.map((set) => smallestElfSet(set[0], set[1]));
  const combined = zip([elfIntersectionCounts, smallestCounts]);

  let completeOverlaps = null;
  if (anyOverlap) {
    completeOverlaps = combined.filter((zipped) => zipped[0] > 0);
  } else {
    completeOverlaps = combined.filter((zipped) => zipped[0] === zipped[1]);
  }
  return completeOverlaps.length;
}

function buildSetRange(originalRange: string): Set<number> {
  const [start, stop] = originalRange.split("-").map((i) => parseInt(i));
  const fullListOfItems = Array.from(
    { length: stop - start + 1 },
    (_, i) => i + start,
  );
  return new Set<number>(fullListOfItems);
}

function smallestElfSet(leftElf: Set<number>, rightElf: Set<number>): number {
  return Math.min(leftElf.size, rightElf.size);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
function intersection(setA: Set<number>, setB: Set<number>): Set<number> {
  const _intersection = new Set<number>();
  for (const elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}

// https://stackoverflow.com/questions/4856717/javascript-equivalent-of-pythons-zip-function
function zip(arrays: number[][]) {
  return arrays[0].map(function (_, i) {
    return arrays.map(function (array) {
      return array[i];
    });
  });
}
