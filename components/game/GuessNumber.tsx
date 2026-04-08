import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Stack, router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { recordGuessNumberScore } from "../../services/storage";

function randomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

export default function GuessNumber() {
  const [target, setTarget] = useState(randomNumber());
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    const value = Number(guess);

    if (!guess.trim() || Number.isNaN(value)) {
      setMessage("Please enter a valid number.");
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }

    if (value < 1 || value > 100) {
      setMessage("Enter a number from 1 to 100.");
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (value === target) {
      setMessage(`Correct! You got it in ${nextAttempts} tries.`);
      await recordGuessNumberScore(nextAttempts);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return;
    }

    if (value < target) {
      setMessage("Too low. Try again.");
    } else {
      setMessage("Too high. Try again.");
    }

    await Haptics.selectionAsync();
    setGuess("");
  }

  async function handleNewGame() {
    setTarget(randomNumber());
    setGuess("");
    setAttempts(0);
    setMessage("");
    await Haptics.selectionAsync();
  }

  async function handleMenu() {
    await Haptics.selectionAsync();
    router.push("/");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Guess the Number</Text>
          <Text style={styles.subtitle}>
            I&apos;m thinking of a number between 1 and 100
          </Text>

          <View style={styles.attemptPill}>
            <Text style={styles.attemptText}>Attempts: {attempts}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <TextInput
            value={guess}
            onChangeText={setGuess}
            placeholder="Enter your guess"
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor="#8B8B8B"
          />

          <Pressable style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitBtnText}>Submit Guess</Text>
          </Pressable>
        </View>

        <View style={styles.feedbackWrap}>
          {!!message && <Text style={styles.feedback}>{message}</Text>}
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.actionBtn} onPress={handleNewGame}>
            <Ionicons name="refresh-outline" size={14} color="#DC2626" />
            <Text style={[styles.actionText, { color: "#DC2626" }]}>
              New Game
            </Text>
          </Pressable>

          <Pressable style={styles.actionBtn} onPress={handleMenu}>
            <Ionicons name="home-outline" size={14} color="#111827" />
            <Text style={styles.actionText}>Menu</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4C62B",
  },
  content: {
    width: "100%",
    maxWidth: 390,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  header: {
    alignItems: "center",
    marginBottom: 26,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
  },
  subtitle: {
    color: "#FFF8E7",
    fontSize: 12,
    marginTop: 8,
    fontWeight: "600",
    textAlign: "center",
  },
  attemptPill: {
    marginTop: 12,
    backgroundColor: "rgba(255,255,255,0.28)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  attemptText: {
    color: "#FFF8E7",
    fontSize: 11,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#FFF8F0",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  input: {
    backgroundColor: "#EAEAEA",
    borderWidth: 2,
    borderColor: "#E8A95A",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#111827",
    marginBottom: 10,
  },
  submitBtn: {
    backgroundColor: "#FF5A1F",
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: "center",
  },
  submitBtnText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 12,
  },
  feedbackWrap: {
    minHeight: 28,
    justifyContent: "center",
    marginTop: 12,
  },
  feedback: {
    textAlign: "center",
    color: "#7C2D12",
    fontSize: 13,
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    borderRadius: 8,
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  actionText: {
    color: "#111827",
    fontWeight: "700",
    fontSize: 12,
  },
});