import { Screen } from "@/components/Screen";
import { AppInput } from "@/components/ui/appInput";
import { AppText } from "@/components/ui/appText";
import { WideButton } from "@/components/ui/wideButton";
import { validateUsername } from "@/services/validations/validateUsername";
import { useAuthStore } from "@/store/useAuthStore";
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
      <View className="mt-auto gap-5">
        <AppInput
          placeholder="Username"
          value={usernameInput}
          onChange={setUsernameInput}
        />
        <AppText className="text-center text-lg">Enter Your Nickname</AppText>
      </View>
      <View className="mt-auto w-full">
        <WideButton label="Confirm" onClick={handleSubmit} />
      </View>
    </Screen>
  );
}
