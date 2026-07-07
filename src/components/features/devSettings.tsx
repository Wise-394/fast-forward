import { setUsername } from "@/services/storage/user/userService";
import {
  deleteAllMetadatas,
  selectAllMetadatas,
} from "@/services/storage/video/metadataQueries";
import { deleteVideoFile } from "@/services/storage/video/saveVideo";
import { useConfirmationModal } from "@/store/useConfirmationModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Linking, View } from "react-native";
import { AppText } from "../ui/appText";
import { WideButton } from "../ui/wideButton";

export function DevSettingsPanel() {
  return (
    <View>
      <ResetPermissionCard />
      <ResetUsernameCard />
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
      <View className="mb-1 flex-row items-center gap-2">
        <Ionicons name="person-remove-outline" size={18} color="#e05a5a" />
        <AppText className="font-bold">Reset Username</AppText>
      </View>
      <AppText className="text-sm text-text-muted"></AppText>
      <WideButton onClick={resetUsername} label="Reset My Username" />
    </View>
  );
}

function ResetPermissionCard() {
  const resetPermission = () => {
    Linking.openSettings();
  };

  return (
    <View className="bg-card rounded-xl p-4">
      <View className="mb-2 flex-row items-center gap-2">
        <Ionicons name="settings-outline" size={18} color="#1a3a7a" />
        <AppText className="font-bold">Camera / Mic Permissions</AppText>
      </View>
      <AppText className="mb-3 text-sm text-text-muted">
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
      <View className="mb-2 flex-row items-center gap-2">
        <Ionicons name="trash-outline" size={18} color="#e05a5a" />
        <AppText className="font-bold">Clear All Videos</AppText>
      </View>
      <AppText className="mb-3 text-sm text-text-muted">
        Deletes all saved video files and their metadata.
      </AppText>
      <WideButton onClick={clearAllVideos} label="Delete All" />
    </View>
  );
}
