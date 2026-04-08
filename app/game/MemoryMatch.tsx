import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Stack, router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { saveHighScore } from "../../services/storage";

type Card = {
  id: number;
  symbol: string;
  matched: boolean;
};

const SYMBOLS = ["🍎", "⭐", "🎈", "🚗", "🐶", "⚽"];

function createDeck(): Card[] {
  const doubled = [...SYMBOLS, ...SYMBOLS]
    .map((symbol, index) => ({
      id: index + 1,
      symbol,
      matched: false,
    }))
    .sort(() => Math.random() - 0.5);

  return doubled;
}

export default function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>(createDeck());
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [busy, setBusy] = useState(false);
  const [savedScore, setSavedScore] = useState(false);

  const allMatched = useMemo(
    () => cards.length > 0 && cards.every((card) => card.matched),
    [cards],
  );

  useEffect(() => {
    if (flippedIndexes.length !== 2) return;

    const [firstIndex, secondIndex] = flippedIndexes;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    if (!firstCard || !secondCard) return;

    setBusy(true);

    if (firstCard.symbol === secondCard.symbol) {
      const timer = setTimeout(() => {
        setCards((prev) =>
          prev.map((card, index) =>
            index === firstIndex || index === secondIndex
              ? { ...card, matched: true }
              : card,
          ),
        );
        setFlippedIndexes([]);
        setBusy(false);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }, 400);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setFlippedIndexes([]);
        setBusy(false);
        Haptics.selectionAsync();
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [flippedIndexes, cards]);

  useEffect(() => {
    if (!allMatched || savedScore) return;

    async function persistScore() {
      await saveHighScore({
        gameId: "memory-match",
        score: moves,
        scoreLabel: "Moves",
        description: `${moves} moves`,
      });
      setSavedScore(true);
    }

    persistScore();
  }, [allMatched, moves, savedScore]);

  function handlePress(index: number) {
    if (busy) return;
    if (flippedIndexes.includes(index)) return;
    if (cards[index].matched) return;
    if (flippedIndexes.length === 2) return;

    const next = [...flippedIndexes, index];
    setFlippedIndexes(next);

    if (next.length === 2) {
      setMoves((prev) => prev + 1);
    }

    Haptics.selectionAsync();
  }

  function resetGame() {
    setCards(createDeck());
    setFlippedIndexes([]);
    setMoves(0);
    setBusy(false);
    Haptics.selectionAsync();
  }

  function goMenu() {
    Haptics.selectionAsync();
    router.push("/");
  }

  function isFaceUp(index: number) {
    return flippedIndexes.includes(index) || cards[index].matched;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Memory Match</Text>
          <Text style={styles.subtitle}>
            {allMatched ? "You matched them all!" : `Moves: ${moves}`}
          </Text>
        </View>

        <View style={styles.boardCard}>
          <View style={styles.grid}>
            {cards.map((card, index) => {
              const faceUp = isFaceUp(index);

              return (
                <Pressable
                  key={card.id}
                  style={[
                    styles.card,
                    faceUp ? styles.cardFaceUp : styles.cardFaceDown,
                    card.matched ? styles.cardMatched : null,
                  ]}
                  onPress={() => handlePress(index)}
                >
                  <Text style={styles.cardText}>
                    {faceUp ? card.symbol : "?"}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.actionBtn} onPress={resetGame}>
            <Ionicons name="refresh-outline" size={16} color="#DC2626" />
            <Text style={[styles.actionText, { color: "#DC2626" }]}>
              Restart
            </Text>
          </Pressable>

          <Pressable style={styles.actionBtn} onPress={goMenu}>
            <Ionicons name="home-outline" size={16} color="#111827" />
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
    backgroundColor: "#FF5A5F",
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
    color: "#FFE8EA",
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
  card: {
    width: "31%",
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  cardFaceUp: {
    backgroundColor: "#FFF8F0",
    borderColor: "#F2B8A0",
  },
  cardFaceDown: {
    backgroundColor: "#F9C4C7",
    borderColor: "#F08B92",
  },
  cardMatched: {
    backgroundColor: "#FFE8B3",
    borderColor: "#F5B942",
  },
  cardText: {
    fontSize: 34,
    fontWeight: "900",
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
