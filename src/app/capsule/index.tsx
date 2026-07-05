import { VidPreview } from "@/components/features/vidPreview";
import { Screen } from "@/components/Screen";
import { AppText } from "@/components/ui/appText";
import { BackButton } from "@/components/ui/backButton";
import { WideButton } from "@/components/ui/wideButton";
import { deleteVideoAndMetadata } from "@/services/helpers/deleteVideoAndMetadata";
import { useConfirmationModal } from "@/store/useConfirmationModal";
import { useSelectedCapsuleStore } from "@/store/useSelectedCapsuleStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MenuView } from "@react-native-menu/menu";
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
        <AppText>Invalid Metadata</AppText>
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
  const showModal = ({ nativeEvent }: { nativeEvent: { event: string } }) => {
    if (nativeEvent.event === "delete") {
      openModal({
        type: "danger",
        message: "This will permanently delete your video message",
        onConfirm: () => handleDelete(),
      });
    }
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
      <View className="flex-row items-center">
        <BackButton />
        <AppText className="text-lg">Home</AppText>
        <MenuView
          onPressAction={(nativeEvent) => showModal(nativeEvent)}
          actions={[
            {
              id: "delete",
              title: "Delete",
              attributes: { destructive: true },
            },
          ]}
          style={{ position: "absolute", right: 12, top: 12, padding: 8 }}
        >
          <Ionicons name="ellipsis-vertical-outline" color="white" size={18} />
        </MenuView>
      </View>

      <ScrollView className="mt-3 gap-2">
        <AppText className="text-2xl">{metadata.title}</AppText>
        <VidPreview uri={metadata.filepath ?? ""} />
        {metadata.description && <AppText>{metadata.description}</AppText>}
      </ScrollView>

      <View className="mb-[5%] mt-auto">
        <WideButton
          label="save to gallery"
          onClick={() => handleSaveVideoToGallery()}
        />
      </View>
    </Screen>
  );
}

//TODO saving to gallery
