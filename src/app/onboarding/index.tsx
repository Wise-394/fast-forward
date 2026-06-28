import { Screen } from "@/components/Screen";
import { AppText } from "@/components/ui/appText";
import { WideButton } from "@/components/ui/wideButton";
import { router } from "expo-router";
import { View } from "react-native";

export default function OnboardingScreen() {
  const handleRedirect = () => {
    router.push("/onboarding/register");
  };

  return (
    <Screen>
      <AppText className="text-2xl font-bold">Flash Forward</AppText>
      <View className="mt-auto items-center text-center">
        <AppText className="text-center text-2xl font-bold">
          Record Today, Watch Tomorrow
        </AppText>
        <AppText className="text-center text-text-secondary">
          send a video to your future self, Sealed Until the day you choose.
        </AppText>
      </View>
      <View className="mt-auto w-full">
        <WideButton label="continue" onClick={handleRedirect} />
      </View>
    </Screen>
  );
}
