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

// X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win.
enum PlayerIntent {
  LOSE = "X",
  DRAW = "Y",
  WIN = "Z",
}

type Round = {
  opponentMove: OpponentMove;
  playerMove: PlayerMove;
};

export function solution(data: string, fix = false): number {
  const lines = data.split("\n");
  const moves = lines.map((line) => line.split(" "));
  let rounds = moves.map((move) => parseRound(move[0], move[1]));
  if (fix) {
    rounds = rounds.map((round) => fixRoundMoves(round));
  }
  const scores = rounds.map((round) =>
    shapeScore(round.playerMove) + roundScore(round)
  );
  const finalScore = scores.reduce((a, b) => a + b);
  return finalScore;
}

function fixRoundMoves(round: Round): Round {
  switch (round.playerMove.valueOf()) {
    case PlayerIntent.WIN:
      return getWinningRound(round);
    case PlayerIntent.DRAW:
      return getDrawingRound(round);
    case PlayerIntent.LOSE:
      return getLosingRound(round);
  }
  return round;
}

function getWinningRound(round: Round): Round {
  switch (round.opponentMove) {
    case OpponentMove.ROCK:
      return { opponentMove: round.opponentMove, playerMove: PlayerMove.PAPER };
    case OpponentMove.PAPER:
      return {
        opponentMove: round.opponentMove,
        playerMove: PlayerMove.SCISSORS,
      };
    case OpponentMove.SCISSORS:
      return { opponentMove: round.opponentMove, playerMove: PlayerMove.ROCK };
  }
}

function getDrawingRound(round: Round): Round {
  switch (round.opponentMove) {
    case OpponentMove.ROCK:
      return { opponentMove: round.opponentMove, playerMove: PlayerMove.ROCK };
    case OpponentMove.PAPER:
      return { opponentMove: round.opponentMove, playerMove: PlayerMove.PAPER };
    case OpponentMove.SCISSORS:
      return {
        opponentMove: round.opponentMove,
        playerMove: PlayerMove.SCISSORS,
      };
  }
}

function getLosingRound(round: Round): Round {
  switch (round.opponentMove) {
    case OpponentMove.ROCK:
      return {
        opponentMove: round.opponentMove,
        playerMove: PlayerMove.SCISSORS,
      };
    case OpponentMove.PAPER:
      return { opponentMove: round.opponentMove, playerMove: PlayerMove.ROCK };
    case OpponentMove.SCISSORS:
      return { opponentMove: round.opponentMove, playerMove: PlayerMove.PAPER };
  }
}

function parseRound(left: string, right: string): Round {
  const opponentMove = left as OpponentMove;
  const playerMove = right as PlayerMove;
  return { opponentMove, playerMove };
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
