# old.reddit Dark Mode

A Firefox extension that applies a clean dark theme to [old.reddit.com](https://old.reddit.com).

## Features

- Dark colour palette covering all major page areas: header, posts, comments, sidebar, inputs, and footer
- Popup with a live **enable/disable toggle**
- **Accent colour** picker (6 presets: Periwinkle, Coral, Mint, Amber, Violet, Sky Blue)
- **Background darkness** slider to fine-tune how deep the darks go
- Changes apply instantly without a page reload; a reload button is available for edge cases
- All colours defined as CSS variables in `dark.css` — easy to customise

## Installation

1. Clone or download this repo.
2. Open Firefox and go to `about:debugging` → **This Firefox** → **Load Temporary Add-on**.
3. Select `manifest.json` from the project folder.

For a permanent install, package the extension with `web-ext build` and load the resulting `.zip` via `about:addons`.

## Customisation

Edit the colour palette at the top of `dark.css` — the `:root` block lists every variable with a short description of what it controls.
