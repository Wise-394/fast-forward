import { getUsername } from "@/services/storage/user/userService";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const username = getUsername();
    if (!username) {
      router.replace("/onboarding");
    } else {
      router.replace("/");
    }
    setIsReady(true);
  }, []);

  if (!isReady) return null;

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
