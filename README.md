# GitHub Background Tint

Minimal Chrome extension that automatically tints **github.com** by overriding Primer CSS variables.

- Page background: `#fffbf5` (`--bgColor-default`)
- Top menu / AppHeader: `#fae6cd` (`--bgColor-inset`, `--header-bgColor`, `--AppHeader-bg`)
- Author bars / muted chrome: `#fae6cd` (`--bgColor-muted`, same as top menu)
- Primary buttons: `#e88025` (`--button-primary-bgColor-*`)
- Borders: `#e8c5a9` (`--borderColor-default` and related)
- Links / accent text: `#d9510d` (`--fgColor-accent`)
- Success check circles / icons: GitHub green `#1f883d` (Open badge stays `#e88025`)
- Diff additions: original GitHub greens (`#dafbe1` / `#aceebb`)
- Contribution heatmap: stronger peach→dark orange ramp (`#e8c5a9` … `#8b2e08`)
- Header icons (top right): `#d9510d`

## How it works

A content script injects `github-theme.css` at `document_start` on `https://github.com/*`. GitHub paints different chrome with different tokens (page vs AppHeader vs comment headers), so each is overridden separately.

## Load it

1. Open `chrome://extensions`
2. Turn on **Developer mode**
3. Click **Load unpacked** (or reload if already loaded)
4. Select this folder

## Use it

Open any `https://github.com/...` page — the tint applies automatically.
