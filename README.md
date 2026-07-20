# GitHub Background Tint

Minimal Chrome extension that automatically tints **github.com** by overriding Primer CSS variables.

Hard-coded color: `#f4d0f7`.

## How it works

A content script injects `github-theme.css` at `document_start` on `https://github.com/*`. GitHub paints surfaces with tokens like `--bgColor-default` and `--bgColor-muted`; those are overridden so real backgrounds change (no overlay).

## Load it

1. Open `chrome://extensions`
2. Turn on **Developer mode**
3. Click **Load unpacked** (or reload if already loaded)
4. Select this folder

## Use it

Open any `https://github.com/...` page — the tint applies automatically.
