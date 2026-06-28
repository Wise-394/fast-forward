import { Screen } from "@/components/Screen";
import { AppInput } from "@/components/ui/appInput";
import { AppText } from "@/components/ui/appText";
import { WideButton } from "@/components/ui/wideButton";
import { setUsername } from "@/services/storage/user/userService";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function Register() {
  const [usernameInput, setUsernameInput] = useState("");

  const handleSubmit = () => {
    setUsername(usernameInput);
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
