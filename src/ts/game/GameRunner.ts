export default function GameRunner(playerId: "x" | "o") {
 let game = GameInstance();

 let playerTwo = [1, 4, 5, 6, 2];

 playerTwo.forEach((item) => {
  game.recPlayerPos(playerId, item);
 });

 console.log(game.getGameBoard().toString());
}

sampleGamePlay("o");
