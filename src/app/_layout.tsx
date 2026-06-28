import { getUsername } from "@/services/storage/user/userService";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";

export default function RootLayout() {
  useEffect(() => {
    const username = getUsername();
    if (!username) {
      router.replace("/onboarding");
    } else {
      router.replace("/");
    }
  }, []);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
