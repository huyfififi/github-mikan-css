/**
 * Re-apply theme tokens as inline !important custom properties.
 * Some GitHub styles redefine Primer vars on nested nodes; this keeps
 * --borderColor-* resolved to our orange from <html> down.
 */
const TOKENS = {
  "--bgColor-default": "#fffbf5",
  "--color-canvas-default": "#fffbf5",
  "--bgColor-muted": "#f7e8d4",
  "--color-canvas-subtle": "#f7e8d4",
  "--page-header-bgColor": "#f7e8d4",
  "--bgColor-inset": "#f7d299",
  "--header-bgColor": "#f7d299",
  "--headerSearch-bgColor": "#e8c07a",
  "--bgColor-accent-muted": "#f3e0c2",
  "--bgColor-attention-muted": "#f3d5b0",
  "--borderColor-default": "#de8500",
  "--borderColor-muted": "#de8500",
  "--borderColor-emphasis": "#de8500",
  "--borderColor-neutral-muted": "#de8500",
  "--borderColor-neutral-emphasis": "#de8500",
  "--color-border-default": "#de8500",
  "--color-border-muted": "#de8500",
  "--color-border-subtle": "#de8500",
  "--header-borderColor-divider": "#de8500",
  "--button-primary-bgColor-rest": "#e88025",
  "--button-primary-bgColor-hover": "#c96d1c",
  "--button-primary-bgColor-active": "#a85a16",
  "--button-primary-borderColor-rest": "#e88025",
  "--button-default-borderColor-rest": "#de8500",
  "--button-default-borderColor-hover": "#de8500",
  "--button-default-borderColor-active": "#de8500",
  "--control-borderColor-rest": "#de8500",
  "--control-borderColor-hover": "#de8500",
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
