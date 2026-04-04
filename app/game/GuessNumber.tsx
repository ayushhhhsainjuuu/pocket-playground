import * as Haptics from "expo-haptics";
import { Stack, router } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput
} from "react-native";

export default function GuessNumber() {
  const [target, setTarget] = useState(() => random());
  const [guess, setGuess] = useState("");
  const [msg, setMsg] = useState("Guess 1–100");
  const [attempts, setAttempts] = useState(0);

  function handleGuess() {
    const num = Number(guess);
    if (!num) return;

    setAttempts((a) => a + 1);

    if (num === target) {
      setMsg("Correct!");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else if (num < target) {
      setMsg("Too low");
    } else {
      setMsg("Too high");
    }

    setGuess("");
  }

  function reset() {
    setTarget(random());
    setGuess("");
    setAttempts(0);
    setMsg("Guess 1–100");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <Text style={styles.title}>Guess Number</Text>
      <Text>{msg}</Text>
      <Text>Attempts: {attempts}</Text>

      <TextInput
        style={styles.input}
        value={guess}
        onChangeText={setGuess}
        keyboardType="numeric"
      />

      <Pressable style={styles.btn} onPress={handleGuess}>
        <Text>Submit</Text>
      </Pressable>

      <Pressable style={styles.btn} onPress={reset}>
        <Text>Reset</Text>
      </Pressable>

      <Pressable style={styles.btn} onPress={() => router.push("/")}>
        <Text>Menu</Text>
      </Pressable>
    </SafeAreaView>
  );
}

function random() {
  return Math.floor(Math.random() * 100) + 1;
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 28, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    width: 200,
    padding: 10,
    marginVertical: 10,
  },
  btn: {
    padding: 10,
    backgroundColor: "#eee",
    marginTop: 10,
    borderRadius: 8,
  },
});