import { setUsername } from "@/services/storage/user/userService";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { AppText } from "../ui/appText";

export function DevSettingsPanel() {
  return (
    <View>
      <AppText>Dev Tools</AppText>
      <ResetUsernameCard />
    </View>
  );
}

function ResetUsernameCard() {
  const resetUsername = () => {
    setUsername("");
    router.replace("/onboarding");
  };
  return (
    <Pressable onPress={resetUsername}>
      <AppText>Reset Username</AppText>
    </Pressable>
  );
}
// TODO zustand
