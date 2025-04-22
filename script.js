
const cardImages = [
  'images/img1.png',
  'images/img2.png',
  'images/img3.png',
  'images/img4.png',
  'images/img5.png',
  'images/img6.png'
];
let cardsArray = [...cardImages, ...cardImages];
let firstCard, secondCard;
let lockBoard = false;
const board = document.getElementById('game-board');
const restartBtn = document.getElementById('restart-btn');
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
function createCard(imageSrc) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-front">❓</div>
      <div class="card-back"><img src="${imageSrc}" alt="card image" /></div>
    </div>
  `;
  card.addEventListener('click', flipCard);
  return card;
}
function loadGame() {
  board.innerHTML = '';
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  const shuffledCards = shuffle([...cardsArray]);
  shuffledCards.forEach(img => {
    const card = createCard(img);
    board.appendChild(card);
  });
}
function flipCard() {
  if (lockBoard || this.classList.contains('flip')) return;
  this.classList.add('flip');
  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    checkMatch();
  }
}
function checkMatch() {
  const isMatch =
    firstCard.querySelector('img').src === secondCard.querySelector('img').src;
  isMatch ? disableCards() : unflipCards();
}
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1000);
}
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
restartBtn.addEventListener('click', loadGame);
window.addEventListener('load', loadGame);
