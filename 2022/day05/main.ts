type Stack = string[];

type Move = {
  source: number;
  destination: number;
  count: number;
};

type Challenge = {
  crateYard: Stack[];
  moves: Move[];
};

export function solution(data: string): string {
  let { crateYard, moves } = parseProblemInput(data);

  moves.forEach((move) => {
    crateYard = applyMove(crateYard, move);
  });
  return getTopCrates(crateYard);
}

function applyMove(stacks: Stack[], move: Move): Stack[] {
  for (let i = 0; i < move.count; i++) {
    const item = stacks[move.source - 1].pop();
    stacks[move.destination - 1].push(item || "?");
  }
  return stacks;
}

function getTopCrates(stacks: Stack[]): string {
  let result = "";
  stacks.forEach((stack) => {
    result = result.concat(stack.pop() || "?");
  });
  return result;
}

function parseProblemInput(data: string): Challenge {
  let stacks: string[][] = [];
  const moves: Move[] = [];

  data.split("\n").forEach((line) => {
    if (line.startsWith("move ")) {
      moves.push(parseMove(line));
    } else if (line.includes("[")) {
      stacks.push(parseCrates(line));
    }
  });

  stacks = transpose(stacks);
  stacks = stacks.map((stack) => stack.filter((i) => i !== " ").reverse());

  return { crateYard: stacks, moves: moves };
}

function parseCrates(line: string): string[] {
  const chunkedLines = sliceIntoChunks(line.split(""), 4);
  const data = chunkedLines.map((chunk) => chunk[1]);
  return data;
}

function parseMove(line: string): Move {
  const fields = line.split(" ");
  const source = parseInt(fields[3]);
  const destination = parseInt(fields[5]);
  const count = parseInt(fields[1]);
  return { source, destination, count };
}

// https://stackabuse.com/how-to-split-an-array-into-even-chunks-in-javascript/
function sliceIntoChunks(arr: string[], chunkSize: number) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
}

// http://www.java2s.com/ref/javascript/javascript-array-transpose.html
function transpose(matrix: string[][]): string[][] {
  const transposed: string[][] = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (i === 0) transposed.push([]);
      transposed[j].push(matrix[i][j]);
    }
  }
  return transposed;
}
