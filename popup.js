const COLOR = "#4287f5";

const applyButton = document.getElementById("apply");
const statusEl = document.getElementById("status");

function setStatus(message, isError = false) {
  statusEl.hidden = !message;
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

applyButton.addEventListener("click", async () => {
  setStatus("");

  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (!tab?.id) {
      setStatus("No active tab found.", true);
      return;
    }

    if (
      !tab.url ||
      tab.url.startsWith("chrome://") ||
      tab.url.startsWith("chrome-extension://") ||
      tab.url.startsWith("https://chrome.google.com/")
    ) {
      setStatus("Can't change this kind of page.", true);
      return;
    }

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (backgroundColor) => {
        const overlayId = "bg-color-changer-overlay";
        let overlay = document.getElementById(overlayId);

        if (!overlay) {
          overlay = document.createElement("div");
          overlay.id = overlayId;
          overlay.style.cssText = [
            "position:fixed",
            "inset:0",
            "z-index:2147483647",
            "pointer-events:none",
            "opacity:0.45",
          ].join(";");
          document.documentElement.appendChild(overlay);
        }

        overlay.style.backgroundColor = backgroundColor;
      },
      args: [COLOR],
    });

    setStatus("Applied.");
  } catch (error) {
    setStatus(error?.message || String(error), true);
  }
});
