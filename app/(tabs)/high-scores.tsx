import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Stack } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { games } from "../../data/game";
import { getHighScores, HighScoreEntry } from "../../services/storage";

const filters: {
  key: "highest" | "recent" | "search";
  label: string;
  icon: string;
}[] = [
  { key: "highest", label: "Highest", icon: "trophy-outline" },
  { key: "recent", label: "Recent", icon: "calendar-outline" },
  { key: "search", label: "Search Games", icon: "search-outline" },
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString();
}

export default function HighScoresScreen() {
  const [highScores, setHighScores] = useState<HighScoreEntry[]>([]);
  const [activeFilter, setActiveFilter] = useState<
    "highest" | "recent" | "search"
  >("highest");
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  useEffect(() => {
    loadScores();
  }, []);

  async function loadScores() {
    const scores = await getHighScores();
    setHighScores(scores);
  }

  const filteredScores = useMemo(() => {
    let list = selectedGameId
      ? highScores.filter((item) => item.gameId === selectedGameId)
      : [...highScores];

    if (activeFilter === "highest") {
      return list.sort(
        (a, b) =>
          b.score - a.score ||
          new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }

    if (activeFilter === "recent") {
      return list.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }

    return list;
  }, [activeFilter, highScores, selectedGameId]);

  function handleFilter(key: "highest" | "recent" | "search") {
    Haptics.selectionAsync();
    setActiveFilter(key);

    if (key !== "search") {
      setSelectedGameId(null);
    }
  }

  function handleGameSelect(gameId: string) {
    Haptics.selectionAsync();
    setSelectedGameId((current) => (current === gameId ? null : gameId));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <Text style={styles.title}>High Scores</Text>
      <Text style={styles.subtitle}>Select a filter to sort your scores!</Text>

      <View style={styles.filterRow}>
        {filters.map((filter) => (
          <Pressable
            key={filter.key}
            style={[
              styles.filterButton,
              activeFilter === filter.key && styles.filterButtonActive,
            ]}
            onPress={() => handleFilter(filter.key)}
          >
            <Ionicons
              name={filter.icon as any}
              size={18}
              color={activeFilter === filter.key ? "#fff" : "#8F2300"}
            />
            <Text
              style={[
                styles.filterButtonText,
                activeFilter === filter.key && styles.filterButtonTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {activeFilter === "search" && (
        <View style={styles.gameGrid}>
          {games.map((game) => (
            <Pressable
              key={game.id}
              style={[
                styles.gameTile,
                { backgroundColor: game.iconBg },
                selectedGameId === game.id && styles.gameTileSelected,
              ]}
              onPress={() => handleGameSelect(game.id)}
            >
              <Ionicons name={game.icon as any} size={26} color="#fff" />
              <Text style={styles.gameTileLabel}>{game.title}</Text>
            </Pressable>
          ))}
        </View>
      )}

      <View style={styles.listWrapper}>
        <FlatList
          data={filteredScores}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                No high scores yet. Play one of the games to save your best
                runs.
              </Text>
            </View>
          )}
          renderItem={({ item }) => {
            const game = games.find((gameItem) => gameItem.id === item.gameId);

            return (
              <View style={styles.scoreRow}>
                <View style={styles.scoreLeft}>
                  <View
                    style={[
                      styles.scoreIcon,
                      { backgroundColor: game?.iconBg ?? "#ccc" },
                    ]}
                  >
                    <Ionicons
                      name={(game?.icon ?? "game-controller-outline") as any}
                      size={20}
                      color="#fff"
                    />
                  </View>
                  <View style={styles.scoreTextWrap}>
                    <Text style={styles.scoreTitle}>
                      {game?.title ?? item.gameId}
                    </Text>
                    <Text style={styles.scoreSubtitle}>{item.description}</Text>
                  </View>
                </View>
                <View style={styles.scoreMeta}>
                  <Text style={styles.scoreValue}>{item.score}</Text>
                  <Text style={styles.scoreLabel}>{item.scoreLabel}</Text>
                  <Text style={styles.scoreDate}>{formatDate(item.date)}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4DD80",
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 34,
    lineHeight: 36,
    fontWeight: "900",
    color: "#FF4A1C",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#4B5563",
    textAlign: "center",
    marginTop: 12,
    marginBottom: 24,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  filterButton: {
    flex: 1,
    backgroundColor: "#FFE8C1",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
    borderWidth: 1,
    borderColor: "#F0B36E",
  },
  filterButtonActive: {
    backgroundColor: "#FF7A1A",
    borderColor: "#DD5A00",
  },
  filterButtonText: {
    color: "#8F2300",
    fontWeight: "700",
    fontSize: 13,
  },
  filterButtonTextActive: {
    color: "#fff",
  },
  gameGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  gameTile: {
    width: "32%",
    minHeight: 98,
    borderRadius: 18,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  gameTileSelected: {
    borderWidth: 2,
    borderColor: "#fff",
  },
  gameTileLabel: {
    marginTop: 8,
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  listWrapper: {
    flex: 1,
    marginBottom: 18,
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  scoreLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  scoreIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  scoreTextWrap: {
    flex: 1,
  },
  scoreTitle: {
    color: "#111827",
    fontWeight: "800",
    fontSize: 15,
  },
  scoreSubtitle: {
    color: "#6B7280",
    fontSize: 12,
    marginTop: 2,
  },
  scoreMeta: {
    alignItems: "flex-end",
  },
  scoreValue: {
    color: "#C2410C",
    fontWeight: "800",
    fontSize: 16,
  },
  scoreLabel: {
    color: "#9A3412",
    fontSize: 12,
  },
  scoreDate: {
    color: "#6B7280",
    fontSize: 10,
    marginTop: 2,
  },
  emptyState: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#6B7280",
    textAlign: "center",
    fontSize: 14,
  },
});
