import { VidPreview } from "@/components/features/vidPreview";
import { Screen } from "@/components/Screen";
import { AppText } from "@/components/ui/appText";
import { BackButton } from "@/components/ui/backButton";
import { useSelectedCapsuleStore } from "@/store/useSelectedCapsuleStore";
import { View } from "react-native";

export default function Capsule() {
  const metadata = useSelectedCapsuleStore((state) => state.metadata);
  return (
    <Screen>
      <View className="flex-row items-center">
        <BackButton />
        <AppText className="text-lg">Home</AppText>
      </View>
      <View className="mt-3 gap-2">
        <AppText className="text-2xl">{metadata?.title}</AppText>
        <VidPreview uri={metadata?.filepath ?? ""} />
      </View>
    </Screen>
  );
}
