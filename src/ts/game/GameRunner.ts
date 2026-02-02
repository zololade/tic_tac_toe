import GameInstance from "./Game";

//define an input grabber function first for testing purpose
export function grabInput(player: string) {
 let input = prompt(`your turn ${player}`);

 if (!input || isNaN(+input)) {
  return grabInput(player);
 } else if (+input > 8 || +input < 0) {
  return grabInput(player);
 }

 return input;
}

export default function GameRunner() {
 //start game function
 const startGame = function () {
  let game = GameInstance();

  //using state to track input first to achive a minimal working set up
  let currentPlayer = "x";

  while (game.getGameState() === "continue") {
   let moveSuccess = false;
   //collect user input, first player = x, second player = o
   let playerInput = grabInput(currentPlayer);
   while (!moveSuccess) {
    try {
     game.recPlayerPos(currentPlayer, +playerInput);
     moveSuccess = true;
    } catch (err) {
     console.error({ message: "Bad input" });
     playerInput = grabInput(currentPlayer);
    }
   }

   console.log(game.getGameBoard(), `${currentPlayer} ${game.getGameState()}`);

   currentPlayer === "x" ? (currentPlayer = "o") : (currentPlayer = "x");
  }
 };

 //restart game function
 // new game function
 //
 //
 return {
  startGame,
 };
}
