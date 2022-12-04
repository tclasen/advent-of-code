type Rucksack = {
  left: Set<string>;
  right: Set<string>;
};

export function solution(data: string): number {
  const lines = data.split("\n");
  const rucksacks = lines.map((line) => parseRucksack(line));
  const overlap = rucksacks.map((rucksack) => findOverlap(rucksack));
  const priorities = overlap.map((results) => totalRucksackPriority(results));
  console.log(priorities);
  return priorities.reduce((a, b) => a + b);
}

function parseRucksack(data: string): Rucksack {
  const half = Math.floor(data.length / 2);

  const leftString = data.slice(0, half);
  const rightString = data.slice(half, data.length);

  const left = new Set<string>(leftString);
  const right = new Set<string>(rightString);

  return { left, right };
}

function findOverlap(rucksack: Rucksack): Set<string> {
  return intersection(rucksack.left, rucksack.right);
}

function totalRucksackPriority(overlap: Set<string>): number {
  return (
    Array.from(overlap)
      .map((item) => itemToPriority(item))
      .reduce((a, b) => a + b)
  );
}

function itemToPriority(item: string): number {
  const itemArray = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return itemArray.indexOf(item);
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
function intersection(setA: Set<string>, setB: Set<string>): Set<string> {
  const _intersection = new Set<string>();
  for (const elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}
