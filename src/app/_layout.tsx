import { ConfirmationModal } from "@/components/ui/confirmationModal";
import { createTable } from "@/configs/Sqlite";
import { toastConfig } from "@/configs/toast";
import { useAuthStore } from "@/store/useAuthStore";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";
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
      <MenuProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <Toast config={toastConfig} />
        <ConfirmationModal />
      </MenuProvider>
    </SafeAreaProvider>
  );
}
