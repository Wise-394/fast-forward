import { Screen } from "@/components/Screen";
import { AppInput } from "@/components/ui/appInput";
import { AppText } from "@/components/ui/appText";
import { WideButton } from "@/components/ui/wideButton";
import { validateUsername } from "@/services/validations/validateUsername";
import { useAuthStore } from "@/store/useAuthStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";

export default function Register() {
  const [usernameInput, setUsernameInput] = useState("");
  const setUsernameStore = useAuthStore((state) => state.setUsernameStore);

  const handleSubmit = () => {
    const validationsErrors = validateUsername(usernameInput);
    if (validationsErrors) {
      return Toast.show({ type: "error", text1: validationsErrors });
    }
    setUsernameStore(usernameInput);
    router.replace("/");
  };

  return (
    <Screen>
      <AppText className="text-2xl font-bold">Flash Forward</AppText>

      <View className="mb-5 mt-[20vh] w-full gap-5">
        <View className="h-20 w-20 items-center justify-center self-center rounded-full bg-primary">
          <Ionicons name="mail-outline" size={38} color="#d0e8ff" />
        </View>

        <AppText className="text-center text-2xl font-bold text-text-primary">
          Welcome to Flash Forward
        </AppText>
        <AppText className="text-center text-text-secondary">
          Pick a nickname and send a message to your future self.
        </AppText>

        <AppInput
          placeholder="Enter your nickname"
          value={usernameInput}
          onChange={setUsernameInput}
        />
      </View>

      <View className="w-full">
        <WideButton label="Confirm" onClick={handleSubmit} />
      </View>
    </Screen>
  );
}
