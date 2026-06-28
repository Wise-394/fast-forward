import { DevSettingsPanel } from "@/components/features/devSettings";
import { Screen } from "@/components/Screen";
import { AppText } from "@/components/ui/appText";
import { View } from "react-native";

export default function Settings() {
  return (
    <Screen>
      <AppText className="text-center text-lg">SETTINGS</AppText>
      <View>
        <DevSettingsPanel />
      </View>
    </Screen>
  );
}
// TODO add dev page for testing
