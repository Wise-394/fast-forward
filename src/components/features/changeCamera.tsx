import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";

export function ChangeCamera() {
  return (
    <Pressable>
      <Ionicons name="camera-reverse-outline" size={28} color={"#d0e8ff"} />
    </Pressable>
  );
}
