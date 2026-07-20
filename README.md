# GitHub Background Tint

Minimal Chrome extension that automatically tints **github.com** by overriding Primer CSS variables.

- Page background: `#fffbf5` (`--bgColor-default`)
- Top menu / AppHeader: `#f7d299` (`--bgColor-inset`, `--header-bgColor`, `--AppHeader-bg`)
- Author bars / muted chrome: warm mix of page + header (`--bgColor-muted`)
- Primary buttons: `#e88025` (`--button-primary-bgColor-*`)
- Borders: `#de8500` (`--borderColor-default` and related)

## How it works

A content script injects `github-theme.css` at `document_start` on `https://github.com/*`. GitHub paints different chrome with different tokens (page vs AppHeader vs comment headers), so each is overridden separately.

## Load it

1. Open `chrome://extensions`
2. Turn on **Developer mode**
3. Click **Load unpacked** (or reload if already loaded)
4. Select this folder

## Use it

Open any `https://github.com/...` page — the tint applies automatically.
