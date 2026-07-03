import { Screen } from "@/components/Screen";
import { AppText } from "@/components/ui/appText";
import { WideButton } from "@/components/ui/wideButton";
import { router } from "expo-router";
import { View } from "react-native";

export default function Settings() {
  const handleRedirectDevPage = () => {
    router.navigate("/dev");
  };
  return (
    <Screen>
      <AppText className="text-center text-lg">SETTINGS</AppText>

      <View>
        <WideButton label="dev tools" onClick={() => handleRedirectDevPage()} />
      </View>
    </Screen>
  );
}
// TODO add dev page for testing
