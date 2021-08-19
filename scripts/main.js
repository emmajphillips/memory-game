function init () {

  const board = document.querySelector('[data-id="game-board"]');
  const numberOfPairsInput = document.querySelector('[data-id="number-of-pairs"]')
  const numberOfPairsForm = document.querySelector('[data-id="number-of-pairs-form"]')
  
  const cards = [];

  function generateCardValues (numberOfCards = 8) {
    for (let i = 0; i < numberOfCards; i += 2) {
      let randomNumber = Math.round(Math.random() * 100);
      cards.push(randomNumber);
      cards.push(randomNumber);
    }
  }

  function shuffle (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array;
  }
  
  function generateBoard (numberOfPairs) {
    generateCardValues(numberOfPairs * 2);

    const shuffledCards = shuffle(cards);
    
    shuffledCards.forEach(cardValue => {
      const cardElement = document.createElement('div');
      cardElement.textContent = cardValue;
      board.appendChild(cardElement);
    });
  }

  function validateInput (e) {
    // TODO: Add keystroke validation so only numbers allowed
    // TODO: Set max and min number of pairs
    console.log(e.target.value)
  }

  function determineNumberOfPairs (e) {
    e.preventDefault();
    generateBoard(numberOfPairsInput.value);
  }

  numberOfPairsInput.addEventListener('input', validateInput)
  numberOfPairsForm.addEventListener('submit', determineNumberOfPairs)
}

window.addEventListener('DOMContentLoaded', init)