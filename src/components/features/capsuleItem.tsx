import { deleteVideoAndMetadata } from "@/services/helpers/deleteVideoAndMetadata";
import { formatDate } from "@/services/helpers/formatDate";
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
  const formattedUnlockedDate = formatDate(metadata.unlockDate);
  const formattedCreatedDate = formatDate(metadata.createdAt);

  const now = new Date();
  const created = new Date(metadata.createdAt);
  const unlock = new Date(metadata.unlockDate);

  const progress = isUnlocked
    ? 100
    : Math.min(
        100,
        Math.max(
          0,
          ((now.getTime() - created.getTime()) /
            (unlock.getTime() - created.getTime())) *
            100,
        ),
      );

  const handleRedirect = () => {
    if (!isUnlocked) return;
    setMetadata(metadata);
    router.navigate("/capsule");
  };

  const handleDelete = async () => {
    try {
      await deleteVideoAndMetadata(metadata);
      closeModal();
      onDeleted(metadata.id);
    } catch (err) {
      console.error(err);
      Toast.show({ type: "error", text1: "Error when deleting video" });
      closeModal();
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

  return (
    <View className="relative flex w-full flex-row gap-4 rounded-3xl border border-primary-bright/25 bg-surface-raised p-4 shadow-md">
      <Pressable
        className="flex flex-1 flex-row items-center gap-4"
        onPress={handleRedirect}
      >
        <View
          className={`aspect-square w-16 items-center justify-center rounded-2xl ${
            isUnlocked ? "bg-success/20" : "bg-locked/20"
          }`}
        >
          <Ionicons
            name={isUnlocked ? "play" : "lock-closed"}
            size={26}
            color={isUnlocked ? "#60b8ff" : "#94a3b8"}
          />
        </View>

        <View className="flex-1 gap-1">
          <View className="pr-8">
            <AppText className="text-xl font-bold">{metadata.title}</AppText>
          </View>

          <AppText className="text-sm text-text-muted">
            {isUnlocked ? "Ready to watch" : `Opens ${formattedUnlockedDate}`}
          </AppText>

          {!isUnlocked && (
            <View className="mt-1 flex-row items-center gap-2">
              <View className="h-1.5 flex-1 overflow-hidden rounded-full bg-background">
                <View
                  style={{ width: `${progress}%` }}
                  className="h-full rounded-full bg-primary-bright"
                />
              </View>
              <AppText className="text-xs text-text-muted">
                {Math.round(progress)}%
              </AppText>
            </View>
          )}

          <AppText className="text-xs text-text-muted/70">
            sent on {formattedCreatedDate}
          </AppText>
        </View>
      </Pressable>

      <MenuView
        onPressAction={showModal}
        actions={[
          {
            id: "delete",
            title: "Delete",
            attributes: { destructive: true },
          },
        ]}
        style={{ position: "absolute", right: 10, top: 10, padding: 8 }}
      >
        <Ionicons name="ellipsis-vertical" color="white" size={18} />
      </MenuView>
    </View>
  );
}
