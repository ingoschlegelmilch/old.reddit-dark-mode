const linkEl = document.createElement("link");
linkEl.rel = "stylesheet";
linkEl.href = browser.runtime.getURL("dark.css");
linkEl.dataset.redditDark = "";
document.documentElement.appendChild(linkEl);

const styleEl = document.createElement("style");
styleEl.id = "reddit-dark-overrides";
styleEl.dataset.redditDark = "";
document.documentElement.appendChild(styleEl);

const defaults = { enabled: true, accent: "#7b8cde", darkness: 50 };

let currentAccent   = defaults.accent;
let currentDarkness = defaults.darkness;

// Apply prefs on page load
browser.storage.local.get(defaults).then(prefs => {
  applyAll(prefs);
});

// Listen for live updates from the popup
browser.runtime.onMessage.addListener(msg => {
  switch (msg.type) {
    case "SET_ENABLED":  setEnabled(msg.enabled); break;
    case "SET_ACCENT":   setAccent(msg.color);    break;
    case "SET_DARKNESS": setDarkness(msg.value);  break;
    case "RESET":        applyAll(defaults);       break;
  }
});

function applyAll({ enabled, accent, darkness }) {
  setEnabled(enabled);
  currentAccent   = accent;
  currentDarkness = darkness;
  styleEl.textContent = buildOverrides();
}

function setEnabled(on) {
  linkEl.disabled = !on;
}

function setAccent(color) {
  currentAccent = color;
  styleEl.textContent = buildOverrides();
}

function setDarkness(value) {
  currentDarkness = value;
  styleEl.textContent = buildOverrides();
}

function buildOverrides() {
  return `
    :root {
      --accent:  ${currentAccent};
      --bg-page: hsl(230, 12%, ${clamp(4,  8,  8  - currentDarkness * 0.04)}%);
      --bg-main: hsl(230, 20%, ${clamp(8,  16, 16 - currentDarkness * 0.06)}%);
      --bg-card: hsl(232, 22%, ${clamp(10, 20, 20 - currentDarkness * 0.07)}%);
    }
  `;
}

function clamp(min, max, val) {
  return Math.min(max, Math.max(min, val));
}
