import { CameraLoading } from "@/components/features/cameraLoading";
import { RecordButton } from "@/components/features/recordButton";
import { Screen } from "@/components/Screen";
import { AppText } from "@/components/ui/appText";
import { BackButton } from "@/components/ui/backButton";
import { WideButton } from "@/components/ui/wideButton";
import { useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecordingPage() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCamReady, setCamReady] = useState(false);

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission) {
    return (
      <Screen>
        <AppText>Loading</AppText>
      </Screen>
    );
  }

  if (!permission.granted) {
    return (
      <Screen>
        <AppText>We need camera permission</AppText>
        <WideButton onClick={requestPermission} label="Grant permission" />
      </Screen>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* HEADER */}
      <View className="flex h-[10%] flex-row items-start justify-between pt-3">
        <BackButton />
        <AppText className="flex-1 text-center text-2xl font-bold">
          Record
        </AppText>
        <View className="w-10" />
      </View>

      <View className="relative flex-1">
        {/* <CameraView
          style={{ flex: 1, width: "100%" }}
          onCameraReady={() => {}}
        /> */}
        {/* overlay when camera is not ready*/}
        {!isCamReady && <CameraLoading />}
      </View>

      {/* FOOTER */}
      <View className="mt-5 h-[15%] items-center">
        <RecordButton />
      </View>
    </SafeAreaView>
  );
}

// TODO ADD CAMERA LOADING
// onCameraReady={() => setCameraReady(true)}
