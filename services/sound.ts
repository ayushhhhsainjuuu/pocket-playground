import { Asset } from "expo-asset";
import { AudioPlayer, createAudioPlayer } from "expo-audio";
import { getSettings } from "./storage";

let soundPlayer: AudioPlayer | null = null;

export async function playSoundEffect() {
  try {
    const settings = await getSettings();
    if (!settings.soundEnabled) return;

    if (soundPlayer) {
      soundPlayer.remove();
    }

    const asset = Asset.fromModule(require("../assets/sounds/click.mp3"));
    await asset.downloadAsync();

    soundPlayer = createAudioPlayer(asset);
    await soundPlayer.play();
  } catch (error) {
    console.warn("Failed to play sound effect:", error);
  }
}

export async function unloadSound() {
  if (soundPlayer) {
    soundPlayer.remove();
    soundPlayer = null;
  }
}
