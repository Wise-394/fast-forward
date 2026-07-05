import { setUsername } from "@/services/storage/user/userService";
import {
  deleteAllMetadatas,
  selectAllMetadatas,
} from "@/services/storage/video/metadataQueries";
import { deleteVideoFile } from "@/services/storage/video/saveVideo";
import { useConfirmationModal } from "@/store/useConfirmationModal";
import { router } from "expo-router";
import { Linking, View } from "react-native";
import { AppText } from "../ui/appText";
import { WideButton } from "../ui/wideButton";

export function DevSettingsPanel() {
  return (
    <View>
      <ResetUsernameCard />
      <ResetPermissionCard />
      <ClearAllVideosCard />
    </View>
  );
}

function ResetUsernameCard() {
  const openModal = useConfirmationModal((state) => state.openModal);
  const closeModal = useConfirmationModal((state) => state.closeModal);

  const resetUsername = () => {
    openModal({
      type: "danger",
      message: "This will reset your username and send you back to onboarding.",
      onConfirm: () => {
        setUsername("");
        router.replace("/onboarding");
        closeModal();
      },
    });
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
  const openModal = useConfirmationModal((state) => state.openModal);
  const closeModal = useConfirmationModal((state) => state.closeModal);

  const clearAllVideos = () => {
    openModal({
      type: "danger",
      message: "Deletes all saved video files and their metadata.",
      onConfirm: async () => {
        const videos = await selectAllMetadatas();
        videos.forEach((video) => deleteVideoFile(video.filepath));
        await deleteAllMetadatas();
        closeModal();
      },
    });
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
