// type Cell = number | null
type PlayerId = "x" | "o";

type Move = {
 playerId: PlayerId;
 index: number;
};

export default function GameInstance() {
 // Creates: [null, null, null, null, null, null, null, null, null]
 let gameBoard: (Move | null)[] = Array(9).fill(null);
 let gameState: "continue" | "wins" | "draw" = "continue";

 //decleare win conditions
 const WinCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
 ];

 const scoreBoard: Record<"x" | "o" | "tie", number> = {
  x: 0,
  tie: 0,
  o: 0,
 };

 //reset board
 const resetGameBoard = () => {
  gameBoard = Array(9).fill(null);
  gameState = "continue";
 };

 //get game board
 const getGameBoard = () => {
  return gameBoard.map((value) => value);
 };

 //get game gameState
 const getGameState = () => {
  return gameState;
 };

 //get player input
 const getPlayerInputs = (playerId: string) => {
  return gameBoard
   .filter((m): m is Move => m !== null && m.playerId === playerId)
   .map((m) => m.index);
 };

 //populate board
 const populateBoard = (move: Move) => {
  if (gameBoard[move.index] !== null) {
   throw new Error("Cell already occupied");
  }

  gameBoard = gameBoard.map((v, i) => (i === move.index ? move : v));
 };

 // record player position
 function recPlayerPos(playerId: PlayerId, index: number) {
  if (gameState === "wins" || gameState === "draw") return;
  populateBoard({ playerId, index });

  const playerInputs = getPlayerInputs(playerId);
  gameState = confirmWin(playerInputs);

  if (gameState === "draw") {
   scoreBoard["tie"] += 1;
  } else if (gameState === "wins") {
   scoreBoard[playerId] += 1;
  }
 }

 //confirmWin
 function confirmWin(playerInputs: number[]) {
  let isBoardFull = gameBoard.every((el) => el !== null);

  for (let [a, b, c] of WinCondition) {
   if (
    playerInputs.includes(a) &&
    playerInputs.includes(b) &&
    playerInputs.includes(c)
   ) {
    return "wins";
   }
  }

  if (isBoardFull) {
   return "draw";
  }
  return "continue";
 }

 return {
  getGameBoard,
  recPlayerPos,
  getGameState,
  resetGameBoard,
  scoreBoard,
 };
}
