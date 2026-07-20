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
  "--fgColor-accent": "#e88025",
  "--bgColor-accent-emphasis": "#e88025",
  "--borderColor-accent-emphasis": "#e88025",
  "--color-accent-fg": "#e88025",
  "--color-fg-accent": "#e88025",
  "--fgColor-success": "#e88025",
  "--bgColor-success-emphasis": "#e88025",
  "--bgColor-success-muted": "#f8e4d3",
  "--borderColor-success-emphasis": "#e88025",
  "--borderColor-success-muted": "#f0c49a",
  "--color-success-fg": "#e88025",
  "--color-fg-success": "#e88025",
  "--color-success-emphasis": "#e88025",
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

applyTokens();

// GitHub turbo-navigates without full reloads; re-apply after swaps.
document.addEventListener("turbo:load", () => applyTokens());
document.addEventListener("pjax:end", () => applyTokens());
