import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Stack, router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { playSoundEffect } from "../../services/sound";
import { recordTicTacToeWin } from "../../services/storage";

type Player = "X" | "O";
type Cell = Player | null;

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [scoreSaved, setScoreSaved] = useState(false);

  const result = useMemo(() => calculateWinner(board), [board]);
  const winner = result.winner;
  const winningLine = result.line;
  const isDraw = !winner && board.every((cell) => cell !== null);

  useEffect(() => {
    async function saveWin() {
      if (winner && !scoreSaved) {
        await recordTicTacToeWin(winner);
        setScoreSaved(true);

        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success,
        );
      }
    }

    saveWin();
  }, [winner, scoreSaved]);

  async function handlePress(index: number) {
    if (board[index] || winner) return;

    const nextBoard = [...board];
    nextBoard[index] = isXTurn ? "X" : "O";

    setBoard(nextBoard);
    setIsXTurn((prev) => !prev);
    await Haptics.selectionAsync();
    await playSoundEffect();
  }

  async function handleReset() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setScoreSaved(false);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await playSoundEffect();
  }

  async function handleMenu() {
    await Haptics.selectionAsync();
    await playSoundEffect();
    router.push("/");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Tic Tac Toe</Text>
          <Text style={styles.subtitle}>
            {winner
              ? `Winner: ${winner}`
              : isDraw
                ? "It's a draw!"
                : `Current Turn: ${isXTurn ? "X" : "O"}`}
          </Text>
        </View>

        <View style={styles.boardCard}>
          <View style={styles.grid}>
            {board.map((cell, index) => {
              const isWinningCell = winningLine.includes(index);

              return (
                <Pressable
                  key={index}
                  style={[
                    styles.cell,
                    isWinningCell ? styles.winningCell : null,
                  ]}
                  onPress={() => handlePress(index)}
                >
                  <Text
                    style={[
                      styles.cellText,
                      cell === "X" ? styles.xText : null,
                      cell === "O" ? styles.oText : null,
                    ]}
                  >
                    {cell}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.actionBtn} onPress={handleReset}>
            <Ionicons name="refresh-outline" size={16} color="#DC2626" />
            <Text style={[styles.actionText, { color: "#DC2626" }]}>
              Restart
            </Text>
          </Pressable>

          <Pressable style={styles.actionBtn} onPress={handleMenu}>
            <Ionicons name="home-outline" size={16} color="#111827" />
            <Text style={styles.actionText}>Menu</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

function calculateWinner(board: Cell[]) {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a] as Player,
        line,
      };
    }
  }

  return {
    winner: null,
    line: [] as number[],
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F59E0B",
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
    fontSize: 36,
    fontWeight: "900",
    textAlign: "center",
  },
  subtitle: {
    color: "#FFF4D6",
    fontSize: 15,
    marginTop: 10,
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
    backgroundColor: "#F0E5D8",
    borderRadius: 16,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#E8A95A",
  },
  winningCell: {
    backgroundColor: "#FFE9B5",
    borderColor: "#F97316",
  },
  cellText: {
    fontSize: 42,
    fontWeight: "900",
  },
  xText: {
    color: "#F97316",
  },
  oText: {
    color: "#EF4444",
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
