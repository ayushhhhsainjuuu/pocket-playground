import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { getHighScores, HighScores } from "../services/storage";

const defaultScores: HighScores = {
  ticTacToeWins: { X: 0, O: 0 },
  guessNumberBestAttempts: null,
  memoryMatchBestMoves: null,
};

export default function HighScoresScreen() {
  const [scores, setScores] = useState<HighScores>(defaultScores);

  useFocusEffect(
    useCallback(() => {
      loadScores();
    }, [])
  );

  async function loadScores() {
    const stored = await getHighScores();
    setScores(stored);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>High Scores</Text>
      <Text style={styles.subtitle}>Your best game stats</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="grid-outline" size={18} color="#FF7A1A" />
          <Text style={styles.label}>Tic Tac Toe - X Wins</Text>
          <Text style={styles.value}>{scores.ticTacToeWins.X}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="grid-outline" size={18} color="#EF4444" />
          <Text style={styles.label}>Tic Tac Toe - O Wins</Text>
          <Text style={styles.value}>{scores.ticTacToeWins.O}</Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="help-circle-outline" size={18} color="#F59E0B" />
          <Text style={styles.label}>Guess Number Best</Text>
          <Text style={styles.value}>
            {scores.guessNumberBestAttempts ?? "-"}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="flower-outline" size={18} color="#FF3B4A" />
          <Text style={styles.label}>Memory Match Best</Text>
          <Text style={styles.value}>
            {scores.memoryMatchBestMoves ?? "-"}
          </Text>
        </View>
      </View>

      <Pressable style={styles.backBtn} onPress={() => router.push("/")}>
        <Ionicons name="arrow-back-outline" size={18} color="#C2410C" />
        <Text style={styles.backBtnText}>Back to Hub</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4DD80",
    paddingHorizontal: 18,
    paddingTop: 60,
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#FF4A1C",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#4B5563",
    marginTop: 8,
    marginBottom: 24,
    fontSize: 16,
  },
  card: {
    backgroundColor: "#FFF8F0",
    borderRadius: 18,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    gap: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
  },
  value: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
  },
  backBtn: {
    marginTop: 20,
    backgroundColor: "#F7F2E8",
    borderWidth: 1.5,
    borderColor: "#F0B36E",
    borderRadius: 12,
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  backBtnText: {
    color: "#C2410C",
    fontSize: 15,
    fontWeight: "700",
  },
});