const characters = [
  { name: "character1", frames: 50 },
  { name: "character2", frames: 1 },
  { name: "character3", frames: 1 },
  { name: "character4", frames: 1 }
];

let currentCharacter;
let isMouseAnimActive = false;

function pickCharacter() {
  const img = document.getElementById("heroImage");
  if (!img) {
    console.warn("heroImage not found in DOM");
    return;
  }

  const hasVisited = localStorage.getItem("hasVisited");

  if (!hasVisited) {
    currentCharacter = characters[0];
    localStorage.setItem("hasVisited", "true");
  } else {
    currentCharacter =
      characters[Math.floor(Math.random() * characters.length)];
  }

  if (currentCharacter.name === "character1") {
    isMouseAnimActive = true;
    const img = document.getElementById("heroImage");
    img.src = `assets/${currentCharacter.name}/ezgif-frame-001.png`;
    setupMouseAnimation(currentCharacter);
  } else {
    isMouseAnimActive = false;
    img.src = `assets/${currentCharacter.name}/ezgif-frame-001.png`;
  }
}

function getFrame(character, index) {
  const frameNum = String(index + 1).padStart(3, "0");
  return `assets/${character.name}/ezgif-frame-${frameNum}.png`;
}

function setupMouseAnimation(character) {
  const img = document.getElementById("heroImage");

  document.addEventListener("mousemove", (e) => {
    if (!isMouseAnimActive) return;

    const percent = e.clientX / window.innerWidth;

    const frame = Math.min(
      character.frames - 1,
      Math.floor(percent * character.frames)
    );

    // img.src = `assets/${character.name}/ezgif-frame-${String(frame + 1).padStart(3, "0")}.png`;
    img.src = getFrame(character, frame);
    //img.src = `assets/${character.name}/ezgif-frame-${frame}.png`;
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  await loadSection("hero", "sections/hero.html");
  pickCharacter();
});