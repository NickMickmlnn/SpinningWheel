const slices = [
  "VIP Badge Winner!",
  "Try Again",
  "Try Again",
  "Try Again",
  "Try Again",
  "Try Again",
  "VIP Badge Winner!",
  "Try Again",
  "Try Again",
  "Try Again",
  "Try Again",
  "Try Again",
];

const wheelSlices = document.getElementById("wheelSlices");
const spinButton = document.getElementById("spinButton");
const resultMessage = document.getElementById("resultMessage");

const sliceCount = slices.length;
const sliceAngle = 360 / sliceCount;
let currentRotation = 0;
let isSpinning = false;

const createSlices = () => {
  slices.forEach((label, index) => {
    const isVip = label === "VIP Badge Winner!";
    const labelEl = document.createElement("div");
    const angle = index * sliceAngle + sliceAngle / 2;

    labelEl.className = `label ${isVip ? "vip" : "try-again"}`;
    labelEl.style.transform = `rotate(${angle}deg) translateX(40%) rotate(${-angle}deg)`;
    labelEl.textContent = label;

    wheelSlices.appendChild(labelEl);
  });
};

createSlices();

spinButton.addEventListener("click", () => {
  if (isSpinning) {
    return;
  }

  isSpinning = true;
  spinButton.disabled = true;
  resultMessage.textContent = "";

  // Random winner: pick a random slice index from 0 to 11.
  const winningIndex = Math.floor(Math.random() * sliceCount);

  // Spin rotation: add 3-5 full rotations plus the angle to land on the winning slice.
  const fullRotations = 3 + Math.floor(Math.random() * 3);
  const sliceCenter = winningIndex * sliceAngle + sliceAngle / 2;
  const targetRotation = fullRotations * 360 + (360 - sliceCenter);
  const spinDuration = 4000 + Math.floor(Math.random() * 1000);

  // Landing slice: normalize the total rotation to find which slice is at the pointer.
  const totalRotation = currentRotation + targetRotation;
  wheelSlices.style.transitionDuration = `${spinDuration}ms`;
  wheelSlices.style.transform = `rotate(${totalRotation}deg)`;

  window.setTimeout(() => {
    currentRotation = totalRotation % 360;
    const normalized = (360 - (currentRotation % 360)) % 360;
    const landedIndex = Math.floor(normalized / sliceAngle);
    const landedLabel = slices[landedIndex];

    if (landedLabel === "VIP Badge Winner!") {
      resultMessage.textContent = "Congratulations! You won a VIP Badge!";
      resultMessage.style.color = "#b45309";
    } else {
      resultMessage.textContent = "Not this time — thanks for playing!";
      resultMessage.style.color = "#6b7280";
    }

    isSpinning = false;
    spinButton.disabled = false;
  }, spinDuration);
});
