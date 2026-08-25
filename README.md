# letmeask

![React](https://img.shields.io/badge/React-17-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-8-FFCA28?logo=firebase&logoColor=white)

Let Me Ask is a real-time Q&A platform for live streams and presentations:
speakers create rooms, the audience joins with a code, asks questions and
upvotes the ones they want answered first. Built during
[Rocketseat NLW #6 Together](https://rocketseat.com.br) (June 2021), fully
powered by Firebase (Authentication + Realtime Database).

## Features

- Google sign-in through Firebase Authentication
- Create rooms and share them by code or URL
- Audience view: ask questions, like and sort by most liked
- Admin room: mark questions as answered, highlight them while answering or remove them
- Room management: list your own rooms (`RoomsMe`), browse recent rooms (`AllRooms`), close rooms

## Tech stack

| Layer | Tools |
|---|---|
| Language | TypeScript |
| UI | React 17, Create React App, Sass (node-sass), classnames, react-router-dom 5 |
| Backend | Firebase 8: Auth (Google) and Realtime Database with security rules |

## How to run

### Requirements

Node.js 14-16 era runtime (see legacy note).

```bash
yarn install
cp .env.example .env    # fill in your Firebase web app config
yarn start              # http://localhost:3000
```

Create a Firebase project with Google sign-in enabled and Realtime Database
rules in place (`database.rules.json` documents the rules used here).

## Legacy note

Educational project from June 2021. Dependencies are pinned to that era
(React 17, CRA 4, Firebase JS SDK 8, node-sass 5); expect friction on current
Node versions without upgrades. Estimated modernization effort if picked up
later: small (half-day), migrating CRA to Vite, Firebase SDK to v10 modular
API and replacing node-sass. No fixes are planned as part of this cleanup phase.

## License

[MIT](LICENSE)

## Author

Built by [Tiago Gonçalves de Castro](https://github.com/tiagogcastro)
· [LinkedIn](https://www.linkedin.com/in/tiagogcastro)
