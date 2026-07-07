# Fast Forward
> Send a message to your future self, built with React Native + SQLite as a hobby project.

<p align="center">
  <img width="800" alt="fastforward" src="https://github.com/user-attachments/assets/71449b91-de53-4b30-95bd-9da58e320677" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" />
 
</p>

---

## Screenshots

<p align="center">
  <img width="220" src="https://github.com/user-attachments/assets/f4534882-48f7-4db3-8f98-c26233b0d590" />
  <img width="220" src="https://github.com/user-attachments/assets/8b169ee7-fc56-48f5-b07d-9ee23e140d26" />
  <img width="220" src="https://github.com/user-attachments/assets/8e4cb388-2d30-486e-bae2-21b026c08649" />
  <img width="220" src="https://github.com/user-attachments/assets/61f5fc9d-c78a-4a27-93c2-66fb51456329" />
</p>

---

## Tech stack

<p align="center">
  <img width="60" title="React Native" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
  <img width="60" title="TypeScript" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
  <img width="60" title="SQLite" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" />
  <img width="60" title="Expo" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/expo/expo-original.svg" />
</p>

- **React Native (TypeScript)** — Cross-platform mobile app with type safety
- **SQLite** — Local, on-device database for storing messages, video paths, and unlock dates
- **Expo Camera** — Handles video recording and playback
- **Local File Storage** — Video files stored on device, referenced via SQLite

## About
Fast Forward is a small time-capsule app built to explore what it feels like to write to your future self. Instead of a diary you read back immediately, every entry here is locked away until a date you choose — a birthday, a new year, a "check in with yourself" reminder six months from now.

Under the hood, it's a hobby project meant to get real practice with the parts of mobile development that don't show up in tutorials: persisting structured data locally with SQLite, storing and retrieving video files from device storage, and building date-driven logic that decides what's visible and what stays hidden. Every time the app opens, it checks stored unlock dates against the current date and reveals anything whose time has come.
