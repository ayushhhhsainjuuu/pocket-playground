import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  description: string;
  category: string;
  isFavorite?: boolean;
  onPress: () => void;
  onToggleFavorite?: () => void;
};

function getCardColors(title: string) {
  if (title.toLowerCase().includes("tic")) {
    return {
      bg: "#FF7A1A",
      iconBg: "#FFA04D",
      icon: "grid-outline" as const,
    };
  }

  if (title.toLowerCase().includes("memory")) {
    return {
      bg: "#FF3B4A",
      iconBg: "#FF6A75",
      icon: "flower-outline" as const,
    };
  }

  return {
    bg: "#F6A623",
    iconBg: "#F8BD4B",
    icon: "help-buoy-outline" as const,
  };
}

export default function GameCard({
  title,
  description,
  category,
  isFavorite = false,
  onPress,
  onToggleFavorite,
}: Props) {
  const theme = getCardColors(title);

  return (
    <Pressable style={[styles.card, { backgroundColor: theme.bg }]} onPress={onPress}>
      <View style={styles.left}>
        <View style={[styles.iconWrap, { backgroundColor: theme.iconBg }]}>
          <Ionicons name={theme.icon} size={28} color="#fff" />
        </View>

        <View style={styles.textWrap}>
          <Text style={styles.title}>{title}</Text>
          {!!description && <Text style={styles.description}>{description}</Text>}
          {!!category && <Text style={styles.category}>{category}</Text>}
        </View>
      </View>

      {onToggleFavorite && (
        <Pressable style={styles.favoriteBtn} onPress={onToggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={22}
            color="#fff"
          />
        </Pressable>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 88,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "#FFF3E8",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconWrap: {
    width: 50,
    height: 50,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 2,
  },
  description: {
    color: "#FFF5EE",
    fontSize: 12,
    marginBottom: 2,
  },
  category: {
    color: "#FFE3C7",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  favoriteBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});