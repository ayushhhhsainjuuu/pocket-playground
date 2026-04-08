import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GameCard from "../../components/GameCard";
import { games } from "../../data/game";
import { useFavorites } from "../../hooks/useFavorites";

export default function HomeScreen() {
  const { isFavorite, toggleFavorite } = useFavorites();

  async function openGame(id: string) {
    await Haptics.selectionAsync();
    router.push(`/game/${id}`);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Ionicons name="game-controller-outline" size={36} color="#FF5A1F" />
        <Text style={styles.title}>Pocket{"\n"}Playground</Text>
      </View>

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
            icon={item.icon}
            bg={item.bg}
            iconBg={item.iconBg}
            isFavorite={isFavorite(item.id)}
            onPress={() => openGame(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        )}
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 10,
    marginTop: 4,
    marginLeft: -42,
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
});
