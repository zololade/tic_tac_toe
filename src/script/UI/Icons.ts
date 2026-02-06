export const ICON_X = `<svg
 width="100"
 height="100"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 stroke-width="6"
 stroke-linecap="round"
 stroke-linejoin="round"
>
 <line x1="18" y1="6" x2="6" y2="18"></line>
 <line x1="6" y1="6" x2="18" y2="18"></line>
</svg>`;

export const ICON_O = `<svg
 width="100"
 height="100"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 stroke-width="6"
>
 <circle cx="12" cy="12" r="7"></circle>
</svg>`;

const logoX = document.querySelector(".logo .x");
if (logoX) logoX.innerHTML = ICON_X;
const logoO = document.querySelector(".logo .o");
if (logoO) logoO.innerHTML = ICON_O;
