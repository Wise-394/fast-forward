import { Screen } from "@/components/Screen";
import { DevSettingsPanel } from "@/components/features/devSettings";
import { AppText } from "@/components/ui/appText";
import { BackButton } from "@/components/ui/backButton";
import { View } from "react-native";

export default function DevPage() {
  return (
    <Screen>
      <View className="relative mb-5 flex-row items-center justify-center">
        <View className="absolute left-0">
          <BackButton />
        </View>

        <AppText className="text-center text-lg">SETTINGS</AppText>
      </View>
      <DevSettingsPanel />
    </Screen>
  );
}
