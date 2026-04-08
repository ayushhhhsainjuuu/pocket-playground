# Pocket Playground

Pocket Playground is a mobile application built with React Native (Expo). It provides a collection of simple mini-games with responsive UI, haptic feedback, and persistent data storage.

---

## Features

* Multiple mini-games:

  * Tic Tac Toe
  * Guess the Number
  * Memory Match
* Haptic feedback for user interactions
* Favorites system
* Persistent storage using AsyncStorage
* User settings (sound and vibration toggles)
* High score tracking

---

## Tech Stack

* React Native (Expo)
* Expo Router
* TypeScript
* AsyncStorage
* Expo Haptics

---

## Project Structure

```
app/
  game/
    [id].tsx

components/
  game/
    TicTacToe.tsx
    GuessNumber.tsx
    MemoryMatch.tsx

services/
  storage.ts
```

---

## How to Run

```
npx expo start
```

Run the app using:

* Expo Go (recommended)
* Android emulator
* iOS simulator

---

## Haptics

The application uses expo-haptics to provide tactile feedback:

* Tap: light feedback
* Win: success notification feedback
* Reset: medium impact feedback

Note: Haptics may not function properly on emulators. Testing on a physical device is recommended.

---

## Author

Ayush Sainju
Software Development Student, SAIT
