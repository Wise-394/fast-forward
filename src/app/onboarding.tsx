import Screen from "@/components/Screen";
import { Text, View } from "react-native";
export default function OnboardingScreen() {
  return (
    <Screen>
      <Text className="text-white text-2xl">Flash Forward</Text>
      <View>
        <View>
          <Text>Record Today, Watch Tommorow</Text>
          <Text>
            send a video to your future self, Sealed Until the day you choose
          </Text>
        </View>
        <View>
          <Text>Continue</Text>
        </View>
      </View>
    </Screen>
  );
}

// const style = StyleSheet.create({
//   title: { fontSize: 22 },
//   textDefault: { color: Theme.colors.textPrimary, textAlign: "center" },
//   container: {
//     width: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//     flex: 1,
//   },
//   heroContainer: {
//     marginTop: "auto",
//   },
//   buttonContainer: {
//     marginTop: "auto",
//   },
// });

// TODO MAKE A APPTEXT or NATIVE WIND
