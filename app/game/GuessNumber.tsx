import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveHighScore } from "../../services/storage";

export default function GuessNumber() {
  const [target, setTarget] = useState(() => random());
  const [guess, setGuess] = useState("");
  const [msg, setMsg] = useState("Guess 1–100");
  const [attempts, setAttempts] = useState(0);
  const [hasSavedScore, setHasSavedScore] = useState(false);

  async function handleGuess() {
    const num = Number(guess);
    if (!num) return;

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (num === target) {
      setMsg("Correct!");
      await saveScore(nextAttempts);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else if (num < target) {
      setMsg("Too low");
    } else {
      setMsg("Too high");
    }

    setGuess("");
  }

  async function saveScore(finalAttempts: number) {
    if (hasSavedScore) return;

    await saveHighScore({
      gameId: "guess-number",
      score: finalAttempts,
      scoreLabel: "Attempts",
      description: `${finalAttempts} attempts`,
    });

    setHasSavedScore(true);
  }

  function reset() {
    setTarget(random());
    setGuess("");
    setAttempts(0);
    setMsg("Guess 1–100");
  }

  return (
    <LinearGradient colors={["#F6A623", "#F8BD4B"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Guess Number</Text>
            <Text style={styles.subtitle}>{msg}</Text>
            <Text style={styles.attempts}>Attempts: {attempts}</Text>
          </View>

          <View style={styles.boardCard}>
            <TextInput
              style={styles.input}
              value={guess}
              onChangeText={setGuess}
              keyboardType="numeric"
              placeholder="Enter your guess"
              placeholderTextColor="#9CA3AF"
            />

            <Pressable style={styles.submitBtn} onPress={handleGuess}>
              <Text style={styles.submitText}>Submit Guess</Text>
            </Pressable>
          </View>

          <View style={styles.actions}>
            <Pressable style={styles.actionBtn} onPress={reset}>
              <Text style={styles.actionText}>New Game</Text>
            </Pressable>

            <Pressable
              style={styles.actionBtn}
              onPress={() => router.push("/")}
            >
              <Text style={styles.actionText}>Menu</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function random() {
  return Math.floor(Math.random() * 100) + 1;
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
  attempts: {
    color: "#FFE3C7",
    fontSize: 14,
    marginTop: 4,
    fontWeight: "600",
    textAlign: "center",
  },
  boardCard: {
    backgroundColor: "#F7EFE5",
    borderRadius: 22,
    padding: 20,
    width: "100%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    alignItems: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "#F2B8A0",
    borderRadius: 12,
    width: "80%",
    padding: 12,
    marginVertical: 10,
    fontSize: 18,
    textAlign: "center",
    backgroundColor: "#FFF8F0",
    color: "#111827",
  },
  submitBtn: {
    backgroundColor: "#F6A623",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 10,
    alignItems: "center",
  },
  submitText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 16,
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
  },
  actionText: {
    color: "#111827",
    fontWeight: "800",
    fontSize: 15,
  },
});
