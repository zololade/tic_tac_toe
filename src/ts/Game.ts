type Cell = number | null;

export default function GameInstance() {
 // Creates: [null, null, null, null, null, null, null, null, null]
 let gameBoard: Cell[] = Array(9).fill(null);
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

 //get game board
 const getGameBoard = () => {
  return gameBoard;
 };

 //GR:gameRecord
 const playerOneGR: number[] = [];
 const playerTwoGR: number[] = [];

 //populate board

 const populateBoard = (index: number) => {
  if (gameBoard[index] !== null) {
   throw new Error("Cell already occupied");
  }

  gameBoard = gameBoard.map((v, i) => (i === index ? index : v));
 };

 // record player position
 function recPlayerPos(playerId: string, data: number) {
  if (gameState === "wins" || gameState === "draw") return;
  populateBoard(data);

  if (playerId === "x") {
   playerOneGR.push(data);
   gameState = confirmWin(playerOneGR);
  } else if (playerId === "o") {
   playerTwoGR.push(data);
   gameState = confirmWin(playerTwoGR);
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
 };
}
