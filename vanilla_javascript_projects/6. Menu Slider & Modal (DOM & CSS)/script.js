const randomNumber = getRandomInt(1, 100);

const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const open = document.getElementById("open");
const modal = document.getElementById("modal");

// Toggle nav
toggle.addEventListener("click", () =>
  document.body.classList.toggle("show-nav")
);

// Show modal
open.addEventListener("click", () => modal.classList.add("show-modal"));

// Hide modal
close.addEventListener("click", () => modal.classList.remove("show-modal"));

// Hide modal on outside click
window.addEventListener("click", (e) =>
  e.target == modal ? modal.classList.remove("show-modal") : false
);

// Change user img when refresh
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

document.getElementById(
  "userImg"
).src = `https://randomuser.me/api/portraits/women/${randomNumber}.jpg`;
