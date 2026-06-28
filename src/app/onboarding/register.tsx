import Screen from "@/components/Screen";
import { AppInput } from "@/components/ui/appInput";
import { AppText } from "@/components/ui/appText";
import { WideButton } from "@/components/ui/wideButton";
import { useState } from "react";
import { View } from "react-native";

export default function Register() {
  const [usernameInput, setUsernameInput] = useState("");

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
        <WideButton label="Confirm" onClick={() => {}} />
      </View>
    </Screen>
  );
}
