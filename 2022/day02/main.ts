// A for Rock, B for Paper, and C for Scissors
enum OpponentMove {
  ROCK = "A",
  PAPER = "B",
  SCISSORS = "C",
}

// X for Rock, Y for Paper, and Z for Scissors
enum PlayerMove {
  ROCK = "X",
  PAPER = "Y",
  SCISSORS = "Z",
}

type Round = {
  opponentMove: OpponentMove;
  playerMove: PlayerMove;
};

export function solution(data: string): number {
  const lines = data.split("\n");
  const moves = lines.map((line) => line.split(" "));
  const rounds = moves.map((move) => parseRound(move[0], move[1]));
  const scores = rounds.map((round) =>
    shapeScore(round.playerMove) + roundScore(round)
  );
  const finalScore = scores.reduce((a, b) => a + b);
  return finalScore;
}

function parseRound(left: string, right: string): Round {
  const opponentMove = left as OpponentMove;
  const playerMove = right as PlayerMove;
  return { opponentMove, playerMove } as Round;
}

// The score for a single round is the score for the shape you selected:
// (1 for Rock, 2 for Paper, and 3 for Scissors)
function shapeScore(playerMove: PlayerMove): number {
  switch (playerMove) {
    case PlayerMove.ROCK:
      return 1;
    case PlayerMove.PAPER:
      return 2;
    case PlayerMove.SCISSORS:
      return 3;
  }
}

// plus the score for the outcome of the round:
// (0 if you lost, 3 if the round was a draw, and 6 if you won).
function roundScore(round: Round): number {
  if (
    round.opponentMove === OpponentMove.ROCK &&
    round.playerMove === PlayerMove.ROCK
  ) {
    return 3;
  } else if (
    round.opponentMove === OpponentMove.ROCK &&
    round.playerMove === PlayerMove.PAPER
  ) {
    return 6;
  } else if (
    round.opponentMove === OpponentMove.ROCK &&
    round.playerMove === PlayerMove.SCISSORS
  ) {
    return 0;
  } else if (
    round.opponentMove === OpponentMove.PAPER &&
    round.playerMove === PlayerMove.ROCK
  ) {
    return 0;
  } else if (
    round.opponentMove === OpponentMove.PAPER &&
    round.playerMove === PlayerMove.PAPER
  ) {
    return 3;
  } else if (
    round.opponentMove === OpponentMove.PAPER &&
    round.playerMove === PlayerMove.SCISSORS
  ) {
    return 6;
  } else if (
    round.opponentMove === OpponentMove.SCISSORS &&
    round.playerMove === PlayerMove.ROCK
  ) {
    return 6;
  } else if (
    round.opponentMove === OpponentMove.SCISSORS &&
    round.playerMove === PlayerMove.PAPER
  ) {
    return 0;
  } else if (
    round.opponentMove === OpponentMove.SCISSORS &&
    round.playerMove === PlayerMove.SCISSORS
  ) {
    return 3;
  }
  throw new Error(
    `Round not handled: ${round.opponentMove} ${round.playerMove}`,
  );
}
