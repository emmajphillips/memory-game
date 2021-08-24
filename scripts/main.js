function init () {

  const board = document.querySelector('[data-id="game-board"]');
  const numberOfPairsInput = document.querySelector('[data-id="number-of-pairs"]')
  const numberOfPairsForm = document.querySelector('[data-id="number-of-pairs-form"]')
  const errorDisplay = document.querySelector('[data-id="error-display"]')
  
  let cards = [];

  function generateCardValues (numberOfCards) {
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
    errorDisplay.textContent = '';
    let number = +e.target.value;

    try {
      if (number === 0) {
        throw new Error('input a value greater than zero')
      }
      if (!number) {
        throw new Error('use number')
      }
      if (number > 50) {
        throw new Error('maximum amount exceeded')
      }
    } catch (error) {
      errorDisplay.textContent = error.message;
    }
  }

  function determineNumberOfPairs (e) {
    e.preventDefault();
    generateBoard(numberOfPairsInput.value);
  }

  numberOfPairsInput.addEventListener('input', validateInput)
  numberOfPairsForm.addEventListener('submit', determineNumberOfPairs)
}

window.addEventListener('DOMContentLoaded', init)