import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "pocketplayground:favorites";
const SETTINGS_KEY = "pocketplayground:settings";
const HIGH_SCORES_KEY = "pocketplayground:highscores";

export type AppSettings = {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
};

export type HighScoreEntry = {
  id: string;
  gameId: string;
  score: number;
  scoreLabel: string;
  description: string;
  date: string;
};

const defaultSettings: AppSettings = {
  soundEnabled: true,
  vibrationEnabled: true,
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

export async function getHighScores(): Promise<HighScoreEntry[]> {
  try {
    const value = await AsyncStorage.getItem(HIGH_SCORES_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export async function saveHighScore(
  entry: Omit<HighScoreEntry, "id" | "date">,
): Promise<HighScoreEntry[]> {
  const current = await getHighScores();
  const nextEntry: HighScoreEntry = {
    id: `${entry.gameId}-${Date.now()}`,
    date: new Date().toISOString(),
    ...entry,
  };

  const updated = [nextEntry, ...current];
  await AsyncStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(updated));
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

export async function clearAllStorage() {
  await AsyncStorage.removeItem(FAVORITES_KEY);
  await AsyncStorage.removeItem(SETTINGS_KEY);
}
