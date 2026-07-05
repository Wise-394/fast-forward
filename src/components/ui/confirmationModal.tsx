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

  return (
    <Modal visible={isModalOpen} transparent={true} animationType="fade">
      <View className="flex-1 items-center justify-center">
        <View className="w-[80%] gap-3 rounded-lg bg-surface-raised p-3 px-4">
          <Ionicons
            name={
              type === "info" ? "information-circle-outline" : "warning-outline"
            }
            color={type === "info" ? "#1a3a7a" : "#e05a5a"}
            size={30}
            className="text-center"
          />
          <AppText className="text-center">Are u Sure?</AppText>
          <AppText className="text-center">{message}</AppText>
          <View className="mt-5 w-full flex-row justify-between gap-5">
            <Pressable onPress={() => closeModal()} className="flex-1">
              <AppText className="rounded-lg bg-gray-400 p-2 text-center">
                Cancel
              </AppText>
            </Pressable>
            <Pressable
              className={`${type === "info" ? "bg-primary" : "bg-danger"} flex-1 rounded-lg p-2`}
              onPress={() => onConfirm()}
            >
              <AppText className="text-center">Confirm</AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
