import GameInstance from "../game/Game";
import { ICON_X, ICON_O } from "./Icons";

//helper functions
// played cell
function renderPlayedCell(cell: HTMLElement, playerId: "x" | "o") {
 //update ui
 cell.classList.add(`${playerId === "x" ? "x" : "o"}-color`);
 cell.innerHTML = playerId === "x" ? ICON_X : ICON_O;
}

//renderTurnIndicator
function renderTurnIndicator(
 turn: Element | null,
 turnParent: HTMLElement,
 player: "x" | "o",
) {
 //turn color and icon
 if (!turn) return;
 turn.innerHTML = player === "x" ? ICON_X : ICON_O;
 turnParent.classList.remove("x-color", "o-color");
 turnParent.classList.add(`${player}-color`);
}

//winningCell
function renderWinningCells(positions: number[], winner: "x" | "o") {
 document
  .querySelectorAll(positions.map((p) => `[data-cell-number="${p}"]`).join(","))
  .forEach((cell) => {
   cell.classList.remove("x-color", "o-color");
   cell.classList.add("winningCell", `${winner.toUpperCase()}winningCell`);
  });
}

//renderDialog
function renderDialog(
 winner: Element | null,
 player: "x" | "o",
 dialog: HTMLDialogElement,
) {
 if (dialog.open) return;
 if (!winner) return;
 winner.classList.add(`${player === "x" ? "x" : "o"}-color`);
 winner.innerHTML = player === "x" ? ICON_X : ICON_O;
 setTimeout(() => dialog.showModal(), 500);
}

//reset dialog
function clearDialog(winner: Element | null, dialog: HTMLDialogElement) {
 if (!winner) return;
 winner.classList.remove(`o-color`, "x-color");
 winner.innerHTML = "";
 dialog.close();
}

//updateScoreBoard
function updateScoreBoard(
 resultBoard: Element[],
 scoreBoard: Record<"x" | "o" | "tie", number>,
) {
 let [boardX, tieBoard, boardO] = resultBoard;
 let value = ".scoreBoard-value";
 const recordTie = tieBoard?.querySelector<HTMLElement>(value);
 const recordX = boardX?.querySelector<HTMLElement>(value);
 const recordO = boardO?.querySelector<HTMLElement>(value);
 if (recordTie) recordTie.textContent = scoreBoard.tie.toString();
 if (recordX) recordX.textContent = scoreBoard.x.toString();
 if (recordO) recordO.textContent = scoreBoard.o.toString();
}

//reset board
function resetBoardUI(cell: NodeListOf<Element>) {
 cell.forEach((currentCell) => {
  currentCell.classList.remove(
   "o-color",
   "x-color",
   "winningCell",
   "OwinningCell",
   "XwinningCell",
  );
  currentCell.innerHTML = "";
 });
}

//reset turn
function resetTurnUI(turn: Element | null, turnParent: HTMLElement) {
 if (!turn) return;
 turn.innerHTML = ICON_X;
 turnParent.classList.remove("o-color", `x-color`);
 turnParent.classList.add("x-color");
}

export function gameStart() {
 let game = GameInstance();

 type Player = "x" | "o";
 let currentPlayer: Player = "x";
 let cells = document.querySelectorAll(".cell");
 let turn = document.querySelector(".turnCharacter");
 let winnerIcon = document.querySelector(".winnerCharacter");
 let resetButton = document.querySelector(".retry");
 if (turn) turn.innerHTML = ICON_X;
 let turnParent = turn?.parentNode as HTMLElement;
 turnParent.classList.add("x-color");
 const scoreBoard = Array.from(document.querySelectorAll(".scoreBoard>*"));
 let dialog = document.querySelector(".gameDialog") as HTMLDialogElement;
 let continueButton = document.querySelector(
  ".continue-button",
 ) as HTMLButtonElement;
 let quitButton = document.querySelector(".quit-button") as HTMLButtonElement;

 //handle ui
 cells.forEach((currentCell) => {
  currentCell?.addEventListener("click", (e) => {
   //grabinput
   const target = (e.target as HTMLDivElement).closest(".cell") as HTMLElement;
   if (!target) return;
   let cellId = target.dataset.cellNumber;

   // validate
   if (!cellId) return;
   if (!game.canPlay(+cellId)) return;
   if (game.getGameState() !== "continue") return;
   // send input
   if (cellId) game.recPlayerPos(currentPlayer, +cellId);
   //update ui
   renderPlayedCell(target, currentPlayer);
   //turn color and icon
   const nextPlayer = currentPlayer === "x" ? "o" : "x";
   renderTurnIndicator(turn, turnParent, nextPlayer);
   // display winnner
   if (game.getGameState() === "wins") {
    let positions = game.getWinningCombination();
    renderWinningCells(positions, currentPlayer);
    renderDialog(winnerIcon, currentPlayer, dialog);
   }
   //update player
   currentPlayer = currentPlayer === "x" ? "o" : "x";
  });
 });

 //handle rese and continue
 function resetLogic() {
  clearDialog(winnerIcon, dialog);
  //updateScoreBoard
  updateScoreBoard(scoreBoard, game.scoreBoard);
  // resetBoard
  game.resetGameBoard();
  //update ui
  resetBoardUI(cells);
  // reset turn color and icon
  resetTurnUI(turn, turnParent);
  //reset player
  currentPlayer = "x";
 }

 resetButton?.addEventListener("click", resetLogic);
 continueButton.addEventListener("click", resetLogic);
 quitButton.addEventListener("click", () => {
  window.location.reload();
 });
}

gameStart();
