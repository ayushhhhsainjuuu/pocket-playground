import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

import {
  clearAllStorage,
  getSettings,
  saveSettings,
} from "../../services/storage";

type SettingsState = {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
};

export default function SettingsScreen() {
  const [settings, setSettings] = useState<SettingsState>({
    soundEnabled: true,
    vibrationEnabled: true,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const stored = await getSettings();
    setSettings(stored);
  }

  async function updateSetting<K extends keyof SettingsState>(
    key: K,
    value: SettingsState[K]
  ) {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    await saveSettings(updated);

    if (key === "vibrationEnabled" && value) {
      await Haptics.selectionAsync();
    }
  }

  function handleClearData() {
    Alert.alert("Clear all saved data?", "This action cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          await clearAllStorage();
          setSettings({
            soundEnabled: true,
            vibrationEnabled: true,
          });
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Customize your experience</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.labelWrap}>
            <Ionicons name="volume-medium-outline" size={18} color="#FF4A1C" />
            <Text style={styles.label}>Enable Audio</Text>
          </View>
          <Switch
            value={settings.soundEnabled}
            onValueChange={(value) => updateSetting("soundEnabled", value)}
          />
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.labelWrap}>
            <Ionicons
              name="phone-portrait-outline"
              size={18}
              color="#FF4A1C"
            />
            <Text style={styles.label}>Enable Vibration</Text>
          </View>
          <Switch
            value={settings.vibrationEnabled}
            onValueChange={(value) => updateSetting("vibrationEnabled", value)}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Data Management</Text>
        <Text style={styles.desc}>Delete saved favorites and settings</Text>

        <Pressable style={styles.clearBtn} onPress={handleClearData}>
          <Text style={styles.clearBtnText}>Clear All Data</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4DD80",
    padding: 18,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FF4A1C",
    textAlign: "center",
    marginTop: 10,
  },
  subtitle: {
    textAlign: "center",
    color: "#4B5563",
    marginTop: 6,
    marginBottom: 18,
  },
  card: {
    backgroundColor: "#F8F4EC",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  desc: {
    color: "#6B7280",
    marginTop: 8,
    marginBottom: 12,
  },
  clearBtn: {
    backgroundColor: "#EF4444",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  clearBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
});