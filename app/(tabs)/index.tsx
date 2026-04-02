import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import GameCard from "../../components/GameCard";
import { games } from "../../data/game";
import { useFavorites } from "../../hooks/useFavorites";

export default function HomeScreen() {
  const { isFavorite, toggleFavorite } = useFavorites();

  async function openGame(id: string) {
    await Haptics.selectionAsync();
    router.push(`/game/${id}`);
  }

  async function goToHighScores() {
    await Haptics.selectionAsync();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerIcon}>
        <Ionicons name="game-controller-outline" size={24} color="#FF5A1F" />
      </View>

      <Text style={styles.title}>Pocket{"\n"}Playground</Text>
      <Text style={styles.subtitle}>Choose your adventure!</Text>

      <FlatList
        data={games}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
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
        ListFooterComponent={
          <Pressable style={styles.highScoreBtn} onPress={goToHighScores}>
            <Ionicons name="trophy-outline" size={16} color="#D97706" />
            <Text style={styles.highScoreText}>View High Scores</Text>
          </Pressable>
        }
      />
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
  headerIcon: {
    marginBottom: 10,
    marginTop: 4,
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
  listContent: {
    paddingBottom: 30,
  },
  highScoreBtn: {
    marginTop: 8,
    backgroundColor: "#F7F2E8",
    borderWidth: 1.5,
    borderColor: "#F0B36E",
    borderRadius: 10,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  highScoreText: {
    color: "#C2410C",
    fontSize: 16,
    fontWeight: "700",
  },
});