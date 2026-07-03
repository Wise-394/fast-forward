import { createTable } from "@/configs/Sqlite";
import { useAuthStore } from "@/store/useAuthStore";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "../../global.css";

export default function RootLayout() {
  const username = useAuthStore((state) => state.username);

  useEffect(() => {
    createTable();
    if (!username) {
      router.replace("/onboarding");
    } else {
      router.replace("/");
    }
  }, [username]);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </SafeAreaProvider>
  );
}
