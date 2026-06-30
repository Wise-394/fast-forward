import { Screen } from "@/components/Screen";
import { AppText } from "@/components/ui/appText";
import { WideButton } from "@/components/ui/wideButton";
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import { useCallback, useEffect, useRef } from "react";
import { AppState, Linking, View } from "react-native";

type Props = {
  children: React.ReactNode;
};

export function CameraPermissionsGate({ children }: Props) {
  const [camPermission, requestCamPermission, getCamPermission] =
    useCameraPermissions();
  const [micPermission, requestMicPermission, getMicPermission] =
    useMicrophonePermissions();

  const hasRequestedRef = useRef(false);

  useEffect(() => {
    const askForPermission = async () => {
      if (hasRequestedRef.current) return;
      hasRequestedRef.current = true;

      const freshCam = await getCamPermission();
      if (!freshCam?.granted && freshCam?.canAskAgain) {
        await requestCamPermission();
      }

      const freshMic = await getMicPermission();
      if (!freshMic?.granted && freshMic?.canAskAgain) {
        await requestMicPermission();
      }
    };
    askForPermission();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        getCamPermission();
        getMicPermission();
      }
    });
    return () => subscription.remove();
  }, [getCamPermission, getMicPermission]);

  const requestMissingPermissions = useCallback(async () => {
    const freshCam = await getCamPermission();
    const freshMic = await getMicPermission();

    const camNeedsSettings = !freshCam?.granted && !freshCam?.canAskAgain;
    const micNeedsSettings = !freshMic?.granted && !freshMic?.canAskAgain;

    if (camNeedsSettings || micNeedsSettings) {
      Linking.openSettings();
      return;
    }

    if (!freshCam?.granted && freshCam?.canAskAgain) {
      await requestCamPermission();
    }
    if (!freshMic?.granted && freshMic?.canAskAgain) {
      await requestMicPermission();
    }
  }, [
    getCamPermission,
    getMicPermission,
    requestCamPermission,
    requestMicPermission,
  ]);

  if (!camPermission || !micPermission) {
    return (
      <Screen>
        <AppText>Loading</AppText>
      </Screen>
    );
  }

  if (!camPermission.granted || !micPermission.granted) {
    const bothMissing = !camPermission.granted && !micPermission.granted;
    const camMissing = !camPermission.granted;

    const canAskAgain = bothMissing
      ? camPermission.canAskAgain || micPermission.canAskAgain
      : camMissing
        ? camPermission.canAskAgain
        : micPermission.canAskAgain;

    const getMessage = () => {
      if (bothMissing) {
        return canAskAgain
          ? "We need access to your camera and microphone to record."
          : "Camera and microphone access were denied. Enable them in Settings.";
      }

      if (camMissing) {
        return camPermission.canAskAgain
          ? "We need camera permission"
          : "Camera permission was denied. Enable it in Settings.";
      }

      return micPermission.canAskAgain
        ? "We need mic permission"
        : "Mic permission was denied. Enable it in Settings.";
    };

    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <View className="w-full">
            <AppText>{getMessage()}</AppText>
            <WideButton
              onClick={requestMissingPermissions}
              label={canAskAgain ? "Grant permission" : "Open Settings"}
            />
          </View>
        </View>
      </Screen>
    );
  }

  return <>{children}</>;
}
