import { Pressable } from "react-native";
import { AppText } from "./AppText";
interface Props {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}
export function WideButton({ label, icon, onClick }: Props) {
  return (
    <Pressable
      onPress={onClick}
      className="w-full items-center rounded-md bg-primary py-5"
    >
      {icon}
      <AppText className="font-bold">{label}</AppText>
    </Pressable>
  );
}
