import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable } from "react-native";

export function BackButton() {
  const handleBack = () => {
    router.back();
  };
  return (
    <Pressable
      className="h-10 w-10 items-center justify-center rounded-full"
      onPress={handleBack}
    >
      <Ionicons name="chevron-back-outline" size={28} color={"#d0e8ff"} />
    </Pressable>
  );
}
