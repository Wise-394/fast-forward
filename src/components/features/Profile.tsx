import { useAuthStore } from "@/store/useAuthStore";
import { View } from "react-native";
import { AppText } from "../ui/appText";

export function Profile() {
  const username = useAuthStore((state) => state.username);
  const initial = username.slice(0, 2);

  return (
    <View className="gap-2">
      <View className="aspect-square h-[12vh] items-center justify-center rounded-full bg-surface">
        <AppText className="text-4xl font-bold text-text-primary">
          {initial}
        </AppText>
      </View>
      <AppText className="text-center text-lg text-text-primary">
        {username}
      </AppText>
    </View>
  );
}
