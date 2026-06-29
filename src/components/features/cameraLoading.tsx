import { AppText } from "@/components/ui/appText";
import { View } from "react-native";

export function CameraLoading() {
  return (
    <View className="inset-0 flex-1 justify-center bg-black">
      <AppText className="text-center">Loading Camera...</AppText>
    </View>
  );
}
