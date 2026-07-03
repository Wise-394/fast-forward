import { setUsername } from "@/services/storage/user/userService";
import {
  deleteAllMetadatas,
  selectAllMetadatas,
} from "@/services/storage/video/metadataQueries";
import { deleteVideoFile } from "@/services/storage/video/saveVideo";
import { router } from "expo-router";
import { Linking, View } from "react-native";
import Toast from "react-native-toast-message";
import { AppText } from "../ui/appText";
import { WideButton } from "../ui/wideButton";

export function DevSettingsPanel() {
  return (
    <View>
      <AppText>Dev Tools</AppText>
      <TestToastCard />
      <ResetUsernameCard />
      <ResetPermissionCard />
      <ClearAllVideosCard />
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

function ClearAllVideosCard() {
  const clearAllVideos = async () => {
    const videos = await selectAllMetadatas();
    videos.forEach((video) => deleteVideoFile(video.filepath));
    await deleteAllMetadatas();
  };

  return (
    <View className="bg-card rounded-xl p-4">
      <AppText className="mb-2 font-bold">Clear All Videos</AppText>
      <AppText className="text-muted mb-3 text-sm">
        Deletes all saved video files and their metadata.
      </AppText>
      <WideButton onClick={clearAllVideos} label="Delete All" />
    </View>
  );
}

function TestToastCard() {
  const showToast = () => {
    Toast.show({
      type: "info",
      text1: "pressed",
      text2: "toast is working",
    });
  };
  return (
    <View className="bg-card rounded-xl p-4">
      <AppText className="mb-2 font-bold">Test Toast</AppText>
      <WideButton onClick={showToast} label="Show" />
    </View>
  );
}
