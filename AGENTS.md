# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project

Let Me Ask: real-time Q&A rooms for live streams. React 19 + TypeScript +
Vite 8 frontend backed entirely by Firebase 12 modular (Google Authentication
+ Realtime Database). Restored from the 2021 Rocketseat NLW #6 original.

## Commands

```bash
npm install
cp .env.example .env    # fill in Firebase web app config (VITE_* values)
npm run dev             # http://localhost:5173
npm run build           # production build
npm run typecheck       # tsc --noEmit (strict, must stay at zero errors)
npm run sandbox         # Firebase emulators (auth 9099, database 9000)
```

Set `VITE_USE_EMULATORS="true"` in `.env` to run against the emulators
instead of a real Firebase project. Emulator REST seeding needs the
`?ns=demo-letmeask-default-rtdb` namespace suffix.

## Structure

- `src/services/firebase.ts`: modular SDK init, emulator wiring, config from `VITE_*` env vars
- `src/contexts/AuthContext.tsx`: Google sign-in state plus `isAuthChecked` flag
- `src/hooks`: `useAuth`, `useRoom` (realtime question subscriptions)
- `src/pages`: `Home`, `NewRoom`, `RoomsMe`, `AllRooms`, `Room` (audience), `AdminRoom` (speaker)
- `src/components`: shared UI (button, room code, question item, header, user info)
- `database.rules.json`: Realtime Database security rules
- `firebase.json`: emulator suite configuration (local only)

## Conventions

- Imports use the single alias `@/` for anything outside the current folder;
  `./` relative imports are allowed only within the same folder
- Type-only imports must use `import type` (`verbatimModuleSyntax`)
- Forms go through react-hook-form with a zod schema resolver
- No hardcoded URLs: everything comes from env vars typed in `src/vite-env.d.ts`
- Never commit `.env`; Firebase web config is public by design but stays in env vars

## Branches

- `main`: primary branch
- `develop`: integration branch

## Rules for agents

- Conventional Commits, one logical block per commit
- No em-dashes or en-dashes in any generated text
- Keep the stack base: React, Vite, Firebase, Sass (update in place, never swap frameworks)
- Run `npm run typecheck` and `npm run build` before proposing a commit
