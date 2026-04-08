export type Game = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ComponentProps<typeof import("@expo/vector-icons").Ionicons>["name"];
  bg: string;
  iconBg: string;
};

export const games: Game[] = [
  {
    id: "tic-tac-toe",
    title: "Tic Tac Toe",
    description: "Classic 3x3 strategy game",
    category: "Board Game",
    icon: "grid-outline",
    bg: "#FF7A1A",
    iconBg: "#FFA04D",
  },
  {
    id: "memory-match",
    title: "Memory Match",
    description: "Flip cards and find pairs",
    category: "Memory",
    icon: "flower-outline",
    bg: "#FF3B4A",
    iconBg: "#FF6A75",
  },
  {
    id: "guess-number",
    title: "Guess the Number",
    description: "Find the hidden number",
    category: "Puzzle",
    icon: "help-buoy-outline",
    bg: "#F6A623",
    iconBg: "#F8BD4B",
  },
];

export function getGameById(gameId: string) {
  return games.find((game) => game.id === gameId);
}
