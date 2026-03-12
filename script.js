const maps = [
  { name: "AWP India", image: "maps/awp_india.png" },
  { name: "CS Assault", image: "maps/cs_assault.png" },
  { name: "CS Militia", image: "maps/cs_militia.png" },
  { name: "CS Siege", image: "maps/cs_siege.png" },
  { name: "DE Cache", image: "maps/de_cache.png" },
  { name: "DE Cobblestone", image: "maps/de_cobblestone.png" },
  { name: "DE Dust", image: "maps/de_dust.png" },
  { name: "DE Tuscan", image: "maps/de_tuscan.png" },
  { name: "FY Iceworld", image: "maps/fy_iceworld.png" },
  { name: "FY Pool Day", image: "maps/fy_pool_day.png" }
];

const slotsContainer = document.getElementById("slots");
const slotButtonsContainer = document.getElementById("slotButtons");
const currentMapImage = document.getElementById("currentMapImage");
const currentMapName = document.getElementById("currentMapName");
const progressText = document.getElementById("progressText");
const completedBox = document.getElementById("completedBox");
const playAgainBtn = document.getElementById("playAgainBtn");
const resetBtn = document.getElementById("resetBtn");

let shuffledMaps = [];
let currentMapIndex = 0;
let rankings = new Array(10).fill(null);

function shuffleArray(array) {
  const copiedArray = [...array];
  for (let i = copiedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
  }
  return copiedArray;
}

function createSlots() {
  slotsContainer.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    const slot = document.createElement("div");
    slot.className = "rank-slot";

    const rankNumber = document.createElement("div");
    rankNumber.className = "rank-number";
    rankNumber.textContent = i + 1;

    const rankContent = document.createElement("div");
    rankContent.className = "rank-content";

    if (rankings[i]) {
      const img = document.createElement("img");
      img.src = rankings[i].image;
      img.alt = rankings[i].name;

      const name = document.createElement("div");
      name.className = "rank-map-name";
      name.textContent = rankings[i].name;

      rankContent.appendChild(img);
      rankContent.appendChild(name);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "rank-placeholder";
      placeholder.textContent = "Empty slot";
      rankContent.appendChild(placeholder);
    }

    slot.appendChild(rankNumber);
    slot.appendChild(rankContent);
    slotsContainer.appendChild(slot);
  }
}

function createSlotButtons() {
  slotButtonsContainer.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    const btn = document.createElement("button");
    btn.className = "slot-btn";
    btn.textContent = i + 1;

    if (rankings[i] !== null) {
      btn.disabled = true;
    }

    btn.addEventListener("click", () => {
      placeCurrentMapIntoSlot(i);
    });

    slotButtonsContainer.appendChild(btn);
  }
}

function updateCurrentMapDisplay() {
  if (currentMapIndex >= shuffledMaps.length) {
    currentMapImage.style.display = "none";
    currentMapName.textContent = "All maps ranked";
    progressText.textContent = "10 / 10";
    completedBox.classList.remove("hidden");
    slotButtonsContainer.innerHTML = "";
    return;
  }

  const currentMap = shuffledMaps[currentMapIndex];
  currentMapImage.style.display = "block";
  currentMapImage.src = currentMap.image;
  currentMapImage.alt = currentMap.name;
  currentMapName.textContent = currentMap.name;
  progressText.textContent = `${currentMapIndex + 1} / ${shuffledMaps.length}`;
  completedBox.classList.add("hidden");
}

function placeCurrentMapIntoSlot(slotIndex) {
  if (rankings[slotIndex] !== null) {
    return;
  }

  const currentMap = shuffledMaps[currentMapIndex];
  rankings[slotIndex] = currentMap;
  currentMapIndex += 1;

  createSlots();
  createSlotButtons();
  updateCurrentMapDisplay();
}

function resetGame() {
  shuffledMaps = shuffleArray(maps);
  currentMapIndex = 0;
  rankings = new Array(10).fill(null);

  createSlots();
  createSlotButtons();
  updateCurrentMapDisplay();
}

playAgainBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

resetGame();
