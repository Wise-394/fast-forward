import PlanetOrb from "@/components/features/PlanetOrb";
import { Screen } from "@/components/Screen";
import { AppText } from "@/components/ui/appText";
import { WideButton } from "@/components/ui/wideButton";
import { useAuthStore } from "@/store/useAuthStore";
import { router } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const username = useAuthStore((state) => state.username);
  const handleRedirectToRecord = () => router.navigate("/record");
  return (
    <Screen>
      <AppText className="text-2xl font-bold">Flash Forward</AppText>
      <View className="mt-[15vh]">
        <AppText className="text-center text-text-secondary">
          Good Day, {username}
        </AppText>
        <AppText className="text-center text-2xl">
          Your future self is waiting
        </AppText>
      </View>
      <View className="mt-5 items-center p-5">
        <PlanetOrb />
      </View>
      <View className="mt-auto">
        <WideButton
          label="Record"
          onClick={handleRedirectToRecord}
          icon="videocam-outline"
        />
      </View>
    </Screen>
  );
}
