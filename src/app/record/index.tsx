import { CameraLoading } from "@/components/features/cameraLoading";
import { ChangeCamera } from "@/components/features/changeCamera";
import { RecordButton } from "@/components/features/recordButton";
import { RecordDuration } from "@/components/features/recordDuration";
import { Screen } from "@/components/Screen";
import { AppText } from "@/components/ui/appText";
import { BackButton } from "@/components/ui/backButton";
import { WideButton } from "@/components/ui/wideButton";
import { CameraView, useCameraPermissions } from "expo-camera";
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
      <View className="relative flex h-[8%] flex-row items-center justify-center pt-3">
        <View className="absolute left-2">
          <BackButton />
        </View>
        <AppText className="text-center text-2xl font-bold">Record</AppText>
        <View className="absolute right-4">
          <RecordDuration />
        </View>
      </View>

      <View className="relative flex-1">
        <CameraView
          style={{ flex: 1, width: "100%" }}
          onCameraReady={() => setCamReady(true)}
          mode="video"
        />
        <CameraLoading visible={!isCamReady} />
      </View>

      {/* FOOTER */}
      <View className="relative mt-5 h-[15%] items-center justify-center p-2">
        <RecordButton />
        <View className="absolute right-[15%]">
          <ChangeCamera />
        </View>
      </View>
    </SafeAreaView>
  );
}

// TODO ADD CAMERA LOADING
// onCameraReady={() => setCameraReady(true)}
