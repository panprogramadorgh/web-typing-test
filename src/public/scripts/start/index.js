// check phrase
function checkPrase(phrase1, phrase2) {
  //
}

// TIMER
let TIMER = {
  start: 0,
  end: 0,
};
function evaluateTimer(timer = TIMER) {
  return timer.end - timer.start;
}
function resetTimer(timer = TIMER) {
  timer.start = 0;
  timer.end = 0;
}
function setTimerStart(timer = TIMER) {
  return fetch("http://127.0.0.1:3000/api/uptime")
    .then((res) => res.json())
    .then((data) => {
      timer.start = data;
    })
    .catch((err) => {
      console.log(err);
      stopGame();
    });
}
function setTimerEnd(timer = TIMER) {
  return fetch("http://127.0.0.1:3000/api/uptime")
    .then((res) => res.json())
    .then((data) => {
      timer.end = data;
    })
    .catch((err) => {
      console.log(err);
      stopGame();
    });
}
function calculateWPM(phrase, time) {
  const wordsInPhrase = phrase.split(" ").length;
  return Math.round(wordsInPhrase / (time / 60));
}

// buttons
const backButton = document.getElementById("back");
const startButton = document.getElementById("start");
const resetButton = document.createElement("button");
resetButton.innerHTML = `
<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"></path><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"></path></svg>`;

// div game container
const game = document.getElementById("game");
// paragraph
const paragraph = document.createElement("p");
paragraph.id = "paragraph";
// textarea
const mainframe = document.createElement("textarea");
mainframe.id = "mainframe";

function handleBackButtonClick() {
  window.history.pushState({}, null, "/views/index.html");
  window.history.go(0);
}

function handleStartButtonClick() {
  const userWantsToStart = window.confirm("Quieres empezar el juego ?");
  if (userWantsToStart) return startGame();
}

function handleMainframeTyping({ target }) {
  const paragraphText = paragraph.innerText;
  const isEqual = paragraphText === target.value;
  if (isEqual) {
    return setTimerEnd(TIMER).then(() => {
      const time = evaluateTimer(TIMER);
      const WPM = calculateWPM(paragraphText, time);
      window.alert(`${WPM} WPM`);
      return stopGame();
    });
  }
}

function handleResetButtonClick() {
  const userWantsToReset = window.confirm("Quieres resetear la partida ?");
  if (userWantsToReset) stopGame();
}

function setupEvents() {
  backButton.addEventListener("click", handleBackButtonClick);
  startButton.addEventListener("click", handleStartButtonClick);
  resetButton.addEventListener("click", handleResetButtonClick);
  mainframe.addEventListener("input", handleMainframeTyping);
}

// setups the events
setupEvents();
//

const getRandomPhrase = async () => {
  const response = await fetch("http://127.0.0.1:3000/api/phrases");
  const { gamePhrases: phrases } = await response.json();
  const randomPhrase =
    phrases[Math.floor(Math.random() * (phrases.length - 1))];
  return randomPhrase;
};

async function startGame() {
  // starts the game
  setTimerStart(TIMER);

  game.removeChild(startButton);

  try {
    const gamePhrase = await getRandomPhrase();
    paragraph.innerText = gamePhrase;
    game.appendChild(paragraph);
  } catch (error) {
    console.error(error);
    stopGame();
  }

  game.appendChild(mainframe);
  mainframe.focus();

  game.appendChild(resetButton);
}

function stopGame() {
  resetTimer(TIMER);
  game.appendChild(startButton);
  game.removeChild(paragraph);
  game.removeChild(resetButton);
  mainframe.value = "";
  game.removeChild(mainframe);
}
