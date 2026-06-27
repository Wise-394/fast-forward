import { getUsername } from "@/services/storage/user/userService";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const username = getUsername();

  useEffect(() => {
    if (!username) {
      router.replace("/onboarding");
    } else {
      router.replace("/");
    }
  }, []);

  return <Stack />;
}
