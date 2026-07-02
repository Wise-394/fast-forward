import { useRecordStore } from "@/store/useRecordStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";

export function ChangeCamera() {
  const toggleFacing = useRecordStore((state) => state.toggleFacing);
  return (
    <Pressable onPress={() => toggleFacing()}>
      <Ionicons name="camera-reverse-outline" size={28} color={"#d0e8ff"} />
    </Pressable>
  );
}
