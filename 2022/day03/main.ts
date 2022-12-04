type Rucksack = {
  left: Set<string>;
  right: Set<string>;
};

export function solution(data: string, findBadge = false): number {
  const lines = data.split("\n");
  const rucksacks = lines.map((line) => parseRucksack(line));
  let items: string[] = [];
  if (findBadge) {
    const groups = sliceIntoChunks(rucksacks, 3);
    items = groups.map((group) => findBadgeInGroup(group));
  } else {
    items = rucksacks.map((rucksack) => findOverlap(rucksack));
  }
  const priorities = items.map((results) => itemToPriority(results));
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

function findOverlap(rucksack: Rucksack): string {
  const values = intersection(rucksack.left, rucksack.right).values();
  const obj = values.next();
  const first = obj.value;
  return first;
}

function itemToPriority(item: string): number {
  const itemArray = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return itemArray.indexOf(item);
}

function findBadgeInGroup(rucksacks: Rucksack[]): string {
  let combined = new Set<string>();
  rucksacks.forEach((rucksack) => {
    const setOfItems = union(rucksack.left, rucksack.right);
    if (combined.size === 0) {
      combined = setOfItems;
    } else {
      combined = intersection(combined, setOfItems);
    }
  });

  const values = combined.values();
  const obj = values.next();
  const first = obj.value;

  return first;
}

// https://stackabuse.com/how-to-split-an-array-into-even-chunks-in-javascript/
function sliceIntoChunks(arr: Rucksack[], chunkSize: number) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
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

function union(setA: Set<string>, setB: Set<string>): Set<string> {
  const _union = new Set(setA);
  for (const elem of setB) {
    _union.add(elem);
  }
  return _union;
}
