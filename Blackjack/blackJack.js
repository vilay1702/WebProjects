console.log("Black Jack Game");

// ======================== Global ========================

let blackJackGame = {
  you: { scoreSpan: "#myPoints", div: "#you", score: 0 },
  opponent: { scoreSpan: "#oppPoints", div: "#opponent", score: 0 },
  cards: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
  cardsMap: {
    A: [1, 11],
    2: 2,
    3: 3,
    4: 5,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 10,
    Q: 10,
    K: 10,
  },
  myScore: 0,
  oppScore: 0,
  draws: 0,
};

const YOU = blackJackGame["you"];
const OPPONENT = blackJackGame["opponent"];

const hitSound = new Audio("sounds/swish.m4a");
const winSound = new Audio("sounds/cash.mp3");
const loseSound = new Audio("sounds/aww.mp3");

const showCard = (card, activePlayer) => {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = "images/" + card + ".png";
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
  }
};

const randomCard = () => {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackJackGame["cards"][randomIndex];
};

const showScore = (activePlayer) => {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).innerHTML = "BUST";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "#ff0000";
  } else {
    document.querySelector(activePlayer["scoreSpan"]).innerHTML =
      activePlayer["score"];
  }
};

const updateScore = (card, activePlayer) => {
  if (card == "A") {
    if (activePlayer["score"] <= 10) {
      activePlayer["score"] += blackJackGame["cardsMap"][card][1];
    } else {
      activePlayer["score"] += blackJackGame["cardsMap"][card][0];
    }
  } else {
    activePlayer["score"] += blackJackGame["cardsMap"][card];
  }
};

// You Move

const blackJackHit = () => {
  let card = randomCard();
  showCard(card, YOU);
  updateScore(card, YOU);
  showScore(YOU);
};

document.querySelector("#youButton").addEventListener("click", blackJackHit);
// END

// Opponent Move
const opponentLogic = () => {
  let card = randomCard();
  showCard(card, OPPONENT);
  updateScore(card, OPPONENT);
  showScore(OPPONENT);
};

document.querySelector("#oppButton").addEventListener("click", opponentLogic);
// End

// Reset
const blackJackReset = () => {
  showResult(computeWinner());

  let yourImages = document.querySelector(YOU["div"]).querySelectorAll("img");

  let opponentImages = document
    .querySelector(OPPONENT["div"])
    .querySelectorAll("img");

  // if (yourImages.length > 0) {
  //   yourImages[0].remove();
  //   setTimeout(blackJackReset, 100);
  // }
  // if (opponentImages.length > 0) {
  //   opponentImages[0].remove();
  //   setTimeout(blackJackReset, 100);
  // }

  for (i = 0; i < yourImages.length; i++) {
    yourImages[i].remove();
  }

  for (i = 0; i < opponentImages.length; i++) {
    opponentImages[i].remove();
  }

  YOU["score"] = 0;
  OPPONENT["score"] = 0;

  document.querySelector(YOU["scoreSpan"]).textContent = 0;
  document.querySelector(YOU["scoreSpan"]).style.color = "#ffffff";
  document.querySelector(OPPONENT["scoreSpan"]).textContent = 0;
  document.querySelector(OPPONENT["scoreSpan"]).style.color = "#ffffff";
};

document
  .querySelector("#resetButton")
  .addEventListener("click", blackJackReset);
// End

// Winner
const computeWinner = () => {
  let winner;
  if (YOU["score"] <= 21) {
    if (YOU["score"] > OPPONENT["score"] || OPPONENT["score"] > 21) {
      blackJackGame["myScore"] += 1;
      winner = YOU;
    } else if (YOU["score"] < OPPONENT["score"]) {
      blackJackGame["oppScore"] += 1;
      winner = OPPONENT;
    } else if (YOU["score"] == OPPONENT["score"]) {
      blackJackGame["draws"] += 1;
    }
  } else if (YOU["score"] > 21 && OPPONENT["score"] <= 21) {
    blackJackGame["oppScore"] += 1;
    winner = OPPONENT;
  } else if (YOU["score"] > 21 && OPPONENT["score"] > 21) {
    blackJackGame["draws"] += 1;
  }
  return winner;
};

const showResult = (winner) => {
  let message, messageColor;

  if (winner == YOU) {
    message = "You Won!!";
    messageColor = "#00ff00";
    winSound.play();
    document.querySelector("#myScore").textContent = blackJackGame["myScore"];
  } else if (winner == OPPONENT) {
    message = "You Lost!!";
    messageColor = "#ff0000";
    document.querySelector("#oppScore").textContent = blackJackGame["oppScore"];
    // loseSound.play();
  } else {
    message = "You Drew!!";
    messageColor = "#000000";
    document.querySelector("#draws").textContent = blackJackGame["draws"];
  }

  document.querySelector("#resultModal").firstElementChild.textContent =
    message;
  document.querySelector("#resultModal").style.backgroundColor = messageColor;
  document.querySelector("#resultModal").style.opacity = "100%";
};

document.querySelector("#resultModalBtn").addEventListener("click", () => {
  document.querySelector("#resultModal").style.opacity = "0%";
});

// Points Table
