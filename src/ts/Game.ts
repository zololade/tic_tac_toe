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

export default function GameInstance() {
 let gameBoard: number[] = [];

 const WinCondition = [
  "0,1,2",
  "3,4,5",
  "6,7,8",
  "0,3,6",
  "1,4,7",
  "2,5,8",
  "0,4,8",
  "2,4,6",
 ];

 //GR:gameRecord
 const playerOneGR: string[] = [];
 const playerTwoGR: string[] = [];

 //populate board
 const populateBoard = (data: string) => {
  const insertAt = (array: number[], index: number, newData: number) => [
   ...array.slice(0, index),
   newData,
   ...array.slice(index),
  ];
  gameBoard = insertAt(gameBoard, +data, +data);
 };

 // record player position
 function recPlayerPos(playerId: number, data: string) {
  populateBoard(data);

  if (playerId === 1) {
   playerOneGR.push(data);
  } else if (playerId === 2) {
   playerTwoGR.push(data);
  }
 }

 //confirmWin
 function confirmWin(playerInputs: string[]) {
  let outcome: string = "";

  for (let condition of WinCondition) {
   const currentCondition = condition.split(",");

   const firstValidation = playerInputs.includes(currentCondition[0]);
   const secondValidation = playerInputs.includes(currentCondition[1]);
   const thirdValidation = playerInputs.includes(currentCondition[2]);

   if (firstValidation && secondValidation && thirdValidation) {
    outcome = "wins";
    break;
   }
  }
  return outcome ? outcome : "lost";
 }

 return {
  gameBoard,
  recPlayerPos,
  confirmWin,
 };
}

function sampleGamePlay() {
 let game = GameInstance();
 let playerOne = ["0", "3", "8", "7"];
 // let playerTwo = ["1", "4", "5", "6", "2"];

 playerOne.forEach((item) => {
  game.recPlayerPos(1, item);
 });
}

sampleGamePlay();
