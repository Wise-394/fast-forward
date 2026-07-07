import { useConfirmationModal } from "@/store/useConfirmationModal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Modal, Pressable, View } from "react-native";
import { AppText } from "./appText";

export function ConfirmationModal() {
  const isModalOpen = useConfirmationModal((state) => state.isModalOpen);
  const closeModal = useConfirmationModal((state) => state.closeModal);
  const onConfirm = useConfirmationModal((state) => state.onConfirm);
  const type = useConfirmationModal((state) => state.type);
  const message = useConfirmationModal((state) => state.message);

  const isInfo = type === "info";

  return (
    <Modal visible={isModalOpen} transparent={true} animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/50 px-6">
        <View className="w-full max-w-sm gap-4 rounded-2xl bg-surface-raised p-6 shadow-lg">
          <View
            className={`h-14 w-14 items-center justify-center self-center rounded-full ${
              isInfo ? "bg-primary/10" : "bg-danger/10"
            }`}
          >
            <Ionicons
              name={isInfo ? "information-circle-outline" : "warning-outline"}
              color={isInfo ? "#1a3a7a" : "#e05a5a"}
              size={30}
            />
          </View>

          <View className="gap-1">
            <AppText className="text-center text-lg font-semibold">
              Are you sure?
            </AppText>
            <AppText className="text-center text-gray-500">{message}</AppText>
          </View>

          <View className="mt-4 w-full flex-row gap-3">
            <Pressable
              onPress={() => closeModal()}
              className="flex-1 rounded-xl bg-gray-200 py-3 active:opacity-70"
            >
              <AppText className="text-center font-medium text-gray-950">
                Cancel
              </AppText>
            </Pressable>
            <Pressable
              className={`flex-1 rounded-xl py-3 active:opacity-70 ${
                isInfo ? "bg-primary" : "bg-danger"
              }`}
              onPress={() => onConfirm()}
            >
              <AppText className="text-center font-medium text-white">
                Confirm
              </AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
