let array = new Array(15).fill(null); // bigger array
let secretPattern = [];
let patternLength = 5;  // secret code length
let timer = 90;
let timerInterval;
let timerStarted = false;

function generateSecretPattern() {
  secretPattern = [];
  for (let i = 0; i < patternLength; i++) {
    secretPattern.push(Math.floor(Math.random() * 10));
  }
}
generateSecretPattern();

function displayArray() {
  const container = document.getElementById("array");
  container.innerHTML = "";
  array.forEach((val, idx) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = val !== null ? val : "";
    container.appendChild(cell);
  });
}

function showMessage(msg) {
  document.getElementById("message").textContent = msg;
}

function insertAtIndex() {
  const index = parseInt(document.getElementById("indexInput").value);
  const value = parseInt(document.getElementById("valueInput").value);

  if (isNaN(index) || isNaN(value) || index < 0 || index >= array.length) {
    showMessage("⚠️ Invalid index or value!");
    return;
  }

  for (let i = array.length - 1; i > index; i--) {
    array[i] = array[i - 1];
  }
  array[index] = value;
  displayArray();
  showMessage(`✅ Inserted ${value} at index ${index}`);
}

function deleteAtIndex() {
  const index = parseInt(document.getElementById("indexInput").value);
  if (isNaN(index) || index < 0 || index >= array.length || array[index] === null) {
    showMessage("⚠️ Invalid delete operation!");
    return;
  }
  for (let i = index; i < array.length - 1; i++) {
    array[i] = array[i + 1];
  }
  array[array.length - 1] = null;
  displayArray();
  showMessage(`🗑️ Deleted element at index ${index}`);
}

function searchPattern() {
  if (!timerStarted) {
    startTimer();
    timerStarted = true;
  }

  const patternInput = document.getElementById("patternInput").value.split(",").map(Number);
  if (patternInput.some(isNaN)) {
    showMessage("⚠️ Enter a valid pattern (e.g., 1,2,3,4,5)");
    return;
  }

  let found = false;
  const cells = document.getElementsByClassName("cell");

  for (let i = 0; i <= array.length - patternInput.length; i++) {
    for (let j = 0; j < patternInput.length; j++) {
      cells[i + j].classList.add("highlight");
    }

    const segment = array.slice(i, i + patternInput.length);
    if (JSON.stringify(segment) === JSON.stringify(patternInput)) {
      showMessage("🎉 Pattern found!");
      if (JSON.stringify(segment) === JSON.stringify(secretPattern)) {
        stopTimer(true);
      }
      found = true;
      return;
    }

    setTimeout(() => {
      for (let j = 0; j < patternInput.length; j++) {
        cells[i + j].classList.remove("highlight");
      }
    }, 400);
  }

  if (!found) {
    showMessage("❌ Pattern not found!");
  }
}

function resetArray() {
  array.fill(null);
  displayArray();
  showMessage("🔄 Array reset!");
  stopTimer(false);
  timer = 90;
  document.getElementById("timer").textContent = `⏱ Time Left: ${timer}s`;
  timerStarted = false;
  generateSecretPattern();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer--;
    document.getElementById("timer").textContent = `⏱ Time Left: ${timer}s`;
    if (timer <= 0) {
      clearInterval(timerInterval);
      showMessage("💀 Time’s up! You failed to crack the code!");
    }
  }, 1000);
}

function stopTimer(success) {
  clearInterval(timerInterval);
  if (success) {
    document.getElementById("timer").textContent = 
      `✅ You cracked the ${patternLength}-digit code in ${90 - timer} seconds!`;
  }
}

displayArray();
