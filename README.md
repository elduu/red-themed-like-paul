# Rediet & Partner — Wedding Invitation

React + TypeScript + Vite + Tailwind CSS wedding invitation website.

## Run locally

Install [Bun](https://bun.sh/) or Node.js. From this folder:

```sh
bun install
bun run dev
```

Open the local URL printed by Vite. To make a production bundle, run `bun run build`.

With npm instead, run `npm install`, then `npm run dev`.

The invitation sections are assembled in `src/pages/Index.tsx`. Styles and theme colors are in `src/index.css`; photos are in `src/assets`. This export includes the React source and images, but no installed dependencies or generated build files.

Note: RSVP confirmations and guest messages/photos currently use local or sample content, and the Telegram bot and some directions links are placeholders. These require real services/addresses before live use.
