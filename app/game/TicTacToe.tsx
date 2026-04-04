import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

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
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <Text style={styles.title}>Tic Tac Toe</Text>

      <Text style={styles.subtitle}>
        {winner
          ? `Winner: ${winner}`
          : isDraw
          ? "Draw!"
          : `Turn: ${isXTurn ? "X" : "O"}`}
      </Text>

      <View style={styles.grid}>
        {board.map((cell, i) => (
          <Pressable key={i} style={styles.cell} onPress={() => handlePress(i)}>
            <Text style={styles.cellText}>{cell}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.btn} onPress={handleReset}>
          <Ionicons name="refresh-outline" size={16} />
          <Text>Restart</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => router.push("/")}>
          <Ionicons name="home-outline" size={16} />
          <Text>Menu</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function calculateWinner(board: (string | null)[]) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];

  for (let [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold" },
  subtitle: { marginVertical: 10 },
  grid: { width: 300, flexDirection: "row", flexWrap: "wrap" },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: { fontSize: 30 },
  actions: { flexDirection: "row", marginTop: 20, gap: 10 },
  btn: {
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
    flexDirection: "row",
    gap: 5,
  },
});