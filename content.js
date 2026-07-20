/**
 * Re-apply theme tokens as inline !important custom properties.
 * Some GitHub styles redefine Primer vars on nested nodes; this keeps
 * --borderColor-* resolved to our orange from <html> down.
 */
const TOKENS = {
  "--bgColor-default": "#fffbf5",
  "--color-canvas-default": "#fffbf5",
  "--bgColor-muted": "#fae6cd",
  "--color-canvas-subtle": "#fae6cd",
  "--page-header-bgColor": "#fae6cd",
  "--bgColor-inset": "#fae6cd",
  "--header-bgColor": "#fae6cd",
  "--headerSearch-bgColor": "#e8c07a",
  "--bgColor-accent-muted": "#fae6cd",
  "--bgColor-attention-muted": "#fae6cd",
  "--borderColor-default": "#f5aa82",
  "--borderColor-muted": "#f5aa82",
  "--borderColor-emphasis": "#f5aa82",
  "--borderColor-neutral-muted": "#f5aa82",
  "--borderColor-neutral-emphasis": "#f5aa82",
  "--color-border-default": "#f5aa82",
  "--color-border-muted": "#f5aa82",
  "--color-border-subtle": "#f5aa82",
  "--header-borderColor-divider": "#f5aa82",
  "--button-primary-bgColor-rest": "#e88025",
  "--button-primary-bgColor-hover": "#c96d1c",
  "--button-primary-bgColor-active": "#a85a16",
  "--button-primary-borderColor-rest": "#e88025",
  "--button-default-borderColor-rest": "#f5aa82",
  "--button-default-borderColor-hover": "#f5aa82",
  "--button-default-borderColor-active": "#f5aa82",
  "--control-borderColor-rest": "#f5aa82",
  "--control-borderColor-hover": "#f5aa82",
  "--fgColor-accent": "#d9510d",
  "--bgColor-accent-emphasis": "#d9510d",
  "--borderColor-accent-emphasis": "#d9510d",
  "--color-accent-fg": "#d9510d",
  "--color-fg-accent": "#d9510d",
  "--fgColor-success": "#1a7f37",
  "--bgColor-success-emphasis": "#1f883d",
  "--bgColor-success-muted": "#f8e4d3",
  "--borderColor-success-emphasis": "#1a7f37",
  "--borderColor-success-muted": "#f0c49a",
  "--color-success-fg": "#1a7f37",
  "--color-fg-success": "#1a7f37",
  "--color-success-emphasis": "#1f883d",
  "--color-success-muted": "#f8e4d3",
  "--diffBlob-additionNum-bgColor": "#f3c9a3",
  "--diffBlob-additionWord-bgColor": "#f3c9a3",
  "--diffBlob-additionLine-bgColor": "#f9eadc",
};

function applyTokens(root = document.documentElement) {
  for (const [name, value] of Object.entries(TOKENS)) {
    root.style.setProperty(name, value, "important");
  }
}

const GREEN = "#1f883d";
const WHITE = "#ffffff";
const FILLED_SUCCESS_CIRCLE = [
  ".TimelineItem-badge--success",
  ".completeness-indicator-success",
  ".branch-action-state-clean .branch-action-icon",
  ".branch-action-state-merged .branch-action-icon",
].join(",");

function paintGreenSuccessChecks() {
  for (const el of document.querySelectorAll(FILLED_SUCCESS_CIRCLE)) {
    el.style.setProperty("background-color", GREEN, "important");
    el.style.setProperty("color", WHITE, "important");
    for (const icon of el.querySelectorAll(".octicon, svg")) {
      icon.style.setProperty("color", WHITE, "important");
      icon.style.setProperty("fill", WHITE, "important");
    }
  }

  // Standalone filled check-circle icons (not sitting on a green disc).
  for (const el of document.querySelectorAll(
    ".octicon-check-circle-fill, .octicon-check-circle",
  )) {
    if (
      el.closest(
        [
          ".State--open",
          ".Button--primary",
          ".Label--success",
          ".TimelineItem-badge--success",
          ".completeness-indicator-success",
          ".branch-action-icon",
        ].join(","),
      )
    ) {
      continue;
    }
    el.style.setProperty("color", GREEN, "important");
    el.style.setProperty("fill", GREEN, "important");
  }
}

let paintScheduled = false;
function schedulePaintGreenSuccessChecks() {
  if (paintScheduled) {
    return;
  }
  paintScheduled = true;
  requestAnimationFrame(() => {
    paintScheduled = false;
    paintGreenSuccessChecks();
  });
}

function applyTheme() {
  applyTokens();
  paintGreenSuccessChecks();
}

applyTheme();

document.addEventListener("turbo:load", applyTheme);
document.addEventListener("pjax:end", applyTheme);

const observer = new MutationObserver(schedulePaintGreenSuccessChecks);
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});
