import { useRecordStore } from "@/store/useRecordStore";
import { CameraView } from "expo-camera";
import { router } from "expo-router";
import { RefObject, useRef } from "react";
import { Animated, Pressable } from "react-native";

interface Props {
  camera: RefObject<CameraView | null>;
}

export function RecordButton({ camera }: Props) {
  const isRecording = useRecordStore((state) => state.isRecording);
  const startRecordingStore = useRecordStore((state) => state.startRecording);
  const stopRecordingStore = useRecordStore((state) => state.stopRecording);
  const innerScale = useRef(new Animated.Value(1)).current;
  const borderRadius = useRef(new Animated.Value(28)).current;
  const recordStartTime = useRef(0);

  const toggleRecord = () => {
    if (!camera.current) return;
    if (!isRecording) return startRecording();
    if (Date.now() - recordStartTime.current < 1000) return;
    return stopRecording();
  };

  const startRecording = () => {
    recordStartTime.current = Date.now();
    Animated.parallel([
      Animated.spring(innerScale, { toValue: 0.5, useNativeDriver: false }),
      Animated.spring(borderRadius, { toValue: 6, useNativeDriver: false }),
    ]).start();
    startRecordingStore(camera.current);
  };

  const stopRecording = async () => {
    Animated.parallel([
      Animated.spring(innerScale, { toValue: 1, useNativeDriver: false }),
      Animated.spring(borderRadius, { toValue: 28, useNativeDriver: false }),
    ]).start();
    await stopRecordingStore(camera.current);
    router.navigate("/record/save");
  };

  return (
    <Pressable
      onPress={toggleRecord}
      className="w-18 h-18 items-center justify-center rounded-full border-[3px] border-text-primary p-1"
    >
      <Animated.View
        style={{ transform: [{ scale: innerScale }], borderRadius }}
        className="h-14 w-14 bg-danger"
      />
    </Pressable>
  );
}
