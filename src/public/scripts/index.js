const startButton = document.getElementById("start");

function handleStartButtonClick() {
  window.history.pushState({}, null, "/views/start/index.html");
  window.history.go(0);
}
startButton.addEventListener("click", handleStartButtonClick);
