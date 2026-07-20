/**
 * Re-apply theme tokens as inline !important custom properties.
 * Some GitHub styles redefine Primer vars on nested nodes; this keeps
 * --borderColor-* resolved to our orange from <html> down.
 */
const TOKENS = {
  "--bgColor-default": "#fffbf5",
  "--color-canvas-default": "#fffbf5",
  "--bgColor-muted": "#f7ecdf",
  "--color-canvas-subtle": "#f7ecdf",
  "--page-header-bgColor": "#f7ecdf",
  "--bgColor-inset": "#f7ecdf",
  "--header-bgColor": "#f7ecdf",
  "--headerSearch-bgColor": "#e8c07a",
  "--bgColor-accent-muted": "#f7ecdf",
  "--bgColor-attention-muted": "#f7ecdf",
  "--borderColor-default": "#e8c5a9",
  "--borderColor-muted": "#e8c5a9",
  "--borderColor-emphasis": "#e8c5a9",
  "--borderColor-neutral-muted": "#e8c5a9",
  "--borderColor-neutral-emphasis": "#e8c5a9",
  "--color-border-default": "#e8c5a9",
  "--color-border-muted": "#e8c5a9",
  "--color-border-subtle": "#e8c5a9",
  "--header-borderColor-divider": "#e8c5a9",
  "--button-primary-bgColor-rest": "#e88025",
  "--button-primary-bgColor-hover": "#c96d1c",
  "--button-primary-bgColor-active": "#a85a16",
  "--button-primary-borderColor-rest": "#e88025",
  "--button-default-borderColor-rest": "#e8c5a9",
  "--button-default-borderColor-hover": "#e8c5a9",
  "--button-default-borderColor-active": "#e8c5a9",
  "--control-borderColor-rest": "#e8c5a9",
  "--control-borderColor-hover": "#e8c5a9",
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
  "--diffBlob-additionNum-bgColor": "#aceebb",
  "--diffBlob-additionWord-bgColor": "#aceebb",
  "--diffBlob-additionLine-bgColor": "#dafbe1",
  "--contribution-default-bgColor-0": "#fffbf5",
  "--contribution-default-bgColor-1": "#e8c5a9",
  "--contribution-default-bgColor-2": "#e88025",
  "--contribution-default-bgColor-3": "#d9510d",
  "--contribution-default-bgColor-4": "#8b2e08",
  "--contribution-default-borderColor-0": "#e8c5a966",
  "--contribution-default-borderColor-1": "#e8c5a966",
  "--contribution-default-borderColor-2": "#e8c5a966",
  "--contribution-default-borderColor-3": "#e8c5a966",
  "--contribution-default-borderColor-4": "#e8c5a966",
};

function applyTokens(root = document.documentElement) {
  for (const [name, value] of Object.entries(TOKENS)) {
    root.style.setProperty(name, value, "important");
  }
}

const GREEN = "#1f883d";
const WHITE = "#ffffff";
const LINK = "#d9510d";
const PEACH_RAMP = ["#e8c5a9", "#e88025", "#d9510d", "#8b2e08"];
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

function parseHexColor(value) {
  const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());
  if (!match) {
    return null;
  }
  let hex = match[1];
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }
  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16),
  };
}

function isGreenishColor(value) {
  const rgb = parseHexColor(value);
  if (!rgb) {
    return false;
  }
  return rgb.g > rgb.r + 20 && rgb.g > rgb.b + 10;
}

function greenToPeach(value) {
  const rgb = parseHexColor(value);
  if (!rgb) {
    return "#e8c5a9";
  }
  const intensity = (rgb.g - Math.min(rgb.r, rgb.b)) / 255;
  const index = Math.min(
    PEACH_RAMP.length - 1,
    Math.max(0, Math.round(intensity * (PEACH_RAMP.length - 1))),
  );
  return PEACH_RAMP[index];
}

function paintActivityOverviewGraph() {
  const AXIS_GREEN = "#1a7f37";

  for (const heading of document.querySelectorAll("h2, h3")) {
    if (!/activity overview/i.test(heading.textContent || "")) {
      continue;
    }

    const root =
      heading.closest("section, .Box, [class*='Overview'], .Layout-main") ||
      heading.parentElement;
    if (!root) {
      continue;
    }

    for (const el of root.querySelectorAll("polygon, path, circle, rect, line")) {
      const stroke = (el.getAttribute("stroke") || "").toLowerCase();
      if (stroke && stroke !== "none" && stroke !== "currentcolor") {
        // Axes / grid lines: keep original GitHub green.
        if (isGreenishColor(stroke) || stroke === LINK.toLowerCase() || stroke === "#e88025") {
          el.setAttribute("stroke", AXIS_GREEN);
        }
        continue;
      }

      // Only recolor filled radar area polygons that look green.
      const fill = (el.getAttribute("fill") || "").toLowerCase();
      if (fill && fill !== "none" && fill !== "currentcolor" && isGreenishColor(fill)) {
        el.setAttribute("fill", greenToPeach(fill));
      }
    }
  }
}

function paintHeaderIcons() {
  for (const el of document.querySelectorAll(
    ".AppHeader-globalBar-end > :not(.AppHeader-user) .octicon, .AppHeader-globalBar-end > :not(.AppHeader-user) svg",
  )) {
    if (el.closest(".AppHeader-user")) {
      continue;
    }
    el.style.setProperty("color", LINK, "important");
    el.style.setProperty("fill", "currentColor", "important");
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
    paintActivityOverviewGraph();
    paintHeaderIcons();
  });
}

function applyTheme() {
  applyTokens();
  paintGreenSuccessChecks();
  paintActivityOverviewGraph();
  paintHeaderIcons();
}

applyTheme();

document.addEventListener("turbo:load", applyTheme);
document.addEventListener("pjax:end", applyTheme);

const observer = new MutationObserver(schedulePaintGreenSuccessChecks);
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
});
