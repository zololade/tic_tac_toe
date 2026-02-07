import GameInstance from "../game/Game";
import { ICON_X, ICON_O } from "./Icons";

export function gameStart() {
 let game = GameInstance();

 let playerId: "x" | "o" = "x";
 let cell = document.querySelectorAll(".cell");
 let turn = document.querySelector(".turnCharacter");
 let resetButton = document.querySelector(".retry");
 if (turn) turn.innerHTML = ICON_X;
 let turnParent = turn?.parentNode as HTMLElement;
 turnParent.classList.add("x-color");
 const [boardX, tieBoard, boardO] = Array.from(
  document.querySelectorAll(".scoreBoard>*"),
 );

 cell.forEach((currentCell) => {
  currentCell?.addEventListener("click", (e) => {
   //grabinput
   const target = (e.target as HTMLDivElement).closest(".cell") as HTMLElement;
   if (!target) return;
   let cellId = target.dataset.cellNumber;

   // validate
   try {
    if (game.getGameState() !== "continue") return;
    // send input
    if (cellId) game.recPlayerPos(playerId, +cellId);

    //update ui
    target.classList.add(`${playerId === "x" ? "x" : "o"}-color`);
    target.innerHTML = playerId === "x" ? ICON_X : ICON_O;

    //turn color and icon
    if (turn) turn.innerHTML = playerId === "x" ? ICON_O : ICON_X;
    turnParent.classList.remove("x-color", "o-color");
    turnParent.classList.add(`${playerId === "x" ? "o" : "x"}-color`);

    // alert win
    if (game.getGameState() === "wins") {
     alert("we have a winner");
    }

    playerId = playerId === "x" ? "o" : "x";
   } catch (err) {
    if (err) {
     console.log("cell occupied");
    }
   }
  });
 });

 function resetLogic() {
  let value = ".scoreBoard-value";
  const recordTie = tieBoard?.querySelector<HTMLElement>(value);
  const recordX = boardX?.querySelector<HTMLElement>(value);
  const recordO = boardO?.querySelector<HTMLElement>(value);
  if (recordTie) recordTie.textContent = game.scoreBoard.tie.toString();
  if (recordX) recordX.textContent = game.scoreBoard.x.toString();
  if (recordO) recordO.textContent = game.scoreBoard.o.toString();

  game.resetGameBoard();

  //update ui
  cell.forEach((currentCell) => {
   currentCell.classList.remove("o-color", "x-color");
   currentCell.innerHTML = "";
  });

  //turn color and icon
  if (turn) turn.innerHTML = ICON_X;
  turnParent.classList.remove("o-color", `x-color`);
  turnParent.classList.add("x-color");

  playerId = "x";
 }
 resetButton?.addEventListener("click", resetLogic);
}

gameStart();
