import { VidPreview } from "@/components/features/vidPreview";
import { Screen } from "@/components/Screen";
import { AppText } from "@/components/ui/appText";
import { BackButton } from "@/components/ui/backButton";
import { useSelectedCapsuleStore } from "@/store/useSelectedCapsuleStore";
import { View } from "react-native";

export default function Capsule() {
  const metadata = useSelectedCapsuleStore((state) => state.metadata);
  if (!metadata) {
    return (
      <Screen>
        <AppText>Invalid Metadata</AppText>
      </Screen>
    );
  }
  return (
    <Screen>
      <View className="flex-row items-center">
        <BackButton />
        <AppText className="text-lg">Home</AppText>
      </View>
      <View className="mt-3 gap-2">
        <AppText className="text-2xl">{metadata.title}</AppText>
        <VidPreview uri={metadata.filepath ?? ""} />
        {metadata.description && <AppText>{metadata.description}</AppText>}
      </View>
    </Screen>
  );
}

// TODO VALIDATIONS
//TODO Delete
// TODO MODALS (for confirmations)
