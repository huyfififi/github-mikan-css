# GitHub Mikan CSS

Warm mikan-orange Chrome theme for **github.com** by overriding Primer CSS variables.

- Page background: `#fffbf5` (`--bgColor-default`)
- Top menu / AppHeader: `#f7ecdf` (`--bgColor-inset`, `--header-bgColor`, `--AppHeader-bg`)
- Author bars / muted chrome: `#f7ecdf` (`--bgColor-muted`, same as top menu)
- Primary buttons: `#e88025` (`--button-primary-bgColor-*`)
- Borders: `#e8c5a9` (`--borderColor-default` and related)
- Links / accent text: `#d9510d` (`--fgColor-accent`)
- Success check circles / icons: GitHub green `#1f883d` (Open badge stays `#e88025`)
- Diff additions: original GitHub greens (`#dafbe1` / `#aceebb`)
- Contribution heatmap: lighter peach→orange ramp (`#f3d4b5` … `#d9510d`)
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
