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
const currentMapImage = document.getElementById("currentMapImage");
const currentMapName = document.getElementById("currentMapName");
const progressText = document.getElementById("progressText");
const completedBox = document.getElementById("completedBox");
const playAgainBtn = document.getElementById("playAgainBtn");
const resetBtn = document.getElementById("resetBtn");
const filledCount = document.getElementById("filledCount");

let shuffledMaps = [];
let currentMapIndex = 0;
let rankings = new Array(10).fill(null);

function shuffleArray(array) {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function createSlots() {
  slotsContainer.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    const slot = document.createElement("div");
    slot.className = "rank-slot";

    if (rankings[i]) {
      slot.classList.add("filled");
    } else if (currentMapIndex < shuffledMaps.length) {
      slot.addEventListener("click", () => placeCurrentMapIntoSlot(i));
    }

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
      placeholder.textContent = "Click to place current map here";
      rankContent.appendChild(placeholder);
    }

    slot.appendChild(rankNumber);
    slot.appendChild(rankContent);
    slotsContainer.appendChild(slot);
  }

  const placed = rankings.filter(Boolean).length;
  filledCount.textContent = `${placed} / 10 placed`;
}

function updateCurrentMapDisplay() {
  if (currentMapIndex >= shuffledMaps.length) {
    currentMapImage.style.display = "none";
    currentMapName.textContent = "All maps ranked";
    progressText.textContent = "Completed";
    completedBox.classList.remove("hidden");
    return;
  }

  const currentMap = shuffledMaps[currentMapIndex];
  currentMapImage.style.display = "block";
  currentMapImage.src = currentMap.image;
  currentMapImage.alt = currentMap.name;
  currentMapName.textContent = currentMap.name;
  progressText.textContent = `Turn ${currentMapIndex + 1} / ${shuffledMaps.length}`;
  completedBox.classList.add("hidden");
}

function placeCurrentMapIntoSlot(slotIndex) {
  if (rankings[slotIndex] !== null) return;
  if (currentMapIndex >= shuffledMaps.length) return;

  rankings[slotIndex] = shuffledMaps[currentMapIndex];
  currentMapIndex += 1;

  createSlots();
  updateCurrentMapDisplay();
}

function resetGame() {
  shuffledMaps = shuffleArray(maps);
  currentMapIndex = 0;
  rankings = new Array(10).fill(null);

  createSlots();
  updateCurrentMapDisplay();
}

playAgainBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

resetGame();
