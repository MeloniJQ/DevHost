// -----------------------------
// Frustration Detection & Calm Mode
// -----------------------------
let clickCount = 0;
let idleTimer;
let lastMouseX = 0;
let lastMouseY = 0;
let mouseShakeCount = 0;
const body = document.querySelector("body");

function setCalmTheme() {
  body.style.backgroundColor = "#E0F7FA";
  body.style.transition = "background-color 0.5s";
}

function setFrustratedTheme() {
  body.style.backgroundColor = "#FFCDD2";
  body.style.transition = "background-color 0.5s";
}

function triggerFrustration(reason) {
  console.log(`Frustration detected: ${reason}`);
  setFrustratedTheme();
  clickCount = 0;
  mouseShakeCount = 0;
  resetIdleTimer();

  const tooltip = document.createElement("div");
  tooltip.textContent = "Oops! Feeling stuck? Take a mini-break!";
  tooltip.style.position = "fixed";
  tooltip.style.bottom = "20px";
  tooltip.style.left = "50%";
  tooltip.style.transform = "translateX(-50%)";
  tooltip.style.backgroundColor = "#FFF9C4";
  tooltip.style.padding = "10px 20px";
  tooltip.style.borderRadius = "12px";
  tooltip.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
  tooltip.style.zIndex = 1000;
  tooltip.style.fontWeight = "bold";
  document.body.appendChild(tooltip);

  setTimeout(() => {
    tooltip.remove();
    setCalmTheme();
  }, 4000);
}

// Click-based frustration
window.addEventListener("click", () => {
  clickCount++;
  if (clickCount >= 5) triggerFrustration("Too many clicks");
});

// Idle-time frustration
function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => triggerFrustration("Idle too long"), 60000);
}
["mousemove", "keydown", "click"].forEach((e) =>
  window.addEventListener(e, resetIdleTimer)
);
resetIdleTimer();

// Mouse shake / erratic movement
window.addEventListener("mousemove", (e) => {
  const dx = Math.abs(e.clientX - lastMouseX);
  const dy = Math.abs(e.clientY - lastMouseY);
  if (dx > 50 || dy > 50) {
    mouseShakeCount++;
    if (mouseShakeCount >= 3)
      triggerFrustration("Mouse shaking / erratic movement");
  }
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
});

// Module card interactions
document.querySelectorAll(".module-card").forEach((card) => {
  card.addEventListener("click", () => {
    console.log("Module card clicked: Transition to lesson screen.");
  });
});
