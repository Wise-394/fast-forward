import { DevSettingsPanel } from "@/components/features/devSettings";
import { Profile } from "@/components/features/Profile";
import { Screen } from "@/components/Screen";
import { AppText } from "@/components/ui/appText";
import { ScrollView, View } from "react-native";

export default function Settings() {
  return (
    <Screen>
      <AppText className="p-4 text-lg">SETTINGS</AppText>
      <ScrollView>
        <View className="items-center">
          <Profile />
        </View>
        <View className="m-2 h-[1px] w-full bg-primary-bright/50" />
        <DevSettingsPanel />
      </ScrollView>
    </Screen>
  );
}
