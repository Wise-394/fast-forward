import { VideoMetadataType } from "@/types/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import { AppText } from "../ui/appText";

export function CapsuleItem({ metadata }: { metadata: VideoMetadataType }) {
  const isUnlocked = new Date(metadata.unlockDate) <= new Date();
  return (
    <View className="flex w-full flex-row gap-5 rounded-2xl bg-surface-raised p-4 shadow-sm">
      <View className="w-[20vw] items-center justify-center rounded-lg bg-text-primary">
        <Ionicons
          name={isUnlocked ? "play-outline" : "lock-closed-outline"}
          size={30}
          color="black"
        />
      </View>
      <View className="mb-3 flex-1">
        <AppText className="text-2xl font-semibold">{metadata.title}</AppText>
        <AppText className="mt-1 text-text-muted">
          Unlocks:
          <AppText>
            {isUnlocked ? "capsule is unlocked!" : metadata.unlockDate}
          </AppText>
        </AppText>
        <AppText className="mt-1 text-xs text-text-muted">
          Created {metadata.createdAt}
        </AppText>
      </View>
    </View>
  );
}
