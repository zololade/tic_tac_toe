// import { ICON_O, ICON_X } from "./Icons";
let board = document.querySelector(".board");

const dFrag = document.createDocumentFragment();

for (let x = 0; x <= 8; x++) {
 let cell = document.createElement("div");

 cell.classList.add("cell");

 cell.dataset.cellNumber = `${x}`;

 dFrag.appendChild(cell);
}

board?.appendChild(dFrag);
