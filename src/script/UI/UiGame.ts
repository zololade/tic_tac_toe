import GameInstance from "../game/Game";
import { ICON_X, ICON_O } from "./Icons";

export function gameStart() {
 let game = GameInstance();

 let playerId = "x";
 let cell = document.querySelectorAll(".cell");
 let state = "continue";

 console.log(cell);
 cell.forEach((currentCell) => {
  currentCell?.addEventListener("click", (e) => {
   //grabinput
   const target = e.target as HTMLDivElement;
   let targetCell = target.closest(".cell") as HTMLDivElement;
   let cellId = targetCell?.dataset.cellNumber;

   // validate
   try {
    // send input
    if (cellId) game.recPlayerPos(playerId, +cellId);

    //handle ui update
    if (game.getGameState() === "continue" || state === "continue") {
     //update ui
     targetCell.classList.add(`${playerId === "x" ? "x" : "o"}-color`);
     targetCell.innerHTML = playerId === "x" ? ICON_X : ICON_O;

     if (state === "continue") {
      state = game.getGameState();
      console.log(state);
     }
    }

    // alert win
    setTimeout(() => {
     if (game.getGameState() === "wins") alert("we have a winner");
    }, 5);
    playerId = playerId === "x" ? "o" : "x";
   } catch (err) {
    if (err) {
     console.log("cell occupied");
    }
   }
  });
 });
}

gameStart();
