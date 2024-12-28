const cards = [
    "A", "A", "B", "B",
    "C", "C", "D", "D",
    "E", "E", "F", "F",
    "G", "G", "H", "H",
];

let flippedCards = [];
let matchedCards = [];

const board = document.getElementById("game-board");

// Shuffle cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create the board
function createBoard() {
    shuffle(cards);
    cards.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.value = card;
        cardElement.dataset.index = index;
        cardElement.addEventListener("click", flipCard);
        board.appendChild(cardElement);
    });
}

// Flip card
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.innerText = this.dataset.value;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

// Check for a match
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            setTimeout(() => alert("Parabéns! Você venceu!"), 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.innerText = "";
            secondCard.innerText = "";
            flippedCards = [];
        }, 1000);
    }
}

// Initialize the game
createBoard();

