import { useLocalSearchParams } from "expo-router";
import GuessNumber from "./GuessNumber";
import TicTacToe from "./TicTacToe";

export default function GameScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (id === "tic-tac-toe") return <TicTacToe />;
  if (id === "guess-number") return <GuessNumber />;

  return null;
}