import { View } from "react-native";
import { AppText } from "../ui/appText";

export function RecordDuration() {
  return (
    <View className="flex-row items-center gap-1.5">
      <View className="h-2.5 w-2.5 rounded-full bg-red-500" />
      <AppText className="text-lg">00:00</AppText>
    </View>
  );
}
