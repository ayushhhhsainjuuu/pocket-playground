import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { getFavorites, toggleFavoriteStorage } from "../services/storage";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  async function loadFavorites() {
    const stored = await getFavorites();
    setFavorites(stored);
  }

  async function toggleFavorite(gameId: string) {
    const updated = await toggleFavoriteStorage(gameId);
    setFavorites(updated);

    // vibration feedback
    await Haptics.selectionAsync();
  }

  function isFavorite(gameId: string) {
    return favorites.includes(gameId);
  }

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    reloadFavorites: loadFavorites,
  };
}