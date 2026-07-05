import { deleteVideoAndMetadata } from "@/services/helpers/deleteVideoAndMetadata";
import { useConfirmationModal } from "@/store/useConfirmationModal";
import { useSelectedCapsuleStore } from "@/store/useSelectedCapsuleStore";
import { VideoMetadataType } from "@/types/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MenuView } from "@react-native-menu/menu";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import Toast from "react-native-toast-message";
import { AppText } from "../ui/appText";

export function CapsuleItem({
  metadata,
  onDeleted,
}: {
  metadata: VideoMetadataType;
  onDeleted: (id: number) => void;
}) {
  const isUnlocked = new Date(metadata.unlockDate) <= new Date();
  const setMetadata = useSelectedCapsuleStore((state) => state.setMetadata);
  const openModal = useConfirmationModal((state) => state.openModal);
  const closeModal = useConfirmationModal((state) => state.closeModal);

  const handleRedirect = () => {
    if (!isUnlocked) return;
    setMetadata(metadata);
    router.navigate("/capsule");
  };
  const handleDelete = async () => {
    try {
      deleteVideoAndMetadata(metadata);
      closeModal();
      onDeleted(metadata.id);
    } catch (err) {
      console.error(err);
      Toast.show({ type: "error", text1: "Error when deleting video" });
      closeModal();
    }
  };

  return (
    <View className="relative flex w-full flex-row gap-5 rounded-2xl bg-surface-raised p-4 shadow-sm">
      <Pressable
        className="flex flex-1 flex-row gap-5"
        onPress={handleRedirect}
      >
        <View className="w-[20vw] items-center justify-center rounded-lg bg-text-primary">
          <Ionicons
            name={isUnlocked ? "play-outline" : "lock-closed-outline"}
            size={30}
            color="black"
          />
        </View>
        <View className="mb-3 flex-1">
          <AppText className="text-2xl font-semibold">{metadata.title}</AppText>
          <AppText className="mt-1 text-text-muted">
            Unlocks:
            <AppText>
              {isUnlocked ? "capsule is unlocked!" : metadata.unlockDate}
            </AppText>
          </AppText>
          <AppText className="mt-1 text-xs text-text-muted">
            Created {metadata.createdAt}
          </AppText>
        </View>
      </Pressable>
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
          { id: "delete", title: "Delete", attributes: { destructive: true } },
        ]}
        style={{ position: "absolute", right: 12, top: 12, padding: 8 }}
      >
        <Ionicons name="ellipsis-vertical-outline" color="white" size={18} />
      </MenuView>
    </View>
  );
}
