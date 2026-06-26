# SocialReply AI

SocialReply AI is a Manifest V3 Chrome extension that suggests AI-generated replies for comments on LinkedIn, Reddit, and Facebook.

## What it does

- Detects comment boxes on supported social platforms
- Injects an `✨ AI Reply` button near the editor
- Sends the visible post text to OpenAI to generate a suggested reply
- Inserts the suggestion into the comment box for review

**Suggestion only:** nothing is posted automatically.

## Supported platforms

| Platform | Status |
| --- | --- |
| LinkedIn | ✅ |
| Reddit | ✅ |
| Facebook | ✅ |

## Install unpacked in Chrome

1. Open `chrome://extensions`
2. Turn on **Developer mode**
3. Click **Load unpacked**
4. Select the `socialreply-ai` folder

## Set your OpenAI API key

1. Open the extension options page from Chrome's extensions UI
2. Paste your OpenAI API key
3. Click **Save**

The key is stored in `chrome.storage.sync`.

## Project structure

- `manifest.json`
- `options.html` / `options.js`
- `core/api.js`
- `platforms/linkedin/content.js`
- `platforms/reddit/content.js`
- `platforms/facebook/content.js`

## Notes

- No backend is required.
- The extension calls OpenAI directly from the browser.
- The extension is intentionally simple v1: single-click reply suggestions only.
