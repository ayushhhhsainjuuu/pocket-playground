import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function GameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const winner = calculateWinner(board);

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
          : `Turn: ${isXTurn ? "X" : "O"}`}
      </Text>

      <View style={styles.grid}>
        {board.map((cell, index) => (
          <Pressable
            key={index}
            style={styles.cell}
            onPress={() => handlePress(index)}
          >
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

  for (let line of lines) {
    const [a,b,c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4DD80",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    marginVertical: 10,
    fontSize: 18,
  },
  grid: {
    width: 300,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  cellText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  btn: {
    flexDirection: "row",
    gap: 5,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
});