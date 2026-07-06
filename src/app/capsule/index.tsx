import { CapsuleMenu } from "@/components/features/capsuleMenu";
import { FutureNotes } from "@/components/features/futureNotes";
import { VidPreview } from "@/components/features/vidPreview";
import { Screen } from "@/components/Screen";
import { AppText } from "@/components/ui/appText";
import { BackButton } from "@/components/ui/backButton";
import { WideButton } from "@/components/ui/wideButton";
import { deleteVideoAndMetadata } from "@/services/helpers/deleteVideoAndMetadata";
import { useConfirmationModal } from "@/store/useConfirmationModal";
import { useSelectedCapsuleStore } from "@/store/useSelectedCapsuleStore";
import * as MediaLibrary from "expo-media-library";
import { Asset } from "expo-media-library";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Capsule() {
  const metadata = useSelectedCapsuleStore((state) => state.metadata);
  const openModal = useConfirmationModal((state) => state.openModal);
  const closeModal = useConfirmationModal((state) => state.closeModal);
  const [isSaved, setIsSaved] = useState(false);
  if (!metadata) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <AppText className="text-base text-gray-400">
            Invalid Metadata
          </AppText>
        </View>
      </Screen>
    );
  }
  const handleDelete = async () => {
    try {
      await deleteVideoAndMetadata(metadata);
      closeModal();
      router.replace("/");
    } catch (err) {
      Toast.show({ type: "error", text1: "error when deleting metadata" });
      closeModal();
      router.replace("/");
    }
  };
  const handleDeleteSelect = () => {
    openModal({
      type: "danger",
      message: "This will permanently delete your video message",
      onConfirm: () => handleDelete(),
    });
  };

  const handleSaveVideoToGallery = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync(true);
    if (status !== "granted") {
      return Toast.show({
        type: "error",
        text1: "No permission to save video",
        text2: "enable saving photo permission at settings",
      });
    }

    if (isSaved) {
      return Toast.show({ type: "info", text1: "video already saved" });
    }

    await Asset.create(metadata.filepath);
    setIsSaved(true);
    Toast.show({ type: "success", text1: "Saved succesfully" });
  };

  return (
    <Screen>
      <View className="flex-row items-center justify-between px-1">
        <View className="flex-row items-center gap-2">
          <BackButton />
          <AppText className="text-lg font-semibold">Home</AppText>
        </View>
        <CapsuleMenu onDelete={handleDeleteSelect} />
      </View>

      <ScrollView
        className="mt-4"
        contentContainerClassName="gap-3 pb-4"
        showsVerticalScrollIndicator={false}
      >
        <AppText className="px-1 text-2xl font-bold">{metadata.title}</AppText>

        <View className="overflow-hidden rounded-2xl shadow-sm">
          <VidPreview uri={metadata.filepath ?? ""} />
        </View>

        {metadata.description && (
          <FutureNotes description={metadata.description} />
        )}
      </ScrollView>

      <View className="mb-[5%] mt-auto">
        <WideButton
          label={isSaved ? "saved to gallery" : "save to gallery"}
          onClick={() => handleSaveVideoToGallery()}
          icon={isSaved ? "checkmark-outline" : "download-outline"}
        />
      </View>
    </Screen>
  );
}
