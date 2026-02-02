/*
The gmae board should be a multidimensional array of three, and houses the following characters

top row =[Tl,Tm,Tr]
mid row =[Ml,Mm,Mr]
last row =[Ll,Lm,Lr]

winning value is
the above set up, and [Tl,Ml,Ll],[Tm,Mm,Lm],[Tr,Mr,Lr],[Tl,Mm,Lr],[Tr,Mm,Ll]

game array[null,null,null,null,null,null,null,null,null]

winning array(horizontal) = [0,1,2],[3,4,5],[6,7,8]
winning array(vertical) = [0,3,6],[1,4,7],[2,5,8]
winning array(cross) = [0,4,8],[2,4,6]
*/

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

function sampleGamePlay(playerId: "x" | "o") {
 let game = GameInstance();

 let playerTwo = [1, 4, 5, 6, 2];

 playerTwo.forEach((item) => {
  game.recPlayerPos(playerId, item);
 });

 console.log(game.getGameBoard().toString());
}

sampleGamePlay("o");
