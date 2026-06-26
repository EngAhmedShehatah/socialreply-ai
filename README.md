# SocialReply AI

SocialReply AI is a Manifest V3 Chrome extension that suggests AI-generated replies for LinkedIn, Reddit, and Facebook comment boxes.

## Goals

- Multi-platform comment reply assistant
- User-supplied OpenAI API key stored in `chrome.storage.sync`
- No backend: requests go directly from the browser to OpenAI
- Open source and easy to load unpacked

## Planned structure

- `manifest.json`
- `options.html` / `options.js`
- `core/api.js`
- `platforms/linkedin/content.js`
- `platforms/reddit/content.js`
- `platforms/facebook/content.js`

