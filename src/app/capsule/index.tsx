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
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";

export default function Capsule() {
  const metadata = useSelectedCapsuleStore((state) => state.metadata);
  const openModal = useConfirmationModal((state) => state.openModal);
  const closeModal = useConfirmationModal((state) => state.closeModal);
  if (!metadata) {
    return (
      <Screen>
        <AppText>Invalid Metadata</AppText>
      </Screen>
    );
  }
  const handleDelete = () => {
    try {
      deleteVideoAndMetadata(metadata);
      closeModal();
      router.replace("/");
    } catch (err) {
      Toast.show({ type: "error", text1: "error when deleting metadata" });
      closeModal();
      router.replace("/");
    }
  };
  const handleSaveToGallery = () => {};

  return (
    <Screen>
      <View className="flex-row items-center">
        <BackButton />
        <AppText className="text-lg">Home</AppText>
        <MenuView
          onPressAction={({ nativeEvent }) => {
            if (nativeEvent.event === "delete") {
              //TODO DELETE POP UP ITEM
              openModal({
                type: "danger",
                message: "This will permanently delete your video message",
                onConfirm: () => handleDelete(),
              });
            }
          }}
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
          onClick={() => handleSaveToGallery()}
        />
      </View>
    </Screen>
  );
}

//TODO Delete
// TODO MODALS (for confirmations)
