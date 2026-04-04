import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import GameCard from "../../components/GameCard";
import { games } from "../../data/game";
import { useFavorites } from "../../hooks/useFavorites";

export default function LibraryScreen() {
  const { favorites, isFavorite, toggleFavorite, reloadFavorites } = useFavorites();

  useFocusEffect(
    useCallback(() => {
      reloadFavorites();
    }, [])
  );

  const favoriteGames = games.filter((game) => favorites.includes(game.id));

  async function openGame(id: string) {
    await Haptics.selectionAsync();
    router.push(`/game/${id}`);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.subtitle}>Your saved games</Text>

      {favoriteGames.length === 0 ? (
        <View style={styles.emptyCard}>
          <Ionicons name="heart-dislike-outline" size={50} color="#9CA3AF" />
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptyText}>
            You haven't added any games to your favorites yet.
          </Text>

          <Pressable style={styles.browseBtn} onPress={() => router.push("/")}>
            <Text style={styles.browseBtnText}>Browse Games</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={favoriteGames}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <GameCard
              title={item.title}
              description={item.description}
              category={item.category}
              isFavorite={isFavorite(item.id)}
              onPress={() => openGame(item.id)}
              onToggleFavorite={() => toggleFavorite(item.id)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4DD80",
    paddingHorizontal: 18,
    paddingTop: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#FF4A1C",
    textAlign: "center",
    marginTop: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#4B5563",
    marginTop: 6,
    marginBottom: 24,
  },
  emptyCard: {
    backgroundColor: "rgba(255,248,240,0.92)",
    borderRadius: 18,
    paddingVertical: 36,
    paddingHorizontal: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0C68B",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#374151",
    marginTop: 12,
  },
  emptyText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 8,
    marginBottom: 18,
  },
  browseBtn: {
    backgroundColor: "#FF4A1C",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
  },
  browseBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
});