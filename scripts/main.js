function init () {

  const cards = [];

  function generateCardValues (numberOfCards = 8) {
    for (let i = 0; i < numberOfCards; i += 2) {
      let randomNumber = Math.round(Math.random() * 50);
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
  
  function generateBoard () {
    generateCardValues();

    const shuffledCards = shuffle(cards);
    const board = document.querySelector('#game-board');
    
    shuffledCards.forEach(cardValue => {
      const cardElement = document.createElement('div');
      cardElement.textContent = cardValue;
      board.appendChild(cardElement);
    });
  }

  generateBoard();
}

window.addEventListener('DOMContentLoaded', init)