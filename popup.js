const defaults = {
  enabled: true,
  accent:    "#7b8cde",
  darkness:  50
};

// Load saved prefs and apply to popup UI
browser.storage.local.get(defaults).then(prefs => {
  document.getElementById("toggle").checked = prefs.enabled;
  document.getElementById("darkness").value = prefs.darkness;
  setActiveSwatchUI(prefs.accent);
});

// Toggle enable/disable
document.getElementById("toggle").addEventListener("change", e => {
  browser.storage.local.set({ enabled: e.target.checked });
  broadcast({ type: "SET_ENABLED", enabled: e.target.checked });
});

// Accent swatches
document.getElementById("swatches").addEventListener("click", e => {
  const swatch = e.target.closest(".swatch");
  if (!swatch) return;
  const color = swatch.dataset.color;
  setActiveSwatchUI(color);
  browser.storage.local.set({ accent: color });
  broadcast({ type: "SET_ACCENT", color });
});

// Darkness slider
document.getElementById("darkness").addEventListener("input", e => {
  browser.storage.local.set({ darkness: Number(e.target.value) });
  broadcast({ type: "SET_DARKNESS", value: Number(e.target.value) });
});

// Reload current tab
document.getElementById("reload-btn").addEventListener("click", () => {
  browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {
    if (tabs[0]) browser.tabs.reload(tabs[0].id);
  });
});

// Reset
document.getElementById("reset-btn").addEventListener("click", () => {
  browser.storage.local.set(defaults).then(() => {
    document.getElementById("toggle").checked = defaults.enabled;
    document.getElementById("darkness").value  = defaults.darkness;
    setActiveSwatchUI(defaults.accent);
    broadcast({ type: "RESET" });
  });
});

function setActiveSwatchUI(color) {
  document.querySelectorAll(".swatch").forEach(s => {
    s.classList.toggle("active", s.dataset.color === color);
  });
}

function broadcast(message) {
  browser.tabs.query({ url: "*://old.reddit.com/*" }).then(tabs => {
    tabs.forEach(tab => browser.tabs.sendMessage(tab.id, message).catch(() => {}));
  });
}
