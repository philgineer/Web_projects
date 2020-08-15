const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a card in DOM
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
  <div class="inner-card">
          <div class="inner-card-front">
            <p>
             ${data.question}
            </p>
          </div>
          <div class="inner-card-back">
            <p>
            ${data.answer}
            </p>
          </div>
        </div>
  `;

  card.addEventListener("click", () => {
    card.classList.toggle("show-answer");
  });

  // Add to DOM cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Add cards to local storage
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

createCards();

// Get cards from local storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

// Event listeners

nextBtn.addEventListener("click", rightBtn);

function rightBtn() {
  if (cardsEl.length == 2) {
    cardsEl[currentActiveCard].className = "card right";
    currentActiveCard += 1;
    if (currentActiveCard > cardsEl.length - 1) {
      currentActiveCard = 0;
    }
    cardsEl[currentActiveCard].className = "card active";
    updateCurrentText();
  } else {
    for (i = 0; i < cardsEl.length; i++) {
      cardsEl[i].className = "card right";
    }
    cardsEl[currentActiveCard].className = "card left";
    currentActiveCard += 1;
    if (currentActiveCard > cardsEl.length - 1) {
      currentActiveCard = 0;
    }
    cardsEl[currentActiveCard].className = "card active";
    updateCurrentText();
  }
}

prevBtn.addEventListener("click", leftBtn);

function leftBtn() {
  if (cardsEl.length === 2) {
    cardsEl[currentActiveCard].className = "card left";
    currentActiveCard += 1;
    if (currentActiveCard > cardsEl.length - 1) {
      currentActiveCard = 0;
    }
    cardsEl[currentActiveCard].className = "card active";
    updateCurrentText();
  } else {
    for (i = 0; i < cardsEl.length; i++) {
      cardsEl[i].className = "card left";
    }
    cardsEl[currentActiveCard].className = "card right";
    currentActiveCard -= 1;
    if (currentActiveCard < 0) {
      currentActiveCard = cardsEl.length - 1;
    }
    cardsEl[currentActiveCard].className = "card active";
    updateCurrentText();
  }
}

// Key arrow detection
document.onkeydown = checkKey;

function checkKey(e) {
  e = e || window.event;

  if (e.keyCode == "38") {
    // up arrow
    cardsEl[currentActiveCard].classList.toggle("show-answer");
  } else if (e.keyCode == "40") {
    // down arrow
    cardsEl[currentActiveCard].classList.toggle("show-answer");
  } else if (e.keyCode == "37") {
    // left arrow
    leftBtn();
  } else if (e.keyCode == "39") {
    // right arrow
    rightBtn();
  }
}

// Show/Hide add container
showBtn.addEventListener("click", () => addContainer.classList.add("show"));
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));

// Add new card
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);

    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// Clear cards
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
