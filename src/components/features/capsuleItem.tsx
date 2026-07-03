import { VideoMetadataType } from "@/types/types";
import { View } from "react-native";
import { AppText } from "../ui/appText";

export function CapsuleItem({ metadata }: { metadata: VideoMetadataType }) {
  return (
    <View>
      <AppText>{metadata.title}</AppText>
      <AppText>{metadata.unlockDate}</AppText>
      <AppText>{metadata.createdAt}</AppText>
    </View>
  );
}
