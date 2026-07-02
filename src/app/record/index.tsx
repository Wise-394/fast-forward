import { CameraLoading } from "@/components/features/cameraLoading";
import { CameraPermissionsGate } from "@/components/features/cameraPermissionsGate";
import { ChangeCamera } from "@/components/features/changeCamera";
import { RecordButton } from "@/components/features/recordButton";
import { RecordDuration } from "@/components/features/recordDuration";
import { AppText } from "@/components/ui/appText";
import { BackButton } from "@/components/ui/backButton";
import { useRecordStore } from "@/store/useRecordStore";
import { CameraView } from "expo-camera";
import { useRef, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecordingPage() {
  const [isCamReady, setCamReady] = useState(false);
  const cameraRef = useRef<CameraView>(null!);
  const facing = useRecordStore((state) => state.facing);

  return (
    <CameraPermissionsGate>
      <SafeAreaView className="flex-1 bg-background">
        {/* HEADER */}
        <View className="relative flex h-[8%] flex-row items-center justify-center">
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
            ref={cameraRef}
            style={{ flex: 1, width: "100%" }}
            onCameraReady={() => setCamReady(true)}
            mode="video"
            facing={facing}
          />
          <CameraLoading visible={!isCamReady} />
        </View>

        {/* FOOTER */}
        <View className="relative mt-5 h-[15%] items-center justify-center p-2">
          {isCamReady && (
            <>
              <RecordButton camera={cameraRef} />
              <View className="absolute right-[15%]">
                <ChangeCamera />
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </CameraPermissionsGate>
  );
}
