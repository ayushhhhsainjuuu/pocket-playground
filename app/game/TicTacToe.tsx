import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveHighScore } from "../../services/storage";

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [savedScore, setSavedScore] = useState(false);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);

  function handlePress(index: number) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
    Haptics.selectionAsync();
  }

  function handleReset() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setSavedScore(false);
  }

  useEffect(() => {
    if ((!winner && !isDraw) || savedScore) return;

    async function persistScore() {
      await saveHighScore({
        gameId: "tic-tac-toe",
        score: winner ? 1 : 0,
        scoreLabel: winner ? "Win" : "Draw",
        description: winner ? `${winner} wins` : "Draw",
      });
      setSavedScore(true);
    }

    persistScore();
  }, [winner, isDraw, savedScore]);

  return (
    <LinearGradient colors={["#FF7A1A", "#FFA04D"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Tic Tac Toe</Text>
            <Text style={styles.subtitle}>
              {winner
                ? `Winner: ${winner}`
                : isDraw
                  ? "Draw!"
                  : `Turn: ${isXTurn ? "X" : "O"}`}
            </Text>
          </View>

          <View style={styles.boardCard}>
            <View style={styles.grid}>
              {board.map((cell, i) => (
                <Pressable
                  key={i}
                  style={styles.cell}
                  onPress={() => handlePress(i)}
                >
                  <Text style={styles.cellText}>{cell}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.actions}>
            <Pressable style={styles.actionBtn} onPress={handleReset}>
              <Ionicons name="refresh-outline" size={16} color="#DC2626" />
              <Text style={[styles.actionText, { color: "#DC2626" }]}>
                Restart
              </Text>
            </Pressable>

            <Pressable
              style={styles.actionBtn}
              onPress={() => router.push("/")}
            >
              <Ionicons name="home-outline" size={16} color="#111827" />
              <Text style={styles.actionText}>Menu</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function calculateWinner(board: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    width: "100%",
    maxWidth: 390,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingTop: 42,
  },
  header: {
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
    textAlign: "center",
  },
  subtitle: {
    color: "#FFF5EE",
    fontSize: 15,
    marginTop: 8,
    fontWeight: "700",
    textAlign: "center",
  },
  boardCard: {
    backgroundColor: "#F7EFE5",
    borderRadius: 22,
    padding: 14,
    width: "100%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cell: {
    width: "31%",
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#F2B8A0",
    backgroundColor: "#FFF8F0",
  },
  cellText: {
    fontSize: 34,
    fontWeight: "900",
    color: "#FF7A1A",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
    width: "100%",
    alignSelf: "center",
  },
  actionBtn: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
  },
  actionText: {
    color: "#111827",
    fontWeight: "800",
    fontSize: 15,
  },
});
