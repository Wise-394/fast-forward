import { VidPreview } from "@/components/features/vidPreview";
import { Screen } from "@/components/Screen";
import { AppInput } from "@/components/ui/appInput";
import { AppText } from "@/components/ui/appText";
import { BackButton } from "@/components/ui/backButton";
import { AppMultiLine } from "@/components/ui/multiLineInput";
import { WideButton } from "@/components/ui/wideButton";
import { View } from "react-native";

export default function SaveRecording() {
  return (
    <Screen>
      {/* HEADER */}
      <View className="relative flex flex-row items-center justify-center">
        <View className="absolute left-1">
          <BackButton />
        </View>
        <AppText className="text-center text-2xl font-bold">
          New Capsule
        </AppText>
      </View>

      {/* BODY */}
      <View className="mt-5 flex-1 gap-5">
        <VidPreview />
        <View>
          <AppText>Title</AppText>
          <AppInput
            value=""
            onChange={() => {}}
            placeholder="Sample title"
            textAlign="left"
          />
        </View>
        <View>
          <AppText>
            Note to future self
            <AppText className="text-sm text-text-muted"> (Optional)</AppText>
          </AppText>
          <AppMultiLine placeholder="Sample" multiline={true} lines={10} />
        </View>
      </View>
      <WideButton label="Send to future" onClick={() => {}} />
    </Screen>
  );
}
