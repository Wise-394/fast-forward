import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";
import { AppText } from "./appText";
interface Props {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onClick: () => void;
}
export function WideButton({ label, icon, onClick }: Props) {
  return (
    <Pressable
      onPress={onClick}
      className="w-full flex-row items-center justify-center gap-2 rounded-2xl bg-primary py-5"
    >
      {icon && <Ionicons name={icon} size={28} color="#d0e8ff" />}
      <AppText className="font-bold">{label}</AppText>
    </Pressable>
  );
}
