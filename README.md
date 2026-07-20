# GitHub Background Tint

Minimal Chrome extension that automatically tints **github.com** by overriding Primer CSS variables.

- Page background: `#fffbf5` (`--bgColor-default`)
- Top menu / AppHeader: `#fae6cd` (`--bgColor-inset`, `--header-bgColor`, `--AppHeader-bg`)
- Author bars / muted chrome: `#fae6cd` (`--bgColor-muted`, same as top menu)
- Primary buttons: `#e88025` (`--button-primary-bgColor-*`)
- Borders: `#f5aa82` (`--borderColor-default` and related)
- Links / accent text: `#e88025` (`--fgColor-accent`)
- Success greens (badges, diffs, icons): `#e88025` (white checkmarks unchanged)

## How it works

A content script injects `github-theme.css` at `document_start` on `https://github.com/*`. GitHub paints different chrome with different tokens (page vs AppHeader vs comment headers), so each is overridden separately.

## Load it

1. Open `chrome://extensions`
2. Turn on **Developer mode**
3. Click **Load unpacked** (or reload if already loaded)
4. Select this folder

## Use it

Open any `https://github.com/...` page — the tint applies automatically.
