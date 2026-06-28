import Screen from "@/components/Screen";
import { AppText } from "@/components/ui/AppText";
import { WideButton } from "@/components/ui/WideButton";
import { View } from "react-native";
export default function OnboardingScreen() {
  return (
    <Screen>
      <AppText className="text-2xl font-bold">Flash Forward</AppText>
      <View className="flex-1 items-center">
        <View className="mt-auto items-center text-center">
          <AppText className="text-center text-2xl font-bold">
            Record Today, Watch Tommorow
          </AppText>
          <AppText className="text-center text-text-secondary">
            send a video to your future self, Sealed Until the day you choose.
          </AppText>
        </View>
        <View className="mt-auto w-full">
          <WideButton label="continue" onClick={() => {}} />
        </View>
      </View>
    </Screen>
  );
}
