import { DevSettingsPanel } from "@/components/features/devSettings";
import { Screen } from "@/components/Screen";
import { AppText } from "@/components/ui/appText";

export default function Settings() {
  return (
    <Screen>
      <AppText className="text-center text-lg">SETTINGS</AppText>
      <DevSettingsPanel />
    </Screen>
  );
}
