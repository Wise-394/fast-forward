import { setUsername } from "@/services/storage/user/userService";
import { router } from "expo-router";
import { Linking, View } from "react-native";
import { AppText } from "../ui/appText";
import { WideButton } from "../ui/wideButton";
export function DevSettingsPanel() {
  return (
    <View>
      <AppText>Dev Tools</AppText>
      <ResetUsernameCard />
      <ResetPermissionCard />
    </View>
  );
}

function ResetUsernameCard() {
  const resetUsername = () => {
    setUsername("");
    router.replace("/onboarding");
  };
  return (
    <View className="bg-card rounded-xl p-4">
      <AppText className="font-bold">Reset Username</AppText>
      <AppText className="text-muted text-sm"></AppText>
      <WideButton onClick={resetUsername} label="Reset" />
    </View>
  );
}

function ResetPermissionCard() {
  const resetPermission = () => {
    Linking.openSettings();
  };

  return (
    <View className="bg-card rounded-xl p-4">
      <AppText className="mb-2 font-bold">Camera / Mic Permissions</AppText>
      <AppText className="text-muted mb-3 text-sm">
        Permissions can't be reset from inside the app. Tap below to open
        Settings, then toggle Camera/Microphone off and back on.
      </AppText>
      <WideButton onClick={resetPermission} label="Open App Settings" />
    </View>
  );
}
