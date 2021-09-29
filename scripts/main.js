function init() {
  const board = document.querySelector('[data-id="game-board"]');
  const numberOfPairsInput = document.querySelector(
    '[data-id="number-of-pairs"]'
  );
  const numberOfPairsForm = document.querySelector(
    '[data-id="number-of-pairs-form"]'
  );
  const resetButton = document.querySelector('[data-id="reset-button"]');
  const errorDisplay = document.querySelector('[data-id="error-display"]');

  let cards = [];
  let flippedCards = [];
  let cardElements = [];

  function generateCardValues(numberOfCards) {
    cards.length = 0;
    for (let i = 0; i < numberOfCards; i += 2) {
      let randomNumber = Math.round(Math.random() * 100);
      cards.push(randomNumber);
      cards.push(randomNumber);
    }
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function generateBoard(numberOfPairs) {
    board.replaceChildren();
    generateCardValues(numberOfPairs * 2);

    let shuffledCards = shuffle([...cards]);

    shuffledCards.forEach((cardValue) => {
      const cardElement = document.createElement("div");
      cardElement.value = cardValue;
      cardElement.textContent = "0";
      cardElement.addEventListener("click", flipCard);
      board.appendChild(cardElement);
      cardElements.push(cardElement);
    });
  }

  
  function flipCard(event) {
    event.target.textContent = event.target.value;
    flippedCards.push(event.target.value);
    if (flippedCards.length === 2 && checkForMatch()) {
      console.log("Match");
      cardElements.forEach((card) =>
        card.removeEventListener("click", flipCard)
      );
    }

    if (flippedCards.length === 2 && !checkForMatch()) {
      console.log("You lose!");
      cardElements.forEach((card) =>
        card.removeEventListener("click", flipCard)
      );
    }
  }

  function checkForMatch() {
    return flippedCards[0] === flippedCards[1];
  }

  function resetBoard() {
    cardElements.map((card) => {
      card.textContent = "0";
      card.addEventListener("click", flipCard);
    });
    flippedCards.length = 0;
  }

  function validateInput(e) {
    errorDisplay.textContent = "";
    let number = +e.target.value;

    try {
      if (number === 0) {
        throw new Error("input a value greater than zero");
      }
      if (!number) {
        throw new Error("use number");
      }
      if (number > 50) {
        throw new Error("maximum amount exceeded");
      }
    } catch (error) {
      errorDisplay.textContent = error.message;
    }
  }

  function determineNumberOfPairs(e) {
    e.preventDefault();
    generateBoard(numberOfPairsInput.value);
  }

  numberOfPairsInput.addEventListener("input", validateInput);
  numberOfPairsForm.addEventListener("submit", determineNumberOfPairs);
  resetButton.addEventListener("click", resetBoard);
}

window.addEventListener("DOMContentLoaded", init);
