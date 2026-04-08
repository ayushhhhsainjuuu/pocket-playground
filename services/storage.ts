import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "pocketplayground:favorites";
const SETTINGS_KEY = "pocketplayground:settings";
const SCORES_KEY = "pocketplayground:scores";

export type AppSettings = {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
};

export type HighScores = {
  ticTacToeWins: {
    X: number;
    O: number;
  };
  guessNumberBestAttempts: number | null;
  memoryMatchBestMoves: number | null;
};

const defaultSettings: AppSettings = {
  soundEnabled: true,
  vibrationEnabled: true,
};

const defaultScores: HighScores = {
  ticTacToeWins: {
    X: 0,
    O: 0,
  },
  guessNumberBestAttempts: null,
  memoryMatchBestMoves: null,
};

export async function getFavorites(): Promise<string[]> {
  try {
    const value = await AsyncStorage.getItem(FAVORITES_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export async function saveFavorites(favorites: string[]) {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export async function toggleFavoriteStorage(gameId: string): Promise<string[]> {
  const favorites = await getFavorites();

  const updated = favorites.includes(gameId)
    ? favorites.filter((id) => id !== gameId)
    : [...favorites, gameId];

  await saveFavorites(updated);
  return updated;
}

export async function getSettings(): Promise<AppSettings> {
  try {
    const value = await AsyncStorage.getItem(SETTINGS_KEY);
    return value ? JSON.parse(value) : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export async function saveSettings(settings: AppSettings) {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export async function getHighScores(): Promise<HighScores> {
  try {
    const value = await AsyncStorage.getItem(SCORES_KEY);
    return value ? JSON.parse(value) : defaultScores;
  } catch {
    return defaultScores;
  }
}

export async function saveHighScores(scores: HighScores) {
  await AsyncStorage.setItem(SCORES_KEY, JSON.stringify(scores));
}

export async function recordTicTacToeWin(winner: "X" | "O") {
  const scores = await getHighScores();
  scores.ticTacToeWins[winner] += 1;
  await saveHighScores(scores);
}

export async function recordGuessNumberScore(attempts: number) {
  const scores = await getHighScores();

  if (
    scores.guessNumberBestAttempts === null ||
    attempts < scores.guessNumberBestAttempts
  ) {
    scores.guessNumberBestAttempts = attempts;
    await saveHighScores(scores);
  }
}

export async function recordMemoryMatchScore(moves: number) {
  const scores = await getHighScores();

  if (
    scores.memoryMatchBestMoves === null ||
    moves < scores.memoryMatchBestMoves
  ) {
    scores.memoryMatchBestMoves = moves;
    await saveHighScores(scores);
  }
}

export async function clearAllStorage() {
  await AsyncStorage.removeItem(FAVORITES_KEY);
  await AsyncStorage.removeItem(SETTINGS_KEY);
  await AsyncStorage.removeItem(SCORES_KEY);
}