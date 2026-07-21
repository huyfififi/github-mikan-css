/**
 * Re-apply theme tokens as inline !important custom properties.
 * Some GitHub styles redefine Primer vars on nested nodes; this keeps
 * --borderColor-* resolved to our orange from <html> down.
 */
const TOKENS = {
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
  "--contribution-default-bgColor-1": "#f3d4b5",
  "--contribution-default-bgColor-2": "#f0a05a",
  "--contribution-default-bgColor-3": "#e88025",
  "--contribution-default-bgColor-4": "#d9510d",
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
const PEACH_RAMP = ["#f3d4b5", "#f0a05a", "#e88025", "#d9510d"];
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

function parseCssColor(value) {
  if (!value) {
    return null;
  }
  const raw = value.trim().toLowerCase();
  const hex = parseHexColor(raw);
  if (hex) {
    return hex;
  }

  const rgb = raw.match(
    /^rgba?\(\s*([0-9.]+)\s*,\s*([0-9.]+)\s*,\s*([0-9.]+)(?:\s*,\s*([0-9.]+))?\s*\)$/,
  );
  if (rgb) {
    return {
      r: Number(rgb[1]),
      g: Number(rgb[2]),
      b: Number(rgb[3]),
      a: rgb[4] === undefined ? 1 : Number(rgb[4]),
    };
  }
  return null;
}

function isGreenishColor(value) {
  const rgb = parseCssColor(value);
  if (!rgb) {
    return false;
  }
  return rgb.g > rgb.r + 20 && rgb.g > rgb.b + 10;
}

function greenToPeach(value) {
  const rgb = parseCssColor(value);
  if (!rgb) {
    return "rgba(232, 128, 37, 0.35)";
  }
  const alpha = rgb.a === undefined ? 0.35 : Math.max(0.2, Math.min(0.55, rgb.a));
  // Match primary button orange with the original fill opacity.
  return `rgba(232, 128, 37, ${alpha})`;
}

function paintActivityOverviewGraph() {
  const MIKAN_FILL = "rgba(232, 128, 37, 0.35)";
  const MIKAN_SOLID = "#e88025";
  const SUCCESS_VARS = {
    "--fgColor-success": MIKAN_SOLID,
    "--bgColor-success-emphasis": MIKAN_SOLID,
    "--bgColor-success-muted": "rgba(232, 128, 37, 0.28)",
    "--borderColor-success-emphasis": MIKAN_SOLID,
    "--color-success-fg": MIKAN_SOLID,
    "--color-fg-success": MIKAN_SOLID,
    "--color-success-emphasis": MIKAN_SOLID,
    "--color-success-muted": "rgba(232, 128, 37, 0.28)",
  };

  const containers = document.querySelectorAll(
    ".activity-overview-box, .js-activity-overview-graph-container",
  );

  for (const container of containers) {
    for (const [name, value] of Object.entries(SUCCESS_VARS)) {
      container.style.setProperty(name, value, "important");
    }

    // Percentage labels (Commits / Code review / Issues / PRs).
    for (const el of container.querySelectorAll(
      ".color-fg-success, .fgColor-success, [class*='fg-success'], [class*='fgColor-success']",
    )) {
      el.style.setProperty("color", MIKAN_SOLID, "important");
      el.style.setProperty("fill", MIKAN_SOLID, "important");
    }

    for (const el of container.querySelectorAll(
      "svg polygon, svg path, svg circle, svg line",
    )) {
      const attrFill = (el.getAttribute("fill") || "").trim().toLowerCase();
      const computedFill = getComputedStyle(el).fill;
      const attrStroke = (el.getAttribute("stroke") || "").trim().toLowerCase();
      const computedStroke = getComputedStyle(el).stroke;

      // Vertex dots
      if (el.tagName.toLowerCase() === "circle") {
        el.style.setProperty("fill", MIKAN_SOLID, "important");
        el.style.setProperty("stroke", MIKAN_SOLID, "important");
        continue;
      }

      // Axis / grid / shape outline strokes → solid mikan orange
      if (
        (attrStroke && attrStroke !== "none") ||
        (computedStroke && computedStroke !== "none")
      ) {
        el.setAttribute("stroke", MIKAN_SOLID);
        el.style.setProperty("stroke", MIKAN_SOLID, "important");
      }

      // Shape fill (radar area)
      if (attrFill === "none" || computedFill === "none") {
        continue;
      }

      if (
        el.tagName.toLowerCase() === "polygon" ||
        isGreenishColor(attrFill) ||
        isGreenishColor(computedFill) ||
        attrFill === "currentcolor" ||
        /^rgba?\(/i.test(computedFill)
      ) {
        el.setAttribute("fill", MIKAN_FILL);
        el.style.setProperty("fill", MIKAN_FILL, "important");
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
