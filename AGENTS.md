# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project

Let Me Ask: real-time Q&A rooms for live streams, built during Rocketseat
NLW #6 Together (June 2021). React 17 + TypeScript CRA frontend backed
entirely by Firebase 8 (Google Authentication + Realtime Database).
Legacy educational project with era-pinned dependencies.

## Commands

```bash
yarn install
cp .env.example .env    # fill in Firebase web app config values
yarn start              # http://localhost:3000
yarn build              # production build
```

Deployment config for Firebase Hosting lives in `firebase.json`;
database security rules in `database.rules.json`.

## Structure

- `src/services/firebase.ts`: SDK init; all config comes from `REACT_APP_*` env vars
- `src/contexts/AuthContext.tsx`: Google sign-in state
- `src/hooks`: `useAuth`, `useRoom` (realtime question subscriptions)
- `src/pages/Home`, `NewRoom`, `RoomsMe`, `AllRooms`: room creation and discovery
- `src/pages/Room`, `AdminRoom`: audience view and speaker controls (answer, highlight, remove)
- `src/components`: shared UI (buttons, room code, question item, modal)

## Branches

- `main`: primary branch
- `develop`: integration branch

## Rules for agents

- Docs-only maintenance phase: no dependency upgrades or runtime behavior changes
- Never commit `.env`; Firebase web config is public by design but must stay in env vars
